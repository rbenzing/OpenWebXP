# Windows XP Icon Conversion Priority List

## High Priority Icons (Essential for Start Menu)

These icons are used in the Start Menu and should be converted first:

### Start Menu Programs
1. **Internet Explorer 6.psd** → Internet Explorer 6.png
2. **Outlook Express.psd** → Outlook Express.png
3. **Windows Media Player 9.psd** → Windows Media Player 9.png
4. **Windows Messenger.psd** → Windows Messenger.png
5. **Notepad.psd** → Notepad.png
6. **Calculator.psd** → Calculator.png
7. **Paint.psd** → Paint.png
8. **Command Prompt.psd** → Command Prompt.png

### Start Menu Right Side
9. **My Documents.psd** → My Documents.png
10. **My Pictures.psd** → My Pictures.png
11. **My Music.psd** → My Music.png
12. **My Computer.psd** → My Computer.png
13. **Control Panel.psd** → Control Panel.png
14. **Help and Support.psd** → Help and Support.png
15. **Search.psd** → Search.png
16. **Run.psd** → Run.png

### System Icons
17. **Recent Documents.psd** → Recent Documents.png
18. **Logout.psd** → Logout.png
19. **Power.psd** → Power.png

### Desktop Icons
20. **Recycle Bin (empty).psd** → Recycle Bin (empty).png
21. **Recycle Bin (full).psd** → Recycle Bin (full).png

## Medium Priority Icons (Common Applications)

### File Types
- **Generic Document.psd**
- **Generic Text Document.psd**
- **Folder Closed.psd**
- **Folder Opened.psd**

### System Tools
- **Task Manager.psd**
- **System Properties.psd**
- **Display Properties.psd**
- **Network Connections.psd**

## Low Priority Icons (Advanced Features)

### Administrative Tools
- **Computer Management.psd**
- **Event Viewer.psd**
- **Services.psd**
- **Registry Editor.psd**

### Media and Games
- **Solitaire.psd**
- **Minesweeper.psd**
- **Freecell.psd**
- **Hearts.psd**

## Conversion Instructions

### Option 1: Online Converters (Recommended)
1. Go to [Convertio](https://convertio.co/psd-png/) or [Zamzar](https://www.zamzar.com/convert/psd-to-png/)
2. Upload the PSD file
3. Convert to PNG format
4. Download the result
5. Save to `public/assets/icons/png/` folder

### Option 2: Adobe Photoshop
1. Open the PSD file in Photoshop
2. Go to File → Export → Export As
3. Choose PNG format
4. Set size to 32x32 pixels (or maintain original size)
5. Save to `public/assets/icons/png/` folder

### Option 3: GIMP (Free Alternative)
1. Open the PSD file in GIMP
2. Go to File → Export As
3. Choose PNG format
4. Save to `public/assets/icons/png/` folder

### Option 4: ImageMagick (Command Line)
If you have ImageMagick installed:
```bash
magick "Icon Name.psd[0]" -flatten -resize 32x32 -background transparent "Icon Name.png"
```

## File Naming Convention

- Keep the exact same filename as the PSD but change extension to .png
- Maintain spaces and capitalization exactly as in the original
- Example: "My Documents.psd" → "My Documents.png"

## Current Status

✅ **Fallback SVG icons** are already implemented for all essential icons
⏳ **PSD conversion** needed for authentic Windows XP appearance
🎯 **Priority**: Convert the High Priority icons first for immediate visual improvement

## Notes

- The application currently uses fallback SVG icons that look similar to Windows XP
- Converting the actual PSD icons will provide the most authentic appearance
- Icons should be 20x20 pixels for Start Menu items and 32x32 for desktop icons
- All icons support transparency (PNG format recommended)
