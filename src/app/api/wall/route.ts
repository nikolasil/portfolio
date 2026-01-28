import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the shape of our data
interface Entry {
  id: string;
  name: string;
  message: string;
  emoji: string;
  color: string;
  timestamp: number;
  ip: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PREFIX = 'wall_';
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'rate-limit.json');

const LIMITS = {
  FILE_MAX_RECORDS: 50,
  RETURN_MAX: 40,
  NAME_LENGTH: 25,
  MESSAGE_LENGTH: 280,
  COOLDOWN_MS: 60 * 10 * 1000 // 60 minutes
};

/**
 * Basic Rate Limiter using a local JSON file
 */
async function checkRateLimit(
  ip: string,
): Promise<{ allowed: boolean; remaining?: number }> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let limits: Record<string, number> = {};

    try {
      const content = await fs.readFile(RATE_LIMIT_FILE, 'utf8');
      limits = JSON.parse(content);
    } catch {
      /* File doesn't exist yet */
    }

    const now = Date.now();
    const lastPost = limits[ip] || 0;

    if (now - lastPost < LIMITS.COOLDOWN_MS) {
      return {
        allowed: false,
        remaining: Math.ceil((LIMITS.COOLDOWN_MS - (now - lastPost)) / 1000),
      };
    }

    // Update the timestamp for this IP
    limits[ip] = now;
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2));
    return { allowed: true };
  } catch (e) {
    console.error('Rate limit check failed', e);
    return { allowed: true }; // Fail open so the app doesn't break
  }
}

async function getLatestFilePath(): Promise<string> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const files = await fs.readdir(DATA_DIR);
  const wallFiles = files
    .filter((f) => f.startsWith(FILE_PREFIX) && f.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a));

  if (wallFiles.length === 0) {
    return path.join(DATA_DIR, `${FILE_PREFIX}${Date.now()}.json`);
  }
  return path.join(DATA_DIR, wallFiles[0]);
}

async function atomicWriteJson(filePath: string, data: Entry[]): Promise<void> {
  const tempPath = filePath.replace('.json', '.tmp.json');
  await fs.writeFile(tempPath, JSON.stringify(data), 'utf8');
  await fs.rename(tempPath, filePath);
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    const { allowed, remaining } = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: `Slow down! Wait ${remaining}s before posting again.` },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => ({}));
    const { name, message, emoji, color } = body;

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const newEntry: Entry = {
      id: crypto.randomUUID(),
      name: name.trim().substring(0, LIMITS.NAME_LENGTH),
      message: message.trim().substring(0, LIMITS.MESSAGE_LENGTH),
      emoji: emoji?.length <= 8 ? emoji : '🔥',
      color: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
        ? color
        : '#61dafb',
      timestamp: Date.now(), // Stored as UTC milliseconds
      ip: ip,
    };

    let targetFile = await getLatestFilePath();
    let entries: Entry[] = [];

    try {
      const content = await fs.readFile(targetFile, 'utf8');
      entries = JSON.parse(content);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw e;
      }
    }
    if (entries.length >= LIMITS.FILE_MAX_RECORDS) {
      targetFile = path.join(DATA_DIR, `${FILE_PREFIX}${Date.now()}.json`);
      entries = [newEntry];
    } else {
      entries = [newEntry, ...entries];
    }

    await atomicWriteJson(targetFile, entries);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

async function getAllFilePaths(): Promise<string[]> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const files = await fs.readdir(DATA_DIR);
  return files
    .filter((f) => f.startsWith(FILE_PREFIX) && f.endsWith('.json'))
    .sort((a, b) => b.localeCompare(a))
    .map((f) => path.join(DATA_DIR, f));
}

export async function GET() {
  try {
    const filePaths = await getAllFilePaths();
    let allEntries: Entry[] = [];

    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const entries: Entry[] = JSON.parse(content);

        allEntries = [...allEntries, ...entries];

        if (allEntries.length >= LIMITS.RETURN_MAX) {
          break;
        }
      } catch (e) {
        console.error(`Error reading ${filePath}:`, e);
        continue;
      }
    }

    return NextResponse.json(allEntries.slice(0, LIMITS.RETURN_MAX));
  } catch {
    return NextResponse.json({ error: 'Read error' }, { status: 500 });
  }
}

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your-super-secret-key';

export async function DELETE(req: Request) {
  try {
    const auth = req.headers.get('x-admin-secret');
    if (auth !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await req.json().catch(() => ({}));
    if (!id)
      return NextResponse.json({ error: 'ID required' }, { status: 400 });

    const filePaths = await getAllFilePaths();
    let deleted = false;

    for (const filePath of filePaths) {
      const content = await fs.readFile(filePath, 'utf8');
      const entries: Entry[] = JSON.parse(content);

      const filtered = entries.filter((entry) => entry.id !== id);

      if (filtered.length !== entries.length) {
        if (filtered.length === 0) {
          await fs.unlink(filePath);
        } else {
          await atomicWriteJson(filePath, filtered);
        }
        deleted = true;
        break;
      }
    }

    return NextResponse.json({ success: deleted });
  } catch {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
