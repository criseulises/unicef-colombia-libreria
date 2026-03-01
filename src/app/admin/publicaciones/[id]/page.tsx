import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BookForm from '@/components/admin/BookForm';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPublicacionPage({ params }: Props) {
  const { id } = await params;

  const book = await prisma.book.findUnique({
    where: { id },
    include: { categories: { include: { category: true } } },
  });

  if (!book) notFound();

  return (
    <BookForm
      bookId={book.id}
      initialData={{
        title: book.title,
        slug: book.slug,
        author: book.author,
        illustrator: book.illustrator,
        description: book.description,
        longDescription: book.longDescription,
        coverImage: book.coverImage,
        readingUrl: book.readingUrl,
        downloadUrl: book.downloadUrl,
        pages: book.pages,
        year: book.year,
        language: book.language,
        publisher: book.publisher,
        ageRange: book.ageRange,
        available: book.available,
        categories: book.categories.map((c) => c.category.name).join(', '),
      }}
    />
  );
}
