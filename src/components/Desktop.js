import React, { useState } from 'react';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import FileExplorer from './FileExplorer';
import MobileBSOD from './MobileBSOD';
import ContextMenu from './ContextMenu';
import useIsMobile from '../hooks/useIsMobile';

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [activeWindow, setActiveWindow] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const isMobile = useIsMobile();

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt + Tab for window switching (simplified)
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (windows.length > 1) {
          const currentIndex = windows.findIndex(w => w.id === activeWindow);
          const nextIndex = (currentIndex + 1) % windows.length;
          setActiveWindow(windows[nextIndex].id);
        }
      }

      // Windows key for Start Menu
      if (e.key === 'Meta' || (e.ctrlKey && e.key === 'Escape')) {
        e.preventDefault();
        setShowStartMenu(!showStartMenu);
      }

      // Escape to close context menu or start menu
      if (e.key === 'Escape') {
        setContextMenu(null);
        setShowStartMenu(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [windows, activeWindow, showStartMenu]);

  // Desktop icons configuration
  const desktopIcons = [
    {
      id: 'my-computer',
      name: 'My Computer',
      icon: '/assets/icons/my-computer.png'
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      icon: '/assets/icons/recycle-bin-empty.png'
    },
    {
      id: 'my-documents',
      name: 'My Documents',
      icon: '/assets/icons/my-documents.png'
    }
  ];

  // Handle desktop click to deselect icons
  const handleDesktopClick = (e) => {
    // Don't close start menu if clicking on taskbar area
    if (e.target.closest('.xp-taskbar') || e.target.closest('.xp-start-menu')) {
      return;
    }
    setSelectedIcon(null);
    setShowStartMenu(false);
    setContextMenu(null);
  };

  // Handle desktop right-click
  const handleDesktopRightClick = (e) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'Arrange Icons by', icon: null },
        { label: 'Refresh', icon: null },
        { separator: true },
        { label: 'Paste', icon: null, disabled: true },
        { separator: true },
        { label: 'New', icon: null },
        { separator: true },
        { label: 'Properties', icon: null }
      ]
    });
  };

  // Handle icon selection
  const handleIconSelect = (iconId) => {
    setSelectedIcon(iconId);
  };

  // Handle icon double-click to open windows
  const handleIconDoubleClick = (iconId) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    if (!icon) return;

    // Check if window is already open
    const existingWindow = windows.find(w => w.type === iconId);
    if (existingWindow) {
      // Bring existing window to front and restore if minimized
      const windowElement = document.querySelector(`[data-window-id="${existingWindow.id}"]`);
      if (windowElement && windowElement.style.display === 'none') {
        windowElement.style.display = 'block';
      }
      setActiveWindow(existingWindow.id);
      return;
    }

    // Create new window with cascade positioning
    const cascadeOffset = windows.length * 30;
    const newWindow = {
      id: `${iconId}-${Date.now()}`,
      title: icon.name,
      icon: icon.icon,
      type: iconId,
      isActive: true,
      initialPosition: {
        x: 50 + cascadeOffset,
        y: 50 + cascadeOffset
      },
      initialSize: { width: 600, height: 400 },
      zIndex: 1000
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
  };

  // Handle Start Menu
  const handleStartClick = () => {
    setShowStartMenu(!showStartMenu);
  };

  // Handle program launch from Start Menu
  const handleProgramClick = (program) => {
    const newWindow = {
      id: `${program.id}-${Date.now()}`,
      title: program.name,
      icon: program.icon,
      type: program.id,
      isActive: true,
      initialPosition: {
        x: 100 + windows.length * 30,
        y: 100 + windows.length * 30
      },
      initialSize: { width: 500, height: 350 }
    };

    setWindows(prev => [...prev, newWindow]);
    setActiveWindow(newWindow.id);
    setShowStartMenu(false);
  };

  // Handle window close
  const handleWindowClose = (windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = windows.filter(w => w.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  // Handle window focus
  const handleWindowFocus = (windowId) => {
    setActiveWindow(windowId);
    // Bring window to front by updating its z-index
    setWindows(prev => prev.map(w => ({
      ...w,
      zIndex: w.id === windowId ? 1000 : (w.zIndex || 999)
    })));
  };

  // Handle taskbar window click
  const handleTaskbarWindowClick = (windowId) => {
    const windowElement = document.querySelector(`[data-window-id="${windowId}"]`);
    if (windowElement) {
      // If window is minimized (hidden), restore it
      if (windowElement.style.display === 'none') {
        windowElement.style.display = 'block';
      }
    }
    setActiveWindow(windowId);
  };

  // Render window content based on type
  const renderWindowContent = (window) => {
    switch (window.type) {
      case 'my-computer':
      case 'my-documents':
        return <FileExplorer initialPath={window.title} />;
      case 'notepad':
        return (
          <div style={{ padding: '8px', height: '100%' }}>
            <textarea
              style={{
                width: '100%',
                height: '100%',
                border: '1px inset #d4d0c8',
                fontFamily: 'Courier New, monospace',
                fontSize: '12px',
                resize: 'none'
              }}
              placeholder="Type your text here..."
            />
          </div>
        );
      case 'calculator':
        return (
          <div style={{ padding: '8px', textAlign: 'center' }}>
            <div style={{
              background: 'black',
              color: 'lime',
              padding: '8px',
              fontFamily: 'monospace',
              fontSize: '16px',
              marginBottom: '8px'
            }}>
              0
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
              {['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '='].map(btn => (
                <button key={btn} style={{ padding: '8px', fontSize: '12px' }}>{btn}</button>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <h3>{window.title}</h3>
            <p>This is a mock {window.title} window.</p>
            <p>In a real Windows XP system, this would contain the actual application.</p>
          </div>
        );
    }
  };

  // Show mobile blue screen on small devices
  if (isMobile) {
    return (
      <div className="desktop">
        <MobileBSOD />
      </div>
    );
  }

  return (
    <div
      className="desktop"
      onClick={handleDesktopClick}
      onContextMenu={handleDesktopRightClick}
    >
      {/* Desktop Icons */}
      <div className="desktop-icons">
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            name={icon.name}
            icon={icon.icon}
            isSelected={selectedIcon === icon.id}
            onSelect={handleIconSelect}
            onDoubleClick={handleIconDoubleClick}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map(window => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          icon={window.icon}
          isActive={activeWindow === window.id}
          initialPosition={window.initialPosition}
          initialSize={window.initialSize}
          zIndex={window.zIndex || (activeWindow === window.id ? 1000 : 999)}
          onClose={handleWindowClose}
          onFocus={handleWindowFocus}
        >
          {renderWindowContent(window)}
        </Window>
      ))}

      {/* Start Menu */}
      <StartMenu
        isOpen={showStartMenu}
        onClose={() => setShowStartMenu(false)}
        onProgramClick={handleProgramClick}
      />

      {/* Taskbar */}
      <Taskbar
        onStartClick={handleStartClick}
        startMenuOpen={showStartMenu}
        openWindows={windows.map(w => ({
          id: w.id,
          title: w.title,
          icon: w.icon,
          active: activeWindow === w.id
        }))}
        onWindowClick={handleTaskbarWindowClick}
      />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu(null)}
          onItemClick={(item) => {
            console.log('Context menu item clicked:', item.label);
            setContextMenu(null);
          }}
        />
      )}
    </div>
  );
};

export default Desktop;
