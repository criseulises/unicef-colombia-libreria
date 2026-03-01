import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { bookSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = bookSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos invalidos', details: result.error.issues },
        { status: 400 }
      );
    }

    const { categories, ...bookData } = result.data;

    const categoryIds: string[] = [];
    for (const name of categories) {
      const category = await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name, slug: slugify(name) },
      });
      categoryIds.push(category.id);
    }

    const book = await prisma.book.create({
      data: {
        ...bookData,
        categories: {
          create: categoryIds.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al crear libro';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
