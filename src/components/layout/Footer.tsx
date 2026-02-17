import Link from 'next/link';
import { Heart, BookOpen } from 'lucide-react';
import { ROUTES, SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-unicef-light border-t border-unicef-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/UNICEF_ForEveryChild_Cyan_Vertical_RGB_SP.png"
              alt="UNICEF Colombia"
            />
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
              <span className="text-sm font-semibold">3 libros disponibles</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-unicef/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {SITE_CONFIG.organization}. Todos los derechos reservados.
          </p>
          <p className="text-gray-400 text-xs flex items-center gap-1">
            Hecho con <Heart size={12} className="text-accent-coral fill-accent-coral" /> para la infancia colombiana
          </p>
        </div>
      </div>
    </footer>
  );
}
