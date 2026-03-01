import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import fs from 'fs';

// Load .env manually (dotenv not installed as dependency)
const envFile = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8');
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=["']?([^"'\n]*)["']?/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PUBLIC_DIR = path.join(process.cwd(), 'public');

const IMAGES_TO_UPLOAD = [
  // Book covers (use the .webp versions - smaller and optimized)
  { local: 'images/covers/momo.webp', folder: 'unicef-libros/covers' },
  { local: 'images/covers/una-chalupa-para-juan.webp', folder: 'unicef-libros/covers' },
  { local: 'images/covers/helena-y-una-carta-para-su-papa.webp', folder: 'unicef-libros/covers' },
  // Logos
  { local: 'images/UNICEF_ForEveryChild_Cyan_Vertical_RGB_SP.png', folder: 'unicef-libros/logos' },
  { local: 'images/logo_unicef.webp', folder: 'unicef-libros/logos' },
  { local: 'images/logos/logo-icbf.png', folder: 'unicef-libros/logos' },
  { local: 'images/logos/logo-insor.png', folder: 'unicef-libros/logos' },
  { local: 'images/logos/logo-inci.png', folder: 'unicef-libros/logos' },
  { local: 'images/logos/logo-fsc.png', folder: 'unicef-libros/logos' },
];

async function uploadAll() {
  console.log('Uploading images to Cloudinary...\n');

  const results: Record<string, string> = {};

  for (const image of IMAGES_TO_UPLOAD) {
    const filePath = path.join(PUBLIC_DIR, image.local);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${image.local}`);
      continue;
    }

    const fileName = path.parse(image.local).name;

    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: image.folder,
        public_id: fileName,
        overwrite: true,
        resource_type: 'image',
      });

      results[`/${image.local}`] = result.secure_url;
      console.log(`✅ ${image.local} → ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ Error uploading ${image.local}:`, error);
    }
  }

  console.log('\n--- URL Mapping ---');
  console.log(JSON.stringify(results, null, 2));

  // Write the mapping to a file for reference
  fs.writeFileSync(
    path.join(process.cwd(), 'cloudinary-urls.json'),
    JSON.stringify(results, null, 2)
  );
  console.log('\nMapping saved to cloudinary-urls.json');
}

uploadAll().catch(console.error);
