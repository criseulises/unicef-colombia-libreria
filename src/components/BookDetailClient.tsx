'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  ArrowLeft,
  User,
  Palette,
  Calendar,
  FileText,
  Globe,
  Tag,
  Smartphone,
  Monitor,
} from 'lucide-react';
import { Book } from '@/types';
import { ROUTES } from '@/lib/constants';
import SurveyModal from '@/components/ui/SurveyModal';

interface Props {
  book: Book;
}

export default function BookDetailClient({ book }: Props) {
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [surveyAction, setSurveyAction] = useState<'leer' | 'descargar'>('leer');

  const handleAction = (action: 'leer' | 'descargar') => {
    setSurveyAction(action);
    setSurveyOpen(true);
  };

  const colorAccents = {
    momo: { gradient: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    'una-chalupa-para-juan': { gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50', text: 'text-emerald-600' },
    'helena-y-una-carta-para-su-papa': { gradient: 'from-orange-400 to-amber-500', bg: 'bg-orange-50', text: 'text-orange-600' },
  };

  const accent = colorAccents[book.slug as keyof typeof colorAccents] || colorAccents.momo;

  const details = [
    { icon: User, label: 'Autor', value: book.author },
    { icon: Palette, label: 'Ilustrador', value: book.illustrator },
    { icon: FileText, label: 'Páginas', value: `${book.pages} páginas` },
    { icon: Calendar, label: 'Año', value: book.year },
    { icon: Globe, label: 'Idioma', value: book.language },
    { icon: Tag, label: 'Editorial', value: book.publisher },
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Top gradient */}
        <div className={`h-2 bg-gradient-to-r ${accent.gradient}`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back */}
          <Link
            href={ROUTES.LIBRARY}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-unicef font-medium text-sm mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Volver a la biblioteca
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
            {/* Cover */}
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div className="relative aspect-video rounded-xl overflow-hidden book-shadow max-w-sm mx-auto lg:max-w-none">
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 400px, 350px"
                    priority
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleAction('leer')}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-unicef text-white rounded-lg font-bold text-base hover:bg-unicef-dark transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <BookOpen size={20} />
                    Leer
                  </button>
                  <button
                    onClick={() => handleAction('descargar')}
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent-mint text-white rounded-lg font-bold text-base hover:bg-green-500 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <Download size={20} />
                    Descargar
                  </button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-3">
                  Disponible para Android y Windows
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-3">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {book.categories.map((category) => (
                  <span
                    key={category}
                    className={`text-xs font-bold px-3 py-1 rounded-md ${accent.bg} ${accent.text}`}
                  >
                    {category}
                  </span>
                ))}
                <span className="text-xs font-bold px-3 py-1 rounded-md bg-unicef-light text-unicef">
                  {book.ageRange}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight">
                {book.title}
              </h1>

              <p className="mt-2 text-lg text-gray-500 font-medium">
                por <span className="text-unicef">{book.author}</span>
              </p>

              {/* Description */}
              <div className="mt-8">
                <h2 className="font-heading text-xl font-bold text-gray-800 mb-3">
                  Sobre este libro
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  {book.longDescription}
                </p>
              </div>

              {/* Details Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                  >
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <detail.icon size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">
                        {detail.label}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-gray-700">{detail.value}</p>
                  </div>
                ))}
              </div>

              {/* Download info */}
              <div className="mt-10 bg-gradient-to-r from-unicef-light to-blue-50 rounded-lg p-6 border border-unicef/10">
                <h3 className="font-heading text-lg font-bold text-unicef-dark mb-2">
                  Descarga disponible
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Este libro está disponible para descarga gratuita tanto para
                  <strong> Android</strong> como para <strong>Windows</strong>.
                  Al descargar, te pediremos unos datos básicos que nos ayudan
                  a mejorar nuestros recursos educativos.
                </p>
                <div className="flex gap-3 mt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-gray-600 px-3 py-1.5 rounded-md border border-gray-200">
                    <Smartphone size={14} /> Android
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-gray-600 px-3 py-1.5 rounded-md border border-gray-200">
                    <Monitor size={14} /> Windows
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SurveyModal
        isOpen={surveyOpen}
        onClose={() => setSurveyOpen(false)}
        book={book}
        action={surveyAction}
      />
    </>
  );
}
