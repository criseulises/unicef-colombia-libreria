import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'public', 'data', 'surveys.json');

async function ensureFile() {
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await ensureFile();

    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    data.push(body);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ success: true, total: data.length });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    await ensureFile();
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));

    const stats = {
      total: data.length,
      byRole: {
        estudiante: data.filter((s: Record<string, string>) => s.role === 'estudiante').length,
        docente: data.filter((s: Record<string, string>) => s.role === 'docente').length,
        otro: data.filter((s: Record<string, string>) => s.role === 'otro').length,
      },
      byGender: {
        femenino: data.filter((s: Record<string, string>) => s.gender === 'femenino').length,
        masculino: data.filter((s: Record<string, string>) => s.gender === 'masculino').length,
        otro: data.filter((s: Record<string, string>) => s.gender === 'otro').length,
        prefiero_no_decir: data.filter((s: Record<string, string>) => s.gender === 'prefiero_no_decir').length,
      },
      byAction: {
        leer: data.filter((s: Record<string, string>) => s.action === 'leer').length,
        descargar: data.filter((s: Record<string, string>) => s.action === 'descargar').length,
      },
      responses: data,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json({ total: 0, responses: [] });
  }
}
