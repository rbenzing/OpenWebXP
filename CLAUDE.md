## Core Principles

- Always write code to mimic the functionality like it did in windows XP
- Always remember the design should match 1:1 with Windows XP original
- Always think step by step for errors and warnings
- Always consider existing code over writing new code
- Always consider design to be top priority and matching the Windows XP theme
- Always refactor UI components if they are over 400 lines of code or more so they are easier to maintain and keep the existing functionality
- Always write code with best practices for Node JS 20.x+ and React 18.3.x
- Always run syntax checks on the code you write

## Icon Management Protocol

### Before Adding Icons to Code
1. **Verify icon exists first**: Search `public/assets/icons/png/` for the actual filename
   ```bash
   ls public/assets/icons/png/ | grep -i "icon-name"
   ```
2. **Use exact filename**: Icon names are case-sensitive and must match exactly (e.g., "My Computer.png" not "My computer.png")
3. **Prefer existing icons**: We have 540 PNG icons - always check for suitable existing icons before using SVG fallbacks
4. **Use Generic fallbacks**: For missing file type icons, use:
   - Documents: `Generic Document.png`
   - Audio: `Generic Audio.png`
   - Video: `Generic Video.png`
   - Text: `Generic Text Document.png`

### After Making Icon Changes
1. **Run validation script**: Always validate icon paths before committing
   ```bash
   node scripts/validate-icons.js
   ```
2. **Fix mismatches systematically**: If validation finds missing references, update `scripts/icon-fixes.json` and run:
   ```bash
   node scripts/fix-icons.js
   ```
3. **Test in browser**: Clear cache and verify icons display (not white squares)

## Build Process

### Development
- Use `npm start` for development server
- Parcel v1 serves files directly from `public/` directory

### Production
- Always use `npm run build:clean` for clean production builds
- Static assets (icons, backgrounds) are automatically copied to `dist/assets/`
- Never manually edit files in `dist/` - they're auto-generated

### Troubleshooting Builds
- **"parcelRequire is not defined"**: Clear cache with `rm -rf .parcel-cache dist`
- **Icons not displaying**: Ensure `scripts/copy-assets.js` ran successfully
- **Stale cache issues**: Use `npm run build:clean` instead of `npm run build`

## Systematic Problem Solving

When encountering repetitive issues across multiple files:
1. **Create validation scripts** to detect issues systematically (e.g., `validate-icons.js`)
2. **Create fix mappings** in JSON for maintainability (e.g., `icon-fixes.json`)
3. **Create automation scripts** to apply fixes in bulk (e.g., `fix-icons.js`)
4. **Document the process** for future reference

Example workflow:
```bash
# 1. Find all issues
node scripts/validate-icons.js

# 2. Map corrections
# Edit scripts/icon-fixes.json

# 3. Apply fixes automatically
node scripts/fix-icons.js

# 4. Verify
node scripts/validate-icons.js
```

## Testing Protocol

### Before Committing
1. Run validation scripts (icon validation, etc.)
2. Clear cache and rebuild: `npm run build:clean`
3. Test in browser - verify icons, dialogs, windows all display correctly
4. Check browser console for errors

### Icon-Specific Testing
- Desktop icons should display (not white squares)
- File Explorer icons should match file types correctly
- System tray icons should be visible
- Dialog icons (Run, Shutdown, etc.) should display
- Toolbar icons should render properly

## File Organization

### Scripts Directory (`scripts/`)
- `validate-icons.js` - Validates all icon paths against available PNG files
- `fix-icons.js` - Automatically fixes icon path mismatches
- `icon-fixes.json` - Mapping of incorrect → correct icon names
- `copy-assets.js` - Copies static assets to dist for production builds

### Icon Constants
- Keep icon path mappings in `src/constants/iconMapping.js`
- Use constants instead of hardcoded paths where possible
- This makes bulk updates easier