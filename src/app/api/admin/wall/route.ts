import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface WallEntry {
  id: string;
  emoji: string;
  name: string;
  message: string;
  color: string;
  ip: string;
  timestamp: number;
}
const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PREFIX = 'wall_';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'abc';

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
  const all: WallEntry[] = [];
  const rawFiles: { name: string; size: string }[] = []; // Track file details
  let totalSizeBytes = 0;

  for (const p of paths) {
    const content = await fs.readFile(p, 'utf8');
    const stats = await fs.stat(p);

    // Add to total size calculation
    totalSizeBytes += stats.size;

    // Push file metadata for the UI
    rawFiles.push({
      name: path.basename(p),
      size: (stats.size / 1024).toFixed(2), // KB
    });

    try {
      all.push(...JSON.parse(content));
    } catch (e) {
      console.error(`Error parsing file ${p}:`, e);
    }
  }

  const sortedEntries = all.sort((a, b) => b.timestamp - a.timestamp);

  const statistics = {
    totalEntries: all.length,
    fileCount: paths.length,
    totalStorageKB: (totalSizeBytes / 1024).toFixed(2),
    avgMessageLength:
      all.length > 0
        ? Math.round(
            all.reduce((acc, curr) => acc + (curr.message?.length || 0), 0) /
              all.length,
          )
        : 0,
    uniqueIPs: new Set(all.map((e) => e.ip)).size,
    rawFiles: rawFiles, // Include the file list here
  };

  return NextResponse.json({
    entries: sortedEntries,
    stats: statistics,
  });
}

export async function DELETE(req: Request) {
  const auth = req.headers.get('x-admin-secret');
  if (auth !== ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, fileName } = await req.json().catch(() => ({}));

  // OPTION A: Delete an entire file
  if (fileName) {
    try {
      const filePath = path.join(DATA_DIR, fileName);
      await fs.unlink(filePath);
      return NextResponse.json({ success: true, message: 'File deleted' });
    } catch {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  }

  // OPTION B: Delete a single ID (Existing logic)
  if (id) {
    const paths = await getAllFilePaths();
    for (const p of paths) {
      const content = await fs.readFile(p, 'utf8');
      const entries = JSON.parse(content) as WallEntry[];
      const filtered = entries.filter((e) => e.id !== id);

      if (filtered.length !== entries.length) {
        if (filtered.length === 0) await fs.unlink(p);
        else await fs.writeFile(p, JSON.stringify(filtered, null, 2));
        return NextResponse.json({ success: true });
      }
    }
  }

  return NextResponse.json(
    { error: 'Missing ID or FileName' },
    { status: 400 },
  );
}

export async function PATCH(req: Request) {
  const auth = req.headers.get('x-admin-secret');
  if (auth !== ADMIN_SECRET)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id, name, message, emoji, color } = await req
    .json()
    .catch(() => ({}));
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const paths = await getAllFilePaths();
  let updated = false;

  for (const p of paths) {
    const content = await fs.readFile(p, 'utf8');
    const entries = JSON.parse(content) as WallEntry[];

    const index = entries.findIndex((e) => e.id === id);

    if (index !== -1) {
      // Update all provided fields
      if (name !== undefined) entries[index].name = name;
      if (message !== undefined) entries[index].message = message;
      if (emoji !== undefined) entries[index].emoji = emoji;
      if (color !== undefined) entries[index].color = color;

      await fs.writeFile(p, JSON.stringify(entries, null, 2));
      updated = true;
      break;
    }
  }
  return NextResponse.json({ success: updated });
}
