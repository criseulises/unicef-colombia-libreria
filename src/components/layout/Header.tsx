'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, BookOpen, Library, Home } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: ROUTES.HOME, icon: Home },
    { label: 'Biblioteca', href: ROUTES.LIBRARY, icon: Library },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-unicef-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo_unicef.webp"
              alt="UNICEF - Para cada infancia"
              width={200}
              height={40}
              className="h-8 md:h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-unicef hover:bg-unicef-light font-semibold transition-all duration-200"
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.LIBRARY}
              className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-unicef text-white rounded-full font-bold hover:bg-unicef-dark transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <BookOpen size={18} />
              Explorar Libros
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-unicef-light transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden pb-4 animate-fade-in-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-unicef hover:bg-unicef-light font-semibold transition-all"
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
              <Link
                href={ROUTES.LIBRARY}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 mx-2 mt-2 px-5 py-3 bg-unicef text-white rounded-xl font-bold hover:bg-unicef-dark transition-all shadow-md"
              >
                <BookOpen size={18} />
                Explorar Libros
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
