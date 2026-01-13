/**
 * Automatic Icon Path Fixer
 * Applies systematic icon path corrections across all source files
 */

const fs = require('fs');
const path = require('path');

// Load the fixes mapping
const fixes = require('./icon-fixes.json').fixes;

// Scan and fix source files
function fixSourceFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = 0;

  Object.entries(fixes).forEach(([wrongName, correctName]) => {
    const searchPattern = `/assets/icons/png/${wrongName}`;
    const replacement = `/assets/icons/png/${correctName}`;

    const regex = new RegExp(searchPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);

    if (matches) {
      content = content.replace(regex, replacement);
      changesMade += matches.length;
      console.log(`   ✓ Fixed ${matches.length}x: ${wrongName} → ${correctName}`);
    }
  });

  if (changesMade > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    return changesMade;
  }

  return 0;
}

// Walk through source files
function walkAndFix(dir) {
  const files = fs.readdirSync(dir);
  let totalChanges = 0;
  let filesModified = 0;

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const result = walkAndFix(fullPath);
      totalChanges += result.totalChanges;
      filesModified += result.filesModified;
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const relPath = path.relative(path.join(__dirname, '..'), fullPath);
      const changes = fixSourceFile(fullPath);

      if (changes > 0) {
        console.log(`\n📝 ${relPath}`);
        console.log(`   Made ${changes} change(s)`);
        totalChanges += changes;
        filesModified++;
      }
    }
  });

  return { totalChanges, filesModified };
}

// Main execution
console.log('🔧 Starting Automatic Icon Path Fixes...\n');
console.log(`📋 Loaded ${Object.keys(fixes).length} icon name mappings\n`);

const srcDir = path.join(__dirname, '../src');
const { totalChanges, filesModified } = walkAndFix(srcDir);

console.log(`\n✅ Fix Complete!`);
console.log(`   Files modified: ${filesModified}`);
console.log(`   Total changes: ${totalChanges}`);
console.log(`\n💡 Run 'node scripts/validate-icons.js' to verify all fixes\n`);
