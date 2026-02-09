import { fetchBookBySlug, fetchBooks } from '@/lib/api';
import { notFound } from 'next/navigation';
import BookDetailClient from '@/components/BookDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const books = await fetchBooks();
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await fetchBookBySlug(slug);
  if (!book) return { title: 'Libro no encontrado' };
  return {
    title: `${book.title} | UNICEF Colombia`,
    description: book.description,
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await fetchBookBySlug(slug);

  if (!book) {
    notFound();
  }

  return <BookDetailClient book={book} />;
}
