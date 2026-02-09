import { Book } from '@/types';

const isServer = typeof window === 'undefined';

async function loadBooks(): Promise<Book[]> {
  if (isServer) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public', 'data', 'books.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } else {
    const response = await fetch('/data/books.json');
    return response.json();
  }
}

export async function fetchBooks(): Promise<Book[]> {
  return loadBooks();
}

export async function fetchBookBySlug(slug: string): Promise<Book | null> {
  const books = await loadBooks();
  return books.find((book) => book.slug === slug) || null;
}

export async function fetchAvailableBooks(): Promise<Book[]> {
  const books = await loadBooks();
  return books.filter((book) => book.available);
}
