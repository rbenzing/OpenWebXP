# Scripts Documentation

This directory contains automation scripts for maintaining code quality and fixing common issues in the OpenXP project.

## Icon Management Scripts

### validate-icons.js

**Purpose**: Validates all icon path references in source code against available PNG files.

**Usage**:
```bash
node scripts/validate-icons.js
```

**What it does**:
1. Scans all `.js` and `.jsx` files in `src/` directory
2. Extracts icon path references (e.g., `/assets/icons/png/Icon.png`)
3. Cross-references against 540 available PNG files in `public/assets/icons/png/`
4. Reports:
   - Total icon references found
   - Valid references (icon file exists)
   - Missing references (icon file doesn't exist)
   - Suggests similar filenames for missing icons
   - Lists unused icons

**Example Output**:
```
🔍 Starting Icon Validation...

✅ Found 540 PNG icons in public/assets/icons/png

📁 Scanning 22 source files...

📊 Results:
   Total icon references: 182
   ✅ Valid references: 182
   ❌ Missing references: 0

✅ Validation complete!
```

**When to run**:
- Before committing changes that add/modify icon paths
- After adding new components with icons
- When troubleshooting white square icons in browser

---

### icon-fixes.json

**Purpose**: Mapping configuration for automatic icon path corrections.

**Structure**:
```json
{
  "fixes": {
    "Wrong Name.png": "Correct Name.png",
    "Another Wrong.png": "Generic Document.png"
  }
}
```

**Common Mappings**:
- `"Word Document.png"` → `"Generic Document.png"`
- `"Hard Drive.png"` → `"Local Disk.png"`
- `"MP3.png"` → `"Generic Audio.png"`
- `"Video File.png"` → `"Generic Video.png"`

**When to edit**:
- After `validate-icons.js` reports missing references
- When standardizing icon names across the codebase
- When consolidating duplicate icon references

---

### fix-icons.js

**Purpose**: Automatically applies icon path corrections from `icon-fixes.json` to all source files.

**Usage**:
```bash
node scripts/fix-icons.js
```

**What it does**:
1. Loads mapping from `icon-fixes.json`
2. Scans all source files in `src/`
3. Replaces incorrect icon paths with correct ones using regex
4. Reports changes made per file
5. Writes corrected files back to disk

**Example Output**:
```
🔧 Starting Automatic Icon Path Fixes...

📋 Loaded 32 icon name mappings

   ✓ Fixed 1x: Word Document.png → Generic Document.png

📝 src\components\FileExplorer.js
   Made 16 change(s)

✅ Fix Complete!
   Files modified: 5
   Total changes: 53
```

**Safety**:
- Creates backups? No - commit your code before running
- Idempotent? Yes - safe to run multiple times
- Reversible? Via git if needed

**When to run**:
- After updating `icon-fixes.json` with new mappings
- When bulk-fixing icon path issues reported by validation
- After discovering systematic icon naming issues

---

## Build Scripts

### copy-assets.js

**Purpose**: Copies static assets from `public/assets/` to `dist/assets/` for production builds.

**Usage**:
Automatically runs as part of `npm run build`:
```bash
npm run build
# Executes: parcel build public/index.html && node scripts/copy-assets.js
```

**Why needed**:
Parcel v1 (parcel-bundler) does NOT automatically copy static assets referenced as strings in code. Icon paths like `/assets/icons/png/Icon.png` aren't detected as dependencies to bundle.

**What it does**:
1. Recursively copies all files from `public/assets/` to `dist/assets/`
2. Preserves directory structure
3. Counts total files copied
4. Reports success or errors

**Example Output**:
```
📁 Copying static assets to dist...
✅ Successfully copied 1133 asset files to dist/assets/
```

**Integration**:
- Runs automatically after every `npm run build`
- Part of `npm run build:clean` workflow

---

## Workflow Examples

### Scenario 1: Adding New Icons to Code

```bash
# 1. Verify icon exists
ls public/assets/icons/png/ | grep -i "calculator"

# 2. Add icon path to code
icon: '/assets/icons/png/Calculator.png'

# 3. Validate before committing
node scripts/validate-icons.js

# 4. Test in browser
npm start
```

### Scenario 2: Fixing Missing Icon References

```bash
# 1. Run validation to find issues
node scripts/validate-icons.js
# Output: ❌ Missing: "Hard Drive.png"
#         Similar files: Local Disk.png

# 2. Add mapping to icon-fixes.json
{
  "fixes": {
    "Hard Drive.png": "Local Disk.png"
  }
}

# 3. Apply fixes automatically
node scripts/fix-icons.js

# 4. Verify fixes
node scripts/validate-icons.js
# Output: ✅ Valid references: 182, ❌ Missing: 0

# 5. Test in browser
npm run build:clean
npm start
```

### Scenario 3: Production Build Issues

```bash
# Symptom: Icons not displaying in production build
# Cause: Assets not copied to dist

# Solution:
npm run build:clean

# Verify dist has assets
ls dist/assets/icons/png/ | head -10
# Should show PNG files
```

---

## Maintenance

### Adding New Validation Rules

To add validation for other asset types (CSS, backgrounds, etc.), follow the `validate-icons.js` pattern:

1. Create new script (e.g., `validate-backgrounds.js`)
2. Use regex to extract paths from source files
3. Cross-reference against available files in `public/assets/`
4. Report mismatches with file locations and line numbers

### Updating Icon Fixes

When new icon naming issues are discovered:

1. Run `validate-icons.js` to identify issues
2. Search for correct icon name:
   ```bash
   ls public/assets/icons/png/ | grep -i "search-term"
   ```
3. Add mapping to `icon-fixes.json`
4. Run `fix-icons.js` to apply
5. Re-validate with `validate-icons.js`

---

## Troubleshooting

### "Cannot find module './icon-fixes.json'"
- Ensure you're running from project root: `cd c:/GIT/OpenXP`
- Check file exists: `ls scripts/icon-fixes.json`

### "No changes made" but validation shows missing icons
- Check `icon-fixes.json` syntax (valid JSON)
- Verify mapping keys match exact filenames (case-sensitive)
- Ensure source files use the wrong name being mapped

### Scripts fail with "ENOENT" errors
- Run from project root directory
- Check `public/assets/icons/png/` exists
- Verify `src/` directory structure intact

---

## Future Enhancements

Potential improvements to consider:

1. **Backup System**: Auto-create backups before running `fix-icons.js`
2. **Dry Run Mode**: Preview changes without writing files
3. **Icon Usage Report**: Generate report showing most/least used icons
4. **Auto-Fix Suggestions**: Automatically populate `icon-fixes.json` based on similarity matching
5. **Pre-commit Hook**: Automatically run validation before git commits
6. **CI/CD Integration**: Add validation to GitHub Actions workflow

---

## Credits

These scripts were developed to solve the systematic icon path mismatch issue discovered during development. They demonstrate the principle of creating automated solutions for repetitive manual tasks.

**Last Updated**: 2026-01-13
