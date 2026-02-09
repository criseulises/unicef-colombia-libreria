'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-unicef-light via-white to-blue-50">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-accent-yellow/20 rounded-full animate-float" />
      <div className="absolute top-40 right-20 w-14 h-14 bg-accent-coral/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-accent-mint/20 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-20 right-1/3 w-8 h-8 bg-accent-purple/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-unicef/10 text-unicef px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles size={16} />
              UNICEF Colombia
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight">
              Historias que{' '}
              <span className="text-unicef relative">
                inspiran
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8C40 2 80 2 100 6C120 10 160 10 198 4" stroke="#ffc107" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              a la infancia
            </h1>

            <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">
              Descubre nuestra colección de libros digitales accesibles,
              diseñados con amor para los niños y niñas de Colombia.
              Cada historia es una aventura por vivir.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href={ROUTES.LIBRARY}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-unicef text-white rounded-2xl font-bold text-lg hover:bg-unicef-dark transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                <BookOpen size={22} />
                Explorar biblioteca
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 flex gap-8">
              <div>
                <div className="font-heading text-3xl font-extrabold text-unicef">3</div>
                <div className="text-sm text-gray-400 font-medium">Libros disponibles</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <div className="font-heading text-3xl font-extrabold text-accent-coral">100%</div>
                <div className="text-sm text-gray-400 font-medium">Gratuitos</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <div className="font-heading text-3xl font-extrabold text-accent-mint">2</div>
                <div className="text-sm text-gray-400 font-medium">Plataformas</div>
              </div>
            </div>
          </div>

          {/* Book covers fan */}
          <div className="relative flex justify-center items-center min-h-[400px] animate-scale-in">
            <div className="relative w-[280px] h-[370px] sm:w-[320px] sm:h-[420px]">
              {/* Book 3 (back) */}
              <div className="absolute left-0 top-4 w-[200px] sm:w-[220px] h-[280px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl rotate-[-8deg] hover:rotate-[-4deg] transition-transform duration-500 cursor-pointer">
                <Image
                  src="/images/covers/helena-y-una-carta-para-su-papa.webp"
                  alt="Helena y una carta para su papá"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>

              {/* Book 2 (middle) */}
              <div className="absolute right-0 top-0 w-[200px] sm:w-[220px] h-[280px] sm:h-[300px] rounded-2xl overflow-hidden shadow-xl rotate-[6deg] hover:rotate-[3deg] transition-transform duration-500 cursor-pointer z-10">
                <Image
                  src="/images/covers/una-chalupa-para-juan.webp"
                  alt="Una chalupa para Juan"
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>

              {/* Book 1 (front) */}
              <div className="absolute left-1/2 -translate-x-1/2 top-8 w-[200px] sm:w-[230px] h-[280px] sm:h-[310px] rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer z-20">
                <Image
                  src="/images/covers/momo.webp"
                  alt="Momo"
                  fill
                  className="object-cover"
                  sizes="230px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 24C1248 24 1344 32 1392 36L1440 40V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
