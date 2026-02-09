'use client';

import { useState } from 'react';
import { Library, Search, BookOpen, BookX } from 'lucide-react';
import { Book } from '@/types';
import BookCard from '@/components/ui/BookCard';

interface Props {
  books: Book[];
}

export default function BibliotecaClient({ books }: Props) {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.categories.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-unicef-light via-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-unicef/10 text-unicef px-4 py-2 rounded-lg text-sm font-bold mb-4">
            <Library size={16} />
            Biblioteca
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-gray-800">
            Nuestra{' '}
            <span className="text-unicef">biblioteca</span>
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
            Explora todos los libros disponibles. Cada uno es una puerta
            a un mundo lleno de imaginación y aprendizaje.
          </p>

          {/* Search */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por título, autor o categoría..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-lg border-2 border-gray-200 focus:border-unicef focus:ring-0 focus:outline-none bg-white text-sm font-medium placeholder:text-gray-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filteredBooks.length > 0 ? (
          <>
            <div className="flex items-center gap-2 mb-8 text-gray-500">
              <BookOpen size={18} />
              <span className="text-sm font-medium">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'libro encontrado' : 'libros encontrados'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <BookCard book={book} index={index} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <BookX size={56} className="mx-auto mb-4 text-gray-300" />
            <h3 className="font-heading text-xl font-bold text-gray-600">
              No se encontraron libros
            </h3>
            <p className="text-gray-400 mt-2">
              Intenta con otra búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
