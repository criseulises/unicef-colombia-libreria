import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { bookSchema } from '@/lib/validations';
import { slugify } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const result = bookSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Datos invalidos', details: result.error.issues },
        { status: 400 }
      );
    }

    const { categories, ...bookData } = result.data;

    await prisma.bookCategory.deleteMany({ where: { bookId: id } });

    const categoryIds: string[] = [];
    for (const name of categories) {
      const category = await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name, slug: slugify(name) },
      });
      categoryIds.push(category.id);
    }

    const book = await prisma.book.update({
      where: { id },
      data: {
        ...bookData,
        categories: {
          create: categoryIds.map((catId) => ({
            category: { connect: { id: catId } },
          })),
        },
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al actualizar';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.book.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error al eliminar';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
