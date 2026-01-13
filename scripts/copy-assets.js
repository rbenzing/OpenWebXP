/**
 * Copy Assets Script
 * Copies static assets to the dist directory for Parcel builds
 */

const fs = require('fs');
const path = require('path');

// Source and destination directories
const sourceDir = path.join(__dirname, '../public/assets');
const distDir = path.join(__dirname, '../dist/assets');

// Recursive copy function
function copyRecursive(src, dest) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      copyRecursive(srcPath, destPath);
    } else {
      // Copy file
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Main execution
console.log('📁 Copying static assets to dist...');

try {
  copyRecursive(sourceDir, distDir);

  // Count copied files
  let fileCount = 0;
  function countFiles(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        countFiles(path.join(dir, entry.name));
      } else {
        fileCount++;
      }
    }
  }
  countFiles(distDir);

  console.log(`✅ Successfully copied ${fileCount} asset files to dist/assets/`);
} catch (error) {
  console.error('❌ Error copying assets:', error.message);
  process.exit(1);
}
