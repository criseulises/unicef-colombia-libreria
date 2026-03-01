'use client';

export default function PublicError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="font-heading text-2xl font-bold text-gray-800 mb-2">
          Algo salió mal
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Ocurrió un error inesperado. Por favor intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-unicef text-white rounded-lg font-bold text-sm hover:bg-unicef-dark transition-colors cursor-pointer"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
