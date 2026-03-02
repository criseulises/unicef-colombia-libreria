import Link from 'next/link';
import Image from 'next/image';
import { Heart, BookOpen } from 'lucide-react';
import { ROUTES, SITE_CONFIG } from '@/lib/constants';
import { prisma } from '@/lib/prisma';

const INSTITUTIONAL_LOGOS = [
  {
    src: 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328011/unicef-libros/logos/UNICEF_ForEveryChild_Cyan_Vertical_RGB_SP.png',
    alt: 'UNICEF - Para cada infancia',
    width: 180,
    height: 80,
    className: 'h-14 md:h-[4.5rem]',
  },
  {
    src: 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328013/unicef-libros/logos/logo-icbf.png',
    alt: 'ICBF - Instituto Colombiano de Bienestar Familiar',
    width: 140,
    height: 160,
    className: 'h-16 md:h-20',
  },
  {
    src: 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328014/unicef-libros/logos/logo-insor.png',
    alt: 'INSOR - Instituto Nacional para Sordos',
    width: 200,
    height: 200,
    className: 'h-12 md:h-14',
  },
  {
    src: 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328014/unicef-libros/logos/logo-inci.png',
    alt: 'INCI - Instituto Nacional para Ciegos',
    width: 320,
    height: 90,
    className: 'h-8 md:h-10',
  },
  {
    src: 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328016/unicef-libros/logos/logo-fsc.png',
    alt: 'Fundación Saldarriaga Concha',
    width: 280,
    height: 140,
    className: 'h-12 md:h-14',
  },
];

export default async function Footer() {
  let bookCount = 0;
  try {
    bookCount = await prisma.book.count({ where: { available: true } });
  } catch {
    // DB unavailable during build
  }
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold text-unicef-dark mb-4 text-lg">
              Navegación
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={ROUTES.HOME} className="text-gray-500 hover:text-unicef transition-colors text-sm font-medium">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href={ROUTES.LIBRARY} className="text-gray-500 hover:text-unicef transition-colors text-sm font-medium">
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-500 hover:text-unicef transition-colors text-sm font-medium">
                  Panel administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-heading font-bold text-unicef-dark mb-4 text-lg">
              Sobre el proyecto
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Libros digitales accesibles diseñados para promover la lectura y el aprendizaje de todos los niños y niñas de Colombia.
            </p>
            <div className="flex items-center gap-2 mt-4 text-unicef">
              <BookOpen size={16} />
              <span className="text-sm font-semibold">{bookCount} libros disponibles</span>
            </div>
          </div>
        </div>

        {/* Institutional Logos */}
        <div className="mt-10 pt-8 border-t border-unicef/10">
          <p className="text-center text-sm font-semibold text-unicef-dark mb-6">
            Con el apoyo de
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {INSTITUTIONAL_LOGOS.map((logo) => (
              <div key={logo.src} className="relative shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} w-auto object-contain`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-unicef/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.organization}. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3">
            <p className="text-gray-400 text-xs flex items-center gap-1">
              Hecho con <Heart size={12} className="text-accent-coral fill-accent-coral" /> para la infancia colombiana
            </p>
            <Link href="/login" className="text-gray-300 hover:text-gray-400 transition-colors text-[10px]">
              ·
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
