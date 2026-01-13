import React, { useState } from 'react';
import Window from './Window';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import StartMenu from './StartMenu';
import FileExplorer from './FileExplorer';
import MobileBSOD from './MobileBSOD';
import ContextMenu from './ContextMenu';
import RunDialog from './dialogs/RunDialog';
import ShutdownDialog from './dialogs/ShutdownDialog';
import LogOffDialog from './dialogs/LogOffDialog';
import Notepad from './applications/Notepad';
import Calculator from './applications/Calculator';
import Paint from './applications/Paint';
import CommandPrompt from './applications/CommandPrompt';
import useIsMobile from '../hooks/useIsMobile';

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [activeWindow, setActiveWindow] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [showLogOffDialog, setShowLogOffDialog] = useState(false);
  const isMobile = useIsMobile();

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Windows+R for Run dialog
      if (e.metaKey && e.key === 'r') {
        e.preventDefault();
        setShowRunDialog(true);
      }

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
      icon: '/assets/icons/png/My Computer.png'
    },
    {
      id: 'my-documents',
      name: 'My Documents',
      icon: '/assets/icons/png/My Documents.png'
    },
    {
      id: 'my-network-places',
      name: 'My Network Places',
      icon: '/assets/icons/png/My Network Places.png'
    },
    {
      id: 'internet-explorer',
      name: 'Internet Explorer',
      icon: '/assets/icons/png/Internet Explorer 6.png'
    },
    {
      id: 'recycle-bin',
      name: 'Recycle Bin',
      icon: '/assets/icons/png/Whistler - Recycle Bin (empty).png'
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
        { label: 'Arrange Icons by', icon: '/assets/icons/png/Sort Alphabetically.png' },
        { label: 'Refresh', icon: '/assets/icons/png/Whistler - IE Refresh.png' },
        { separator: true },
        { label: 'Paste', icon: '/assets/icons/png/Cut.png', disabled: true },
        { separator: true },
        { label: 'New', icon: '/assets/icons/png/New Folder.png' },
        { separator: true },
        { label: 'Properties', icon: '/assets/icons/png/Display Properties.png' }
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
    // Handle special system dialogs
    if (program.id === 'run') {
      setShowRunDialog(true);
      setShowStartMenu(false);
      return;
    }
    if (program.id === 'shutdown') {
      setShowShutdownDialog(true);
      setShowStartMenu(false);
      return;
    }
    if (program.id === 'logoff') {
      setShowLogOffDialog(true);
      setShowStartMenu(false);
      return;
    }

    // Open normal application window
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
        return <Notepad />;
      case 'calculator':
        return <Calculator />;
      case 'paint':
        return <Paint />;
      case 'cmd':
        return <CommandPrompt />;
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

      {/* Dialogs */}
      {showRunDialog && <RunDialog onClose={() => setShowRunDialog(false)} />}
      {showShutdownDialog && <ShutdownDialog onClose={() => setShowShutdownDialog(false)} />}
      {showLogOffDialog && <LogOffDialog onClose={() => setShowLogOffDialog(false)} />}
    </div>
  );
};

export default Desktop;
