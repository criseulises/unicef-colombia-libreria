import Hero from '@/components/home/Hero';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import About from '@/components/home/About';
import { fetchAvailableBooks } from '@/lib/api';

export default async function Home() {
  const books = await fetchAvailableBooks();

  return (
    <>
      <Hero books={books} />
      <FeaturedBooks />
      <About />
    </>
  );
}
