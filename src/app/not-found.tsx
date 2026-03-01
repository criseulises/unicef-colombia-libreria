import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ROUTES } from '@/lib/constants';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex items-center justify-center px-4 py-20">
        <div className="flex items-center gap-8">
          <div className="animate-[search_3s_ease-in-out_infinite] shrink-0">
            <svg
              width="100"
              height="100"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="34"
                cy="34"
                r="20"
                stroke="#2596be"
                strokeWidth="4"
                className="animate-[pulse_2s_ease-in-out_infinite]"
              />
              <line
                x1="49"
                y1="49"
                x2="68"
                y2="68"
                stroke="#2596be"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text
                x="34"
                y="40"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="#2596be"
              >
                ?
              </text>
            </svg>
          </div>
          <div>
            <p className="text-7xl font-bold text-unicef mb-2">404</p>
            <h2 className="font-heading text-2xl font-bold text-gray-800 mb-1">
              Página no encontrada
            </h2>
            <p className="text-gray-500 text-base mb-5">
              La página que buscas no existe o fue movida.
            </p>
            <Link
              href={ROUTES.HOME}
              className="px-6 py-2.5 bg-unicef text-white rounded-lg font-bold text-sm hover:bg-unicef-dark transition-colors inline-block"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @keyframes search {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-12px) rotate(-15deg); }
          75% { transform: translateX(12px) rotate(15deg); }
        }
      `}</style>
    </>
  );
}
