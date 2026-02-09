'use client';

import { useEffect, useState } from 'react';
import { Library, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Book } from '@/types';
import { fetchAvailableBooks } from '@/lib/api';
import { ROUTES } from '@/lib/constants';
import BookCard from '@/components/ui/BookCard';

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchAvailableBooks().then(setBooks);
  }, []);

  if (books.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-accent-yellow/15 text-amber-700 px-4 py-2 rounded-lg text-sm font-bold mb-4">
            <Library size={16} />
            Nuestra colección
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-gray-800">
            Libros para{' '}
            <span className="text-unicef">soñar</span> y{' '}
            <span className="text-accent-coral">aprender</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Cada libro ha sido cuidadosamente seleccionado para inspirar,
            educar y entretener a los niños y niñas de Colombia.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <BookCard book={book} index={index} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href={ROUTES.LIBRARY}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-unicef text-unicef rounded-lg font-bold hover:bg-unicef hover:text-white transition-all duration-300 group"
          >
            Ver toda la biblioteca
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
