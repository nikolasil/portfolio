import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface WallEntry {
  id: string;
  timestamp: number;
  [key: string]: unknown;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PREFIX = 'wall_';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'your-super-secret-key';

async function getAllFilePaths() {
  try {
    const files = await fs.readdir(DATA_DIR);
    return files
      .filter((f) => f.startsWith(FILE_PREFIX) && f.endsWith('.json'))
      .map((f) => path.join(DATA_DIR, f));
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const auth = req.headers.get('x-admin-secret');
  if (auth !== ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const paths = await getAllFilePaths();
  const all = [];
  for (const p of paths) {
    const content = await fs.readFile(p, 'utf8');
    all.push(...JSON.parse(content));
  }
  return NextResponse.json(
    all.sort((a: WallEntry, b: WallEntry) => b.timestamp - a.timestamp),
  );
}

export async function DELETE(req: Request) {
  const auth = req.headers.get('x-admin-secret');
  if (auth !== ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await req.json().catch(() => ({}));
  const paths = await getAllFilePaths();
  let deleted = false;

  for (const p of paths) {
    const content = await fs.readFile(p, 'utf8');
    const entries = JSON.parse(content) as WallEntry[];
    const filtered = entries.filter((e: WallEntry) => e.id !== id);

    if (filtered.length !== entries.length) {
      if (filtered.length === 0) await fs.unlink(p);
      else await fs.writeFile(p, JSON.stringify(filtered));
      deleted = true;
      break;
    }
  }
  return NextResponse.json({ success: deleted });
}
