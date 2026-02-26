'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Library, Home, ExternalLink } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Inicio', href: ROUTES.HOME, icon: Home, external: false },
    { label: 'Biblioteca', href: ROUTES.LIBRARY, icon: Library, external: false },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-unicef-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/UNICEF_ForEveryChild_Cyan_Vertical_RGB_SP.png"
              alt="UNICEF - Para cada infancia"
              width={240}
              height={100}
              priority
              className="h-20 md:h-24 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  !item.external && isActive(item.href)
                    ? 'text-unicef bg-unicef-light'
                    : 'text-gray-600 hover:text-unicef hover:bg-unicef-light'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            ))}
            <Link
              href={ROUTES.ABOUT_PROJECT}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 flex items-center gap-2 px-5 py-2.5 bg-unicef text-white rounded-lg font-bold hover:bg-unicef-dark transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
            >
              <ExternalLink size={16} />
              Sobre el proyecto
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
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                    !item.external && isActive(item.href)
                      ? 'text-unicef bg-unicef-light'
                      : 'text-gray-600 hover:text-unicef hover:bg-unicef-light'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              ))}
              <Link
                href={ROUTES.ABOUT_PROJECT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 mx-2 mt-2 px-5 py-3 bg-unicef text-white rounded-lg font-bold hover:bg-unicef-dark transition-all shadow-md"
              >
                <ExternalLink size={16} />
                Sobre el proyecto
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
