'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Clock } from 'lucide-react';
import { Book } from '@/types';
import { ROUTES } from '@/lib/constants';

interface BookCardProps {
  book: Book;
  index?: number;
}

export default function BookCard({ book, index = 0 }: BookCardProps) {
  const colorAccents = [
    'from-blue-400 to-cyan-400',
    'from-emerald-400 to-teal-400',
    'from-orange-400 to-amber-400',
  ];

  const accent = colorAccents[index % colorAccents.length];

  return (
    <Link
      href={ROUTES.BOOK_DETAIL(book.slug)}
      className="group block"
    >
      <div className="relative bg-white rounded-xl overflow-hidden book-shadow transition-all duration-300 hover:-translate-y-2">
        {/* Color accent top */}
        <div className={`h-2 bg-gradient-to-r ${accent}`} />

        {/* Cover */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
            <span className="flex items-center gap-2 text-white font-bold text-sm bg-unicef/90 px-4 py-2 rounded-lg">
              <BookOpen size={16} />
              Ver detalles
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-heading text-lg font-bold text-gray-800 group-hover:text-unicef transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            {book.author}
          </p>
          <p className="text-sm text-gray-400 mt-2 line-clamp-2 leading-relaxed">
            {book.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
              <Clock size={12} />
              {book.pages} págs.
            </span>
            <span className="text-xs bg-unicef-light text-unicef px-2.5 py-0.5 rounded-md font-bold">
              {book.ageRange}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
