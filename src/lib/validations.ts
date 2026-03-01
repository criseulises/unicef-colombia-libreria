import { z } from 'zod';

export const bookSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  illustrator: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  coverImage: z.string().min(1),
  readingUrl: z.string().url(),
  downloadUrl: z.string().url(),
  pages: z.number().int().positive(),
  year: z.string().min(1),
  language: z.string().min(1),
  publisher: z.string().min(1),
  ageRange: z.string().min(1),
  available: z.boolean(),
  categories: z.array(z.string().min(1)).min(1),
});

export const surveySchema = z.object({
  bookId: z.string().min(1),
  bookTitle: z.string().min(1),
  role: z.enum(['nina', 'nino', 'familia', 'docente', 'estudiante', 'otro']),
  ageRange: z.enum(['0-5', '6-10', '11+']).optional().nullable(),
  gender: z.enum(['masculino', 'femenino', 'otro', 'prefiero_no_decir']),
  action: z.enum(['leer', 'descargar']),
  platform: z.enum(['android', 'windows']).optional().nullable(),
});
