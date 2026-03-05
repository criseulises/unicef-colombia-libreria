import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const booksData = [
  {
    id: "1",
    slug: "momo",
    title: "Momo",
    author: "Omar Castro",
    illustrator: "Omar Castro",
    description: "Una entrañable historia sobre un perro llamado Momo que nos enseña sobre la amistad, la lealtad y el amor incondicional.",
    longDescription: "Momo es un libro ilustrado que narra la conmovedora historia de un perro que descubre el verdadero significado de la amistad y el hogar. A través de ilustraciones hechas a mano con lápices de colores, Omar Castro nos transporta a un mundo donde los lazos entre humanos y animales trascienden las palabras. Esta historia invita a los niños y niñas a reflexionar sobre el cuidado de los animales, la empatía y los vínculos afectivos que construimos a lo largo de la vida.",
    coverImage: "https://res.cloudinary.com/dsut2hscl/image/upload/v1772328008/unicef-libros/covers/momo.webp",
    readingUrl: "https://unicef-books-colombia.vercel.app/",
    downloadUrl: "https://drive.google.com/drive/folders/1ii0KRVDSLk-7t-JlY3b_Ds0Pgj33b5st",
    pages: 32,
    year: "2024",
    language: "Español",
    publisher: "UNICEF Colombia",
    categories: ["Infantil", "Ilustrado", "Animales"],
    ageRange: "6-10 años",
    available: true,
  },
  {
    id: "2",
    slug: "una-chalupa-para-juan",
    title: "Una chalupa para Juan",
    author: "UNICEF Colombia",
    illustrator: "UNICEF Colombia",
    description: "Juan emprende una mágica aventura por los ríos de Colombia a bordo de su chalupa, descubriendo la riqueza natural y cultural de su país.",
    longDescription: "Una chalupa para Juan es una aventura llena de color y magia que recorre los paisajes acuáticos de Colombia. Juan, un niño curioso y valiente, navega por los ríos en su chalupa acompañado de un delfín rosado, descubriendo la biodiversidad y las tradiciones de las comunidades ribereñas. Este libro celebra la riqueza natural de Colombia y enseña a los más pequeños sobre la importancia de proteger los ecosistemas acuáticos y valorar las culturas ancestrales.",
    coverImage: "https://res.cloudinary.com/dsut2hscl/image/upload/v1772328009/unicef-libros/covers/una-chalupa-para-juan.webp",
    readingUrl: "https://reader.bookfusion.com/books/4104523-una-chalupa-para-juan?type=epub_fixed",
    downloadUrl: "",
    pages: 28,
    year: "2024",
    language: "Español",
    publisher: "UNICEF Colombia",
    categories: ["Infantil", "Aventura", "Naturaleza"],
    ageRange: "6-10 años",
    available: true,
  },
  {
    id: "3",
    slug: "helena-y-una-carta-para-su-papa",
    title: "Helena y una carta para su papá",
    author: "Yolanda Astrid Pine Rúa",
    illustrator: "Daniel Franco Carmona",
    description: "Helena escribe una carta llena de amor y esperanza para su papá, explorando los sentimientos y la conexión familiar a través de las palabras.",
    longDescription: "Helena y una carta para su papá es una historia profundamente emotiva que explora los lazos familiares a través de los ojos de una niña afrodescendiente colombiana. Helena decide escribir una carta a su papá, y en el proceso descubre el poder de las palabras para expresar emociones, superar la distancia y fortalecer los vínculos afectivos. Con las hermosas ilustraciones de Daniel Franco Carmona, este libro invita a los niños y niñas a valorar la comunicación, la familia y la diversidad cultural de Colombia.",
    coverImage: "https://res.cloudinary.com/dsut2hscl/image/upload/v1772328010/unicef-libros/covers/helena-y-una-carta-para-su-papa.webp",
    readingUrl: "https://reader.bookfusion.com/books/4265925-helena-y-una-carta-para-su-papa-offline-videos?type=epub_fixed",
    downloadUrl: "",
    pages: 30,
    year: "2024",
    language: "Español",
    publisher: "UNICEF Colombia",
    categories: ["Infantil", "Familia", "Emociones"],
    ageRange: "6-10 años",
    available: true,
  },
]

const surveysData = [
  { bookId: "1", bookTitle: "Momo", role: "docente", gender: "prefiero_no_decir", action: "descargar", timestamp: "2026-02-09T13:56:48.781Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "estudiante", gender: "otro", action: "leer", timestamp: "2026-02-09T14:51:56.794Z" },
  { bookId: "1", bookTitle: "Momo", role: "otro", gender: "femenino", action: "descargar", timestamp: "2026-02-09T15:48:36.255Z" },
  { bookId: "1", bookTitle: "Momo", role: "estudiante", gender: "prefiero_no_decir", action: "descargar", timestamp: "2026-02-09T15:48:51.171Z" },
  { bookId: "1", bookTitle: "Momo", role: "estudiante", gender: "masculino", action: "leer", timestamp: "2026-02-09T15:49:32.970Z" },
  { bookId: "1", bookTitle: "Momo", role: "estudiante", gender: "masculino", action: "leer", timestamp: "2026-02-09T15:51:15.635Z" },
  { bookId: "1", bookTitle: "Momo", role: "docente", gender: "femenino", action: "leer", timestamp: "2026-02-09T15:51:25.134Z" },
  { bookId: "1", bookTitle: "Momo", role: "docente", gender: "otro", action: "leer", timestamp: "2026-02-17T00:10:26.940Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "estudiante", gender: "masculino", action: "leer", timestamp: "2026-02-17T00:12:11.757Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "estudiante", gender: "otro", action: "leer", timestamp: "2026-02-17T00:13:40.991Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "estudiante", gender: "otro", action: "leer", timestamp: "2026-02-17T00:13:56.662Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "docente", gender: "otro", action: "leer", timestamp: "2026-02-17T00:14:25.683Z" },
  { bookId: "3", bookTitle: "Helena y una carta para su papá", role: "otro", gender: "masculino", action: "leer", timestamp: "2026-02-17T00:14:36.941Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "familia", ageRange: "0-5", gender: "prefiero_no_decir", action: "leer", timestamp: "2026-02-26T03:33:21.474Z" },
  { bookId: "3", bookTitle: "Helena y una carta para su papá", role: "nino", ageRange: "0-5", gender: "femenino", action: "leer", timestamp: "2026-02-26T03:33:34.824Z" },
  { bookId: "3", bookTitle: "Helena y una carta para su papá", role: "nino", ageRange: "0-5", gender: "otro", action: "descargar", timestamp: "2026-02-26T03:33:48.835Z" },
  { bookId: "2", bookTitle: "Una chalupa para Juan", role: "nina", ageRange: "6-10", gender: "masculino", action: "leer", timestamp: "2026-02-26T03:45:55.251Z" },
]

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.surveyResponse.deleteMany()
  await prisma.bookCategory.deleteMany()
  await prisma.book.deleteMany()
  await prisma.category.deleteMany()

  // Collect all unique categories
  const allCategories = [...new Set(booksData.flatMap(b => b.categories))]

  // Create categories
  const categoryMap: Record<string, string> = {}
  for (const name of allCategories) {
    const category = await prisma.category.create({
      data: { name, slug: slugify(name) },
    })
    categoryMap[name] = category.id
  }
  console.log(`✅ Created ${allCategories.length} categories`)

  // Create books with their category relationships
  const bookIdMap: Record<string, string> = {}
  for (const bookData of booksData) {
    const { categories, id: originalId, ...rest } = bookData
    const book = await prisma.book.create({
      data: {
        ...rest,
        categories: {
          create: categories.map(catName => ({
            category: { connect: { id: categoryMap[catName] } },
          })),
        },
      },
    })
    bookIdMap[originalId] = book.id
  }
  console.log(`✅ Created ${booksData.length} books`)

  // Create survey responses
  for (const survey of surveysData) {
    const dbBookId = bookIdMap[survey.bookId]
    if (!dbBookId) continue

    await prisma.surveyResponse.create({
      data: {
        bookId: dbBookId,
        bookTitle: survey.bookTitle,
        role: survey.role,
        ageRange: (survey as Record<string, string>).ageRange || null,
        gender: survey.gender,
        action: survey.action,
        timestamp: new Date(survey.timestamp),
      },
    })
  }
  console.log(`✅ Created ${surveysData.length} survey responses`)

  // Create admin user
  await prisma.user.deleteMany()
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      name: 'Admin UNICEF',
      email: 'admin@unicef.org',
      password: hashedPassword,
      role: 'admin',
    },
  })
  console.log('✅ Created admin user (admin@unicef.org / admin123)')

  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
