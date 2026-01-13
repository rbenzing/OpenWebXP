/**
 * Icon Validation Script
 * Systematically checks all icon references in the codebase against actual files
 */

const fs = require('fs');
const path = require('path');

// Directory containing PNG icons
const ICONS_DIR = path.join(__dirname, '../public/assets/icons/png');

// Get all available icon files
function getAllIconFiles() {
  try {
    const files = fs.readdirSync(ICONS_DIR);
    return files.filter(f => f.endsWith('.png'));
  } catch (error) {
    console.error('Error reading icons directory:', error.message);
    return [];
  }
}

// Extract icon paths from source files
function extractIconPathsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const iconPaths = [];

  // Match patterns like: '/assets/icons/png/Icon Name.png'
  const regex = /['"]\/assets\/icons\/png\/([^'"]+\.png)['"]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    iconPaths.push({
      fullPath: match[0],
      filename: match[1],
      line: content.substring(0, match.index).split('\n').length
    });
  }

  return iconPaths;
}

// Scan all source files for icon references
function scanSourceFiles() {
  const srcDir = path.join(__dirname, '../src');
  const sourceFiles = [];

  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
        sourceFiles.push(fullPath);
      }
    });
  }

  walkDir(srcDir);
  return sourceFiles;
}

// Main validation
function validateIcons() {
  console.log('🔍 Starting Icon Validation...\n');

  const availableIcons = getAllIconFiles();
  console.log(`✅ Found ${availableIcons.length} PNG icons in ${ICONS_DIR}\n`);

  const sourceFiles = scanSourceFiles();
  console.log(`📁 Scanning ${sourceFiles.length} source files...\n`);

  let totalReferences = 0;
  let missingIcons = [];
  let foundIcons = [];

  sourceFiles.forEach(filePath => {
    const iconPaths = extractIconPathsFromFile(filePath);

    iconPaths.forEach(({fullPath, filename, line}) => {
      totalReferences++;
      const relativeFile = path.relative(path.join(__dirname, '..'), filePath);

      if (availableIcons.includes(filename)) {
        foundIcons.push({file: relativeFile, icon: filename, line});
      } else {
        missingIcons.push({file: relativeFile, icon: filename, line, fullPath});
      }
    });
  });

  console.log(`📊 Results:`);
  console.log(`   Total icon references: ${totalReferences}`);
  console.log(`   ✅ Valid references: ${foundIcons.length}`);
  console.log(`   ❌ Missing references: ${missingIcons.length}\n`);

  if (missingIcons.length > 0) {
    console.log(`❌ MISSING ICONS (${missingIcons.length}):\n`);
    missingIcons.forEach(({file, icon, line, fullPath}) => {
      console.log(`   ${file}:${line}`);
      console.log(`      Referenced: ${icon}`);

      // Try to find similar names
      const similar = availableIcons.filter(f =>
        f.toLowerCase().includes(icon.toLowerCase().split('.')[0].substring(0, 5))
      );
      if (similar.length > 0) {
        console.log(`      Similar files: ${similar.slice(0, 3).join(', ')}`);
      }
      console.log('');
    });
  }

  // List unused icons
  const usedIconNames = [...foundIcons, ...missingIcons].map(i => i.icon);
  const unusedIcons = availableIcons.filter(icon => !usedIconNames.includes(icon));

  console.log(`\n📦 UNUSED ICONS (${unusedIcons.length} of ${availableIcons.length}):\n`);
  if (unusedIcons.length <= 20) {
    unusedIcons.forEach(icon => console.log(`   - ${icon}`));
  } else {
    unusedIcons.slice(0, 20).forEach(icon => console.log(`   - ${icon}`));
    console.log(`   ... and ${unusedIcons.length - 20} more`);
  }

  console.log(`\n✅ Validation complete!`);
  return { totalReferences, foundIcons, missingIcons, unusedIcons };
}

// Run validation
try {
  validateIcons();
} catch (error) {
  console.error('❌ Error during validation:', error);
  process.exit(1);
}
