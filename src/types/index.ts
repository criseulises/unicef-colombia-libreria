export interface Book {
  id: string;
  slug: string;
  title: string;
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
  categories: string[];
  ageRange: string;
  available: boolean;
}

export interface SurveyResponse {
  bookId: string;
  bookTitle: string;
  role: 'estudiante' | 'docente' | 'otro';
  gender: 'masculino' | 'femenino' | 'otro' | 'prefiero_no_decir';
  action: 'leer' | 'descargar';
  platform?: 'android' | 'windows';
  timestamp: string;
}
