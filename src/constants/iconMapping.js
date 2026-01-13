// Comprehensive Windows XP Icon Mapping
// Maps file extensions, folder types, system elements to authentic XP PNG icons

export const FILE_TYPE_ICONS = {
  // Documents
  '.txt': '/assets/icons/png/TXT.png',
  '.doc': '/assets/icons/png/Generic Document.png',
  '.docx': '/assets/icons/png/Generic Document.png',
  '.xls': '/assets/icons/png/Generic Document.png',
  '.xlsx': '/assets/icons/png/Generic Document.png',
  '.ppt': '/assets/icons/png/Generic Document.png',
  '.pptx': '/assets/icons/png/Generic Document.png',
  '.pdf': '/assets/icons/png/Generic Document.png',
  '.rtf': '/assets/icons/png/RTF.png',

  // Images
  '.jpg': '/assets/icons/png/JPG.png',
  '.jpeg': '/assets/icons/png/JPG.png',
  '.png': '/assets/icons/png/Generic Document.png',
  '.gif': '/assets/icons/png/GIF.png',
  '.bmp': '/assets/icons/png/Bitmap.png',
  '.ico': '/assets/icons/png/Icon View.png',
  '.tif': '/assets/icons/png/Generic Document.png',
  '.tiff': '/assets/icons/png/Generic Document.png',

  // Audio
  '.mp3': '/assets/icons/png/Generic Audio.png',
  '.wav': '/assets/icons/png/Audio CD.png',
  '.wma': '/assets/icons/png/Generic Audio.png',
  '.mid': '/assets/icons/png/Generic Audio.png',
  '.midi': '/assets/icons/png/Generic Audio.png',

  // Video
  '.avi': '/assets/icons/png/Generic Video.png',
  '.mpg': '/assets/icons/png/Generic Video.png',
  '.mpeg': '/assets/icons/png/Generic Video.png',
  '.wmv': '/assets/icons/png/WMV.png',
  '.mov': '/assets/icons/png/Generic Video.png',

  // Archives
  '.zip': '/assets/icons/png/Zip folder.png',
  '.rar': '/assets/icons/png/Zip folder.png',
  '.cab': '/assets/icons/png/CAB.png',
  '.gz': '/assets/icons/png/Zip folder.png',
  '.tar': '/assets/icons/png/Zip folder.png',

  // Executables & System
  '.exe': '/assets/icons/png/Application Window.png',
  '.dll': '/assets/icons/png/DLL.png',
  '.sys': '/assets/icons/png/System Properties.png',
  '.bat': '/assets/icons/png/BAT.png',
  '.cmd': '/assets/icons/png/BAT.png',
  '.ini': '/assets/icons/png/INF.png',
  '.reg': '/assets/icons/png/Registry Document.png',
  '.log': '/assets/icons/png/Generic Text Document.png',

  // Web
  '.htm': '/assets/icons/png/HTML.png',
  '.html': '/assets/icons/png/HTML.png',
  '.xml': '/assets/icons/png/XML.png',
  '.css': '/assets/icons/png/CSS.png',
  '.js': '/assets/icons/png/Java Script.png',

  // Default fallback
  'default': '/assets/icons/png/Generic Document.png'
};

export const FOLDER_ICONS = {
  'My Documents': '/assets/icons/png/My Documents.png',
  'My Pictures': '/assets/icons/png/My Pictures.png',
  'My Music': '/assets/icons/png/My Music.png',
  'My Videos': '/assets/icons/png/My Videos.png',
  'Program Files': '/assets/icons/png/Folder Closed.png',
  'WINDOWS': '/assets/icons/png/Folder Closed.png',
  'Desktop': '/assets/icons/png/Desktop.png',
  'Shared': '/assets/icons/png/Shared Folder.png',
  'Network': '/assets/icons/png/Network Folder.png',
  'default': '/assets/icons/png/Folder Closed.png'
};

export const DRIVE_ICONS = {
  'C:': '/assets/icons/png/Local Disk.png',
  'D:': '/assets/icons/png/CD-ROM.png',
  'A:': '/assets/icons/png/Floppy Disk.png',
  'Network': '/assets/icons/png/Network Drive.png',
  'DVD': '/assets/icons/png/DVD-ROM.png',
  'CD': '/assets/icons/png/CD-ROM.png'
};

export const SYSTEM_ICONS = {
  'control-panel': '/assets/icons/png/Control Panel.png',
  'display': '/assets/icons/png/Display Properties.png',
  'network': '/assets/icons/png/Network Connections.png',
  'printers': '/assets/icons/png/Printer.png',
  'security': '/assets/icons/png/Security Center.png',
  'accessibility': '/assets/icons/png/Accessibility.png',
  'add-hardware': '/assets/icons/png/Add New Hardware.png',
  'add-programs': '/assets/icons/png/Add New Programs.png',
  'date-time': '/assets/icons/png/Date and Time.png',
  'device-manager': '/assets/icons/png/Audio Devices.png',
  'disk-cleanup': '/assets/icons/png/Disk Cleanup.png',
  'disk-defragment': '/assets/icons/png/Disk Defragmenter.png',
  'firewall': '/assets/icons/png/Internet Connection Firewall.png',
  'fonts': '/assets/icons/png/Fonts.png',
  'help': '/assets/icons/png/Help and Support.png',
  'keyboard': '/assets/icons/png/Keyboard.png',
  'mouse': '/assets/icons/png/Mouse.png',
  'performance': '/assets/icons/png/Performance.png',
  'power': '/assets/icons/png/Power.png',
  'regional': '/assets/icons/png/Date and Region.png',
  'scanners': '/assets/icons/png/Scanners and Cameras.png',
  'scheduled-tasks': '/assets/icons/png/Scheduled Tasks.png',
  'sounds': '/assets/icons/png/Audio Devices.png',
  'system': '/assets/icons/png/System Properties.png',
  'taskbar': '/assets/icons/png/Taskbar and Start Menu.png',
  'user-accounts': '/assets/icons/png/User Accounts.png',
  'windows-update': '/assets/icons/png/Windows Update.png'
};

// Helper function to get icon for file extension
export const getFileIcon = (filename) => {
  if (!filename) return FILE_TYPE_ICONS.default;

  const ext = filename.lastIndexOf('.') !== -1
    ? filename.slice(filename.lastIndexOf('.')).toLowerCase()
    : '';

  return FILE_TYPE_ICONS[ext] || FILE_TYPE_ICONS.default;
};

// Helper function to get icon for folder
export const getFolderIcon = (folderName) => {
  return FOLDER_ICONS[folderName] || FOLDER_ICONS.default;
};

// Helper function to get icon for drive
export const getDriveIcon = (driveLetter) => {
  return DRIVE_ICONS[driveLetter] || DRIVE_ICONS['C:'];
};

// Helper function to get system icon
export const getSystemIcon = (systemItem) => {
  return SYSTEM_ICONS[systemItem] || SYSTEM_ICONS['control-panel'];
};

export default {
  FILE_TYPE_ICONS,
  FOLDER_ICONS,
  DRIVE_ICONS,
  SYSTEM_ICONS,
  getFileIcon,
  getFolderIcon,
  getDriveIcon,
  getSystemIcon
};
