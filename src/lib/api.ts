import { prisma } from '@/lib/prisma';
import { Book } from '@/types';

function toBook(dbBook: {
  id: string;
  slug: string;
  title: string;
  author: string;
  illustrator: string;
  description: string;
  longDescription: string;
  coverImage: string;
  readingUrl: string;
  downloadUrl: string;
  pages: number;
  year: string;
  language: string;
  publisher: string;
  ageRange: string;
  available: boolean;
  categories: { category: { name: string } }[];
}): Book {
  return {
    id: dbBook.id,
    slug: dbBook.slug,
    title: dbBook.title,
    author: dbBook.author,
    illustrator: dbBook.illustrator,
    description: dbBook.description,
    longDescription: dbBook.longDescription,
    coverImage: dbBook.coverImage,
    readingUrl: dbBook.readingUrl,
    downloadUrl: dbBook.downloadUrl,
    pages: dbBook.pages,
    year: dbBook.year,
    language: dbBook.language,
    publisher: dbBook.publisher,
    categories: dbBook.categories.map((c) => c.category.name),
    ageRange: dbBook.ageRange,
    available: dbBook.available,
  };
}

export async function fetchBooks(): Promise<Book[]> {
  const books = await prisma.book.findMany({
    include: { categories: { include: { category: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return books.map(toBook);
}

export async function fetchBookBySlug(slug: string): Promise<Book | null> {
  const book = await prisma.book.findUnique({
    where: { slug },
    include: { categories: { include: { category: true } } },
  });
  if (!book) return null;
  return toBook(book);
}

export async function fetchAvailableBooks(): Promise<Book[]> {
  const books = await prisma.book.findMany({
    where: { available: true },
    include: { categories: { include: { category: true } } },
    orderBy: { createdAt: 'desc' },
  });
  return books.map(toBook);
}
