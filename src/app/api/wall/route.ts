import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import nodemailer from 'nodemailer';

// --- CONFIGURATION & TYPES ---

interface Entry {
  id: string;
  name: string;
  message: string;
  emoji: string;
  color: string;
  timestamp: number;
  ip: string;
}

interface EmailTracker {
  date: string;
  count: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PREFIX = 'wall_';
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'rate-limit.json');
const EMAIL_LIMIT_FILE = path.join(DATA_DIR, 'email-limit.json');

const LIMITS = {
  FILE_MAX_RECORDS: 50,
  RETURN_MAX: 40,
  NAME_LENGTH: 25,
  MESSAGE_LENGTH: 280,
  COOLDOWN_MS: 60 * 10 * 1000, // 10 minutes
  EMAILS_PER_DAY: 10,
};

// --- EMAIL SETUP ---

const transporter = nodemailer.createTransport({
  service: 'gmail', // Change this if using Resend, SendGrid, etc.
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Checks if we have reached the daily email cap (10)
 */
async function canSendEmail(): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const today = new Date().toISOString().split('T')[0];
    let tracker: EmailTracker = { date: today, count: 0 };

    try {
      const content = await fs.readFile(EMAIL_LIMIT_FILE, 'utf8');
      const saved = JSON.parse(content);
      if (saved.date === today) {
        tracker = saved;
      }
    } catch {
      /* File doesn't exist or is old */
    }

    if (tracker.count < LIMITS.EMAILS_PER_DAY) {
      tracker.count++;
      await fs.writeFile(EMAIL_LIMIT_FILE, JSON.stringify(tracker, null, 2));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Email limit check failed', e);
    return false;
  }
}

// --- UTILITY FUNCTIONS ---

async function checkRateLimit(
  ip: string,
): Promise<{ allowed: boolean; remaining?: number }> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    let limits: Record<string, number> = {};

    try {
      const content = await fs.readFile(RATE_LIMIT_FILE, 'utf8');
      limits = JSON.parse(content);
    } catch {}

    const now = Date.now();
    const lastPost = limits[ip] || 0;

    if (now - lastPost < LIMITS.COOLDOWN_MS) {
      return {
        allowed: false,
        remaining: Math.ceil((LIMITS.COOLDOWN_MS - (now - lastPost)) / 1000),
      };
    }

    limits[ip] = now;
    await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2));
    return { allowed: true };
  } catch {
    return { allowed: true };
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

// --- API HANDLERS ---

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
      timestamp: Date.now(),
      ip: ip,
    };

    // --- LOGIC: ASYNC NOTIFICATION ---
    const shouldNotify = await canSendEmail();
    if (shouldNotify) {
      // Fire and forget so we don't slow down the response
      transporter
        .sendMail({
          from: `"Wall of Fame Alerts" <${process.env.GMAIL_USER}>`,
          to: process.env.GMAIL_USER, // Sending to yourself
          subject: `New Post: ${newEntry.name}`,
          html: `
          <div style="font-family: sans-serif; border: 1px solid ${newEntry.color}; padding: 20px; border-radius: 10px;">
            <h2 style="color: ${newEntry.color};">${newEntry.emoji} New Message</h2>
            <p><strong>From:</strong> ${newEntry.name}</p>
            <p><strong>Message:</strong> ${newEntry.message}</p>
            <hr />
            <small>Email notification limit: ${LIMITS.EMAILS_PER_DAY}/day</small>
          </div>
        `,
        })
        .catch((err) => console.error('Email failed to send:', err));
    }

    // --- LOGIC: SAVE TO DISK ---
    let targetFile = await getLatestFilePath();
    let entries: Entry[] = [];

    try {
      const content = await fs.readFile(targetFile, 'utf8');
      entries = JSON.parse(content);
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
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

export async function GET() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const files = await fs.readdir(DATA_DIR);
    const filePaths = files
      .filter((f) => f.startsWith(FILE_PREFIX) && f.endsWith('.json'))
      .sort((a, b) => b.localeCompare(a))
      .map((f) => path.join(DATA_DIR, f));

    let allEntries: Entry[] = [];

    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const entries: Entry[] = JSON.parse(content);
        allEntries = [...allEntries, ...entries];
        if (allEntries.length >= LIMITS.RETURN_MAX) break;
      } catch {
        continue;
      }
    }

    return NextResponse.json(allEntries.slice(0, LIMITS.RETURN_MAX));
  } catch {
    return NextResponse.json({ error: 'Read error' }, { status: 500 });
  }
}
