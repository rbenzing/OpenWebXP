import React, { useState } from 'react';

const FileExplorer = ({ initialPath = 'My Computer' }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [viewMode, setViewMode] = useState('icons'); // 'icons', 'list', 'details'
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock file system data
  const fileSystem = {
    'My Computer': {
      type: 'folder',
      items: [
        { name: 'Local Disk (C:)', type: 'drive', icon: '/assets/icons/drive-c.png', size: '74.5 GB' },
        { name: 'DVD Drive (D:)', type: 'drive', icon: '/assets/icons/drive-dvd.png', size: '' },
        { name: 'Floppy (A:)', type: 'drive', icon: '/assets/icons/drive-floppy.png', size: '1.44 MB' },
        { name: 'Control Panel', type: 'folder', icon: '/assets/icons/control-panel.png' },
        { name: 'Shared Documents', type: 'folder', icon: '/assets/icons/shared-docs.png' }
      ]
    },
    'Local Disk (C:)': {
      type: 'folder',
      items: [
        { name: 'Documents and Settings', type: 'folder', icon: '/assets/icons/folder.png' },
        { name: 'Program Files', type: 'folder', icon: '/assets/icons/folder.png' },
        { name: 'WINDOWS', type: 'folder', icon: '/assets/icons/folder.png' },
        { name: 'autoexec.bat', type: 'file', icon: '/assets/icons/file-bat.png', size: '0 KB' },
        { name: 'config.sys', type: 'file', icon: '/assets/icons/file-sys.png', size: '0 KB' }
      ]
    },
    'My Documents': {
      type: 'folder',
      items: [
        { name: 'My Pictures', type: 'folder', icon: '/assets/icons/my-pictures.png' },
        { name: 'My Music', type: 'folder', icon: '/assets/icons/my-music.png' },
        { name: 'My Videos', type: 'folder', icon: '/assets/icons/my-videos.png' },
        { name: 'Resume.doc', type: 'file', icon: '/assets/icons/file-doc.png', size: '45 KB' },
        { name: 'Budget.xls', type: 'file', icon: '/assets/icons/file-xls.png', size: '23 KB' },
        { name: 'Notes.txt', type: 'file', icon: '/assets/icons/file-txt.png', size: '2 KB' }
      ]
    }
  };

  const getCurrentItems = () => {
    return fileSystem[currentPath]?.items || [];
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder' || item.type === 'drive') {
      if (fileSystem[item.name]) {
        setCurrentPath(item.name);
      }
    }
  };

  const handleBack = () => {
    if (currentPath !== 'My Computer') {
      setCurrentPath('My Computer');
    }
  };

  const handleItemClick = (item, index) => {
    setSelectedItems([index]);
  };

  const getPathBreadcrumb = () => {
    const parts = currentPath.split(' > ');
    return parts.map((part, index) => (
      <span key={index}>
        {index > 0 && ' > '}
        <span 
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => {
            if (index === 0) setCurrentPath('My Computer');
          }}
        >
          {part}
        </span>
      </span>
    ));
  };

  return (
    <div className="file-explorer">
      <div className="explorer-toolbar">
        <button 
          className="toolbar-button" 
          onClick={handleBack}
          disabled={currentPath === 'My Computer'}
        >
          ← Back
        </button>
        <button className="toolbar-button">↑ Up</button>
        <div className="address-bar">
          <span>Address: </span>
          <input 
            type="text" 
            value={currentPath} 
            readOnly 
            style={{ 
              flex: 1, 
              padding: '2px 4px', 
              border: '1px inset #d4d0c8',
              background: 'white'
            }}
          />
        </div>
      </div>
      
      <div className="explorer-content">
        <div className="explorer-sidebar">
          <div className="sidebar-section">
            <div className="sidebar-title">Other Places</div>
            <div className="sidebar-item" onClick={() => setCurrentPath('My Documents')}>
              📁 My Documents
            </div>
            <div className="sidebar-item" onClick={() => setCurrentPath('My Computer')}>
              💻 My Computer
            </div>
            <div className="sidebar-item">
              🌐 My Network Places
            </div>
          </div>
        </div>
        
        <div className="explorer-main">
          <div className="explorer-status">
            {getCurrentItems().length} object(s)
          </div>
          
          <div className={`explorer-items view-${viewMode}`}>
            {getCurrentItems().map((item, index) => (
              <div 
                key={index}
                className={`explorer-item ${selectedItems.includes(index) ? 'selected' : ''}`}
                onClick={() => handleItemClick(item, index)}
                onDoubleClick={() => handleItemDoubleClick(item)}
              >
                <img 
                  src={item.icon} 
                  alt={item.name}
                  style={{ width: '32px', height: '32px' }}
                  onError={(e) => {
                    e.target.src = '/assets/icons/generic-file.png';
                  }}
                />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  {item.size && <div className="item-size">{item.size}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
