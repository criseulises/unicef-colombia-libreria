'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteBookButton({ bookId, bookTitle }: { bookId: string; bookTitle: string }) {
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleDelete = async () => {
    setError('');
    try {
      const res = await fetch(`/api/books/${bookId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar el libro');
      router.refresh();
    } catch {
      setError('Error al eliminar');
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="text-xs px-2 py-1 bg-red-600 text-white rounded font-bold hover:bg-red-700 cursor-pointer"
        >
          Confirmar
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded font-bold hover:bg-gray-300 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => { setError(''); setConfirming(true); }}
        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
        title={`Eliminar ${bookTitle}`}
      >
        <Trash2 size={16} />
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
