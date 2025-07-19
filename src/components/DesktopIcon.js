import React, { useState } from 'react';

const DesktopIcon = ({ 
  id, 
  name, 
  icon, 
  onDoubleClick, 
  onRightClick,
  isSelected = false,
  onSelect 
}) => {
  const [clickCount, setClickCount] = useState(0);
  const [clickTimer, setClickTimer] = useState(null);

  const handleClick = (e) => {
    e.stopPropagation();
    
    setClickCount(prev => prev + 1);
    
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
    
    const timer = setTimeout(() => {
      if (clickCount === 0) {
        // Single click - select icon
        onSelect && onSelect(id);
      } else if (clickCount === 1) {
        // Double click - open
        onDoubleClick && onDoubleClick(id);
      }
      setClickCount(0);
    }, 300);
    
    setClickTimer(timer);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onRightClick && onRightClick(e, id);
  };

  return (
    <div 
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <img 
        src={icon} 
        alt={name}
        draggable={false}
        onError={(e) => {
          // Fallback to a generic icon if the specific icon fails to load
          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjMDA1NGUzIi8+CjxwYXRoIGQ9Ik04IDhIMjRWMjRIOFY4WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';
        }}
      />
      <span className="desktop-icon-label">{name}</span>
    </div>
  );
};

export default DesktopIcon;
