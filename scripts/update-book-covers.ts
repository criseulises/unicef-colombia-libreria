import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COVER_UPDATES: Record<string, string> = {
  'momo': 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328008/unicef-libros/covers/momo.webp',
  'una-chalupa-para-juan': 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328009/unicef-libros/covers/una-chalupa-para-juan.webp',
  'helena-y-una-carta-para-su-papa': 'https://res.cloudinary.com/dsut2hscl/image/upload/v1772328010/unicef-libros/covers/helena-y-una-carta-para-su-papa.webp',
};

async function main() {
  console.log('Updating book cover URLs to Cloudinary...\n');

  for (const [slug, cloudinaryUrl] of Object.entries(COVER_UPDATES)) {
    const result = await prisma.book.updateMany({
      where: { slug },
      data: { coverImage: cloudinaryUrl },
    });

    if (result.count > 0) {
      console.log(`Updated ${slug} -> ${cloudinaryUrl}`);
    } else {
      console.log(`Book not found: ${slug}`);
    }
  }

  console.log('\nDone!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
