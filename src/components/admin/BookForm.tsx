'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { SITE_CONFIG } from '@/lib/constants';

interface BookFormData {
  title: string;
  slug: string;
  author: string;
  illustrator: string;
  description: string;
  longDescription: string;
  coverImage: string;
  readingUrl: string;
  downloadUrl: string;
  pages: number;
  year: string;
  language: string;
  publisher: string;
  ageRange: string;
  available: boolean;
  categories: string;
}

interface Props {
  initialData?: BookFormData;
  bookId?: string;
}

export default function BookForm({ initialData, bookId }: Props) {
  const isEditing = !!bookId;
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<BookFormData>(
    initialData || {
      title: '',
      slug: '',
      author: '',
      illustrator: '',
      description: '',
      longDescription: '',
      coverImage: '',
      readingUrl: '',
      downloadUrl: '',
      pages: 0,
      year: new Date().getFullYear().toString(),
      language: 'Español',
      publisher: SITE_CONFIG.organization,
      ageRange: '6-10 años',
      available: true,
      categories: '',
    }
  );

  const updateField = (field: keyof BookFormData, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === 'title' && !isEditing) {
      setForm((prev) => ({ ...prev, slug: slugify(value as string) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const url = isEditing ? `/api/books/${bookId}` : '/api/books';
    const method = isEditing ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        pages: Number(form.pages),
        categories: form.categories.split(',').map((c) => c.trim()).filter(Boolean),
      }),
    });

    if (res.ok) {
      router.push('/admin/publicaciones');
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || 'Error al guardar');
      setSaving(false);
    }
  };

  const fields: { label: string; field: keyof BookFormData; type?: string; placeholder?: string; required?: boolean; fullWidth?: boolean }[] = [
    { label: 'Título', field: 'title', placeholder: 'Nombre del libro', required: true },
    { label: 'Slug (URL)', field: 'slug', placeholder: 'nombre-del-libro', required: true },
    { label: 'Autor', field: 'author', placeholder: 'Nombre del autor', required: true },
    { label: 'Ilustrador', field: 'illustrator', placeholder: 'Nombre del ilustrador', required: true },
    { label: 'URL de portada', field: 'coverImage', placeholder: 'https://res.cloudinary.com/...', required: true },
    { label: 'URL de lectura', field: 'readingUrl', placeholder: 'https://...', required: true },
    { label: 'URL de descarga', field: 'downloadUrl', placeholder: 'https://...', required: true },
    { label: 'Páginas', field: 'pages', type: 'number', placeholder: '32' },
    { label: 'Año', field: 'year', placeholder: '2024' },
    { label: 'Idioma', field: 'language', placeholder: 'Español' },
    { label: 'Editorial', field: 'publisher', placeholder: 'UNICEF Colombia' },
    { label: 'Rango de edad', field: 'ageRange', placeholder: '6-10 años' },
    { label: 'Categorías (separadas por coma)', field: 'categories', placeholder: 'Infantil, Aventura, Naturaleza', fullWidth: true },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/publicaciones" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Editar libro' : 'Nuevo libro'}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {isEditing ? 'Modifica los datos del libro' : 'Agrega un nuevo libro a la biblioteca'}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-600 text-sm font-medium px-4 py-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map(({ label, field, type, placeholder, required, fullWidth }) => (
            <div key={field} className={fullWidth ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
              <input
                type={type || 'text'}
                value={form[field] as string | number}
                onChange={(e) => updateField(field, type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
                placeholder={placeholder}
                required={required}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicef focus:border-transparent outline-none text-sm"
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mt-5">
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Descripción corta</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={2}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicef focus:border-transparent outline-none text-sm resize-none"
          />
        </div>

        <div className="mt-5">
          <label className="block text-sm font-bold text-gray-700 mb-1.5">Descripción larga</label>
          <textarea
            value={form.longDescription}
            onChange={(e) => updateField('longDescription', e.target.value)}
            rows={4}
            required
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-unicef focus:border-transparent outline-none text-sm resize-none"
          />
        </div>

        {/* Available toggle */}
        <div className="mt-5 flex items-center gap-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) => updateField('available', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-unicef rounded-full peer peer-checked:bg-unicef after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
          <span className="text-sm font-medium text-gray-700">Visible en la biblioteca</span>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-unicef text-white rounded-lg text-sm font-bold hover:bg-unicef-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            <Save size={16} />
            {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear libro'}
          </button>
        </div>
      </form>
    </div>
  );
}
