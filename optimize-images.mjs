import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const imagesDir = path.join(process.cwd(), "public/Art-IMGs");
const backupDir = path.join(process.cwd(), "public/Art-IMGs_backup");
const MAX_WIDTH = 1920; // Max width for resized images
const QUALITY = 80; // Quality setting for WEBP

async function optimizeImages() {
  try {
    // 1. Create backup directory if it doesn't exist
    await fs.mkdir(backupDir, { recursive: true });
    console.log(`Backup directory is ready at ${backupDir}`);

    // 2. Read all files from the images directory
    const files = await fs.readdir(imagesDir);
    console.log(`Found ${files.length} files to process.`);

    for (const file of files) {
      const sourcePath = path.join(imagesDir, file);
      const fileStat = await fs.stat(sourcePath);

      // Skip directories
      if (fileStat.isDirectory()) {
        continue;
      }

      // Wrap processing in a try/catch to handle individual file errors
      try {
        const backupPath = path.join(backupDir, file);

        // 3. Backup the original file if it hasn't been backed up already
        try {
          await fs.access(backupPath);
          console.log(`Skipping backup, ${file} already exists in backup.`);
        } catch {
          await fs.copyFile(sourcePath, backupPath);
          console.log(`Backed up ${file}`);
        }

        // 4. Optimize the image
        console.log(`Optimizing ${file}...`);

        const image = sharp(sourcePath);
        const metadata = await image.metadata();

        // Prevent processing of already optimized .webp files that might have been copied over
        if (metadata.format === 'webp') {
            const originalFileInBackup = await fs.stat(backupPath);
            if (fileStat.size < originalFileInBackup.size) {
                 console.log(`Skipping ${file}, as it appears to be an already optimized webp.`);
                 continue;
            }
        }
        
        const newFileName = `${path.parse(file).name}.webp`;
        const outputPath = path.join(imagesDir, newFileName);

        await image
          .resize({
            width: metadata.width && metadata.width > MAX_WIDTH ? MAX_WIDTH : undefined,
            withoutEnlargement: true,
          })
          .webp({ quality: QUALITY })
          .toFile(outputPath);
          
        console.log(`Successfully optimized and saved ${newFileName}`);

        // 5. Remove original if it wasn't already a .webp file
        if (path.extname(file).toLowerCase() !== '.webp') {
          await fs.unlink(sourcePath);
          console.log(`Removed original file: ${file}`);
        }
      } catch (error) {
        console.error(`\n--- FAILED to process ${file}. Skipping. ---\nError: ${error.message}\n`);
        continue; // Move to the next file
      }
    }

    console.log("\nImage optimization complete!");
    console.log(`Find original files in: ${backupDir}`);

  } catch (error) {
    console.error("A critical error occurred during image optimization:", error);
  }
}

optimizeImages(); 