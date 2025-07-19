import React, { useState } from 'react';
import Menu from './Menu';
import Window from './Window';

const Desktop = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windows, setWindows] = useState([]);

  const handleRightClick = (event) => {
    event.preventDefault();
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleCreateWindow = () => {
    const newWindow = {
      id: windows.length + 1,
      x: Math.random() * 400,
      y: Math.random() * 400,
    };
    setWindows([...windows, newWindow]);
  };

  const handleDeleteWindow = (id) => {
    setWindows(windows.filter((window) => window.id !== id));
  };

  return (
    <div
      className="desktop"
      onContextMenu={handleRightClick}
      //style={{ backgroundImage: `url(path/to/your/background/image.jpg)` }}
    >
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          x={window.x}
          y={window.y}
          onDelete={handleDeleteWindow}
        />
      ))}
      {menuOpen && <Menu onClose={handleMenuClose} onCreateWindow={handleCreateWindow} />}
    </div>
  );
};

export default Desktop;
