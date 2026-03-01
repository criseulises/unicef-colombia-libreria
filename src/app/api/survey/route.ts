import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { surveySchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const { allowed } = rateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { success: false, error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  try {
    const body = await request.json();
    const result = surveySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Datos invalidos' },
        { status: 400 }
      );
    }

    await prisma.surveyResponse.create({
      data: result.data,
    });

    const total = await prisma.surveyResponse.count();
    return NextResponse.json({ success: true, total });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const [total, byRole, byGender, byAction, responses] = await Promise.all([
      prisma.surveyResponse.count(),
      prisma.surveyResponse.groupBy({ by: ['role'], _count: true }),
      prisma.surveyResponse.groupBy({ by: ['gender'], _count: true }),
      prisma.surveyResponse.groupBy({ by: ['action'], _count: true }),
      prisma.surveyResponse.findMany({ orderBy: { timestamp: 'desc' } }),
    ]);

    const toMap = (groups: { _count: number; [key: string]: unknown }[], key: string) =>
      Object.fromEntries(groups.map((g) => [g[key], g._count]));

    return NextResponse.json({
      total,
      byRole: toMap(byRole, 'role'),
      byGender: toMap(byGender, 'gender'),
      byAction: toMap(byAction, 'action'),
      responses,
    });
  } catch {
    return NextResponse.json({ total: 0, responses: [] });
  }
}
