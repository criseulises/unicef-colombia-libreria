import { fetchAvailableBooks } from '@/lib/api';
import BibliotecaClient from './BibliotecaClient';

export const metadata = {
  title: 'Biblioteca | UNICEF Colombia',
  description: 'Explora nuestra colección de libros digitales accesibles para niños y niñas de Colombia.',
};

export default async function BibliotecaPage() {
  const books = await fetchAvailableBooks();
  return <BibliotecaClient books={books} />;
}
