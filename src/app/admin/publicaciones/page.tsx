import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Eye, EyeOff } from 'lucide-react';
import DeleteBookButton from '@/components/admin/DeleteBookButton';
import StatusBadge from '@/components/ui/StatusBadge';

export default async function PublicacionesPage() {
  const books = await prisma.book.findMany({
    include: { categories: { include: { category: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Publicaciones</h1>
          <p className="text-gray-500 text-sm mt-1">{books.length} libros registrados</p>
        </div>
        <Link
          href="/admin/publicaciones/nueva"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-unicef text-white rounded-lg text-sm font-bold hover:bg-unicef-dark transition-colors"
        >
          <Plus size={18} />
          Agregar libro
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Libro</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Categorías</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Año</th>
              <th className="text-left py-3 px-4 text-gray-500 font-medium">Estado</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{book.title}</p>
                      <p className="text-xs text-gray-500">{book.author}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {book.categories.map((c) => (
                      <span key={c.categoryId} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {c.category.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{book.year}</td>
                <td className="py-3 px-4">
                  <StatusBadge
                    label={book.available ? 'Visible' : 'Oculto'}
                    variant={book.available ? 'success' : 'neutral'}
                    icon={book.available ? Eye : EyeOff}
                  />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/publicaciones/${book.id}`}
                      className="p-1.5 text-gray-400 hover:text-unicef hover:bg-blue-50 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </Link>
                    <DeleteBookButton bookId={book.id} bookTitle={book.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
