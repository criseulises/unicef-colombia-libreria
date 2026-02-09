export const ROUTES = {
  HOME: '/',
  LIBRARY: '/biblioteca',
  BOOK_DETAIL: (slug: string) => `/libros/${slug}`,
} as const;

export const COLORS = {
  unicef: {
    primary: '#2596be',
    dark: '#1a7a9e',
    light: '#e8f6fb',
    accent: '#ffc107',
    coral: '#ff6b6b',
    mint: '#51cf66',
    purple: '#9775fa',
    pink: '#f06595',
    orange: '#ff922b',
  },
} as const;

export const DOWNLOAD_URL = 'https://drive.google.com/drive/folders/1ii0KRVDSLk-7t-JlY3b_Ds0Pgj33b5st';

export const SITE_CONFIG = {
  name: 'Libros Digitales UNICEF Colombia',
  shortName: 'UNICEF Libros',
  description: 'Plataforma de libros digitales accesibles para niños y niñas de Colombia, una iniciativa de UNICEF.',
  organization: 'UNICEF Colombia',
  tagline: 'Para cada infancia, un libro',
} as const;
