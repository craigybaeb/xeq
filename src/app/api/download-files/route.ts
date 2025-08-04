import JSZip from 'jszip';
import { NextRequest } from 'next/server';
import { DownloadFile } from './types';

export async function POST(req: NextRequest) {
  const { files } = await req.json();

  if (!Array.isArray(files)) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
  }

  const zip = new JSZip();

  const fetchAndAdd = async (file: DownloadFile) => {
    try {
      const res = await fetch(file.url);
      if (!res.ok) throw new Error(`Failed to fetch ${file.url}`);
      const buffer = await res.arrayBuffer();
      zip.file(file.name, buffer);
    } catch (err) {
      console.error(`Skipping file: ${file.url}`, err);
    }
  };

  await Promise.all(files.map(fetchAndAdd)); // ⚡ Parallel fetching

  const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

  return new Response(zipBuffer, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="selected-files.zip"',
    },
  });
}
