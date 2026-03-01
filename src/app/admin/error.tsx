'use client';

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Error en el panel
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
