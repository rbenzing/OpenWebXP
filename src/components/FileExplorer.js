import React, { useState } from 'react';

const FileExplorer = ({ initialPath = 'My Computer' }) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [viewMode, setViewMode] = useState('icons'); // 'icons', 'list', 'details'
  const [selectedItems, setSelectedItems] = useState([]);
  const [collapsedSections, setCollapsedSections] = useState({
    tasks: false,
    places: false,
    details: false
  });

  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Mock file system data
  const fileSystem = {
    'My Computer': {
      type: 'folder',
      items: [
        { name: 'Local Disk (C:)', type: 'drive', icon: '/assets/icons/png/Local Disk.png', size: '74.5 GB' },
        { name: 'DVD Drive (D:)', type: 'drive', icon: '/assets/icons/png/DVD.png', size: '' },
        { name: 'Floppy (A:)', type: 'drive', icon: '/assets/icons/png/Floppy Disk.png', size: '1.44 MB' },
        { name: 'Control Panel', type: 'folder', icon: '/assets/icons/png/Control Panel.png' },
        { name: 'Shared Documents', type: 'folder', icon: '/assets/icons/png/Shared Folder.png' }
      ]
    },
    'Local Disk (C:)': {
      type: 'folder',
      items: [
        { name: 'Documents and Settings', type: 'folder', icon: '/assets/icons/png/Folder Closed.png' },
        { name: 'Program Files', type: 'folder', icon: '/assets/icons/png/Folder Closed.png' },
        { name: 'WINDOWS', type: 'folder', icon: '/assets/icons/png/Folder Closed.png' },
        { name: 'autoexec.bat', type: 'file', icon: '/assets/icons/png/BAT.png', size: '0 KB' },
        { name: 'config.sys', type: 'file', icon: '/assets/icons/png/System Properties.png', size: '0 KB' }
      ]
    },
    'My Documents': {
      type: 'folder',
      items: [
        { name: 'My Pictures', type: 'folder', icon: '/assets/icons/png/My Pictures.png' },
        { name: 'My Music', type: 'folder', icon: '/assets/icons/png/My Music.png' },
        { name: 'My Videos', type: 'folder', icon: '/assets/icons/png/My Videos.png' },
        { name: 'Resume.doc', type: 'file', icon: '/assets/icons/png/Generic Document.png', size: '45 KB' },
        { name: 'Budget.xls', type: 'file', icon: '/assets/icons/png/Generic Document.png', size: '23 KB' },
        { name: 'Presentation.ppt', type: 'file', icon: '/assets/icons/png/Generic Document.png', size: '1.2 MB' },
        { name: 'Report.pdf', type: 'file', icon: '/assets/icons/png/Generic Document.png', size: '342 KB' },
        { name: 'Notes.txt', type: 'file', icon: '/assets/icons/png/TXT.png', size: '2 KB' },
        { name: 'Letter.rtf', type: 'file', icon: '/assets/icons/png/RTF.png', size: '8 KB' },
        { name: 'Photo.jpg', type: 'file', icon: '/assets/icons/png/JPG.png', size: '1.5 MB' },
        { name: 'Logo.png', type: 'file', icon: '/assets/icons/png/Generic Document.png', size: '256 KB' },
        { name: 'Animation.gif', type: 'file', icon: '/assets/icons/png/GIF.png', size: '89 KB' },
        { name: 'Icon.ico', type: 'file', icon: '/assets/icons/png/Icon View.png', size: '4 KB' },
        { name: 'Song.mp3', type: 'file', icon: '/assets/icons/png/Generic Audio.png', size: '4.2 MB' },
        { name: 'Audio.wav', type: 'file', icon: '/assets/icons/png/Audio CD.png', size: '12 MB' },
        { name: 'Video.avi', type: 'file', icon: '/assets/icons/png/Generic Video.png', size: '25 MB' },
        { name: 'Movie.wmv', type: 'file', icon: '/assets/icons/png/WMV.png', size: '18 MB' },
        { name: 'Archive.zip', type: 'file', icon: '/assets/icons/png/Zip folder.png', size: '5.6 MB' },
        { name: 'Backup.rar', type: 'file', icon: '/assets/icons/png/Zip folder.png', size: '12 MB' },
        { name: 'Index.html', type: 'file', icon: '/assets/icons/png/HTML.png', size: '12 KB' },
        { name: 'Styles.css', type: 'file', icon: '/assets/icons/png/CSS.png', size: '8 KB' },
        { name: 'Script.js', type: 'file', icon: '/assets/icons/png/Java Script.png', size: '15 KB' },
        { name: 'Data.xml', type: 'file', icon: '/assets/icons/png/XML.png', size: '6 KB' },
        { name: 'Setup.exe', type: 'file', icon: '/assets/icons/png/Application Window.png', size: '2.4 MB' },
        { name: 'System.dll', type: 'file', icon: '/assets/icons/png/DLL.png', size: '128 KB' },
        { name: 'Config.ini', type: 'file', icon: '/assets/icons/png/INF.png', size: '1 KB' },
        { name: 'Registry.reg', type: 'file', icon: '/assets/icons/png/Registry Document.png', size: '2 KB' }
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
          <img src="/assets/icons/png/Whistler - Back.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
          Back
        </button>
        <button className="toolbar-button">
          <img src="/assets/icons/png/Whistler - Forward.png" alt="" style={{width: '16px', height: '16px', verticalAlign: 'middle'}} />
        </button>
        <button className="toolbar-button">
          <img src="/assets/icons/png/Whistler - Up.png" alt="" style={{width: '16px', height: '16px', verticalAlign: 'middle'}} />
        </button>
        <button className="toolbar-button">
          <img src="/assets/icons/png/Search.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
          Search
        </button>
        <button className="toolbar-button">
          <img src="/assets/icons/png/Folder Closed.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
          Folders
        </button>
        <div className="address-bar">
          <span>Address</span>
          <input
            type="text"
            value={currentPath}
            readOnly
            style={{
              flex: 1,
              padding: '2px 4px',
              marginLeft: '4px'
            }}
          />
          <button className="toolbar-button">Go</button>
        </div>
      </div>

      <div className="explorer-content">
        <div className="explorer-sidebar">
          {/* File and Folder Tasks */}
          <div className="sidebar-panel">
            <div className="sidebar-panel-header" onClick={() => toggleSection('tasks')}>
              <span className="collapse-arrow">{collapsedSections.tasks ? '►' : '▼'}</span>
              <span>File and Folder Tasks</span>
            </div>
            {!collapsedSections.tasks && (
              <div className="sidebar-panel-content">
                <div className="sidebar-task">
                  <img src="/assets/icons/png/New Folder.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
                  Make a new folder
                </div>
                <div className="sidebar-task">
                  <img src="/assets/icons/png/Shared Folder.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
                  Publish this folder to the Web
                </div>
                <div className="sidebar-task">
                  <img src="/assets/icons/png/Shared Folder.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
                  Share this folder
                </div>
              </div>
            )}
          </div>

          {/* Other Places */}
          <div className="sidebar-panel">
            <div className="sidebar-panel-header" onClick={() => toggleSection('places')}>
              <span className="collapse-arrow">{collapsedSections.places ? '►' : '▼'}</span>
              <span>Other Places</span>
            </div>
            {!collapsedSections.places && (
              <div className="sidebar-panel-content">
                <div className="sidebar-link" onClick={() => setCurrentPath('My Documents')}>
                  <img src="/assets/icons/png/My Documents.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
                  My Documents
                </div>
                <div className="sidebar-link" onClick={() => setCurrentPath('My Computer')}>
                  <img src="/assets/icons/png/My Computer.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
                  My Computer
                </div>
                <div className="sidebar-link">
                  <img src="/assets/icons/png/My Network Places.png" alt="" style={{width: '16px', height: '16px', marginRight: '4px', verticalAlign: 'middle'}} />
                  My Network Places
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="sidebar-panel">
            <div className="sidebar-panel-header" onClick={() => toggleSection('details')}>
              <span className="collapse-arrow">{collapsedSections.details ? '►' : '▼'}</span>
              <span>Details</span>
            </div>
            {!collapsedSections.details && (
              <div className="sidebar-panel-content">
                <p style={{ fontSize: '11px', color: '#003d99' }}>
                  {selectedItems.length > 0
                    ? `${selectedItems.length} item(s) selected`
                    : 'Select an item to view its details.'}
                </p>
              </div>
            )}
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
                    e.target.src = '/assets/icons/png/Generic Document.png';
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
