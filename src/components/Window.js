import React, { useState, useRef, useEffect } from 'react';

const Window = ({
  id,
  title,
  children,
  onClose,
  onFocus,
  isActive = false,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 400, height: 300 },
  icon = null,
  resizable = true,
  minimizable = true,
  maximizable = true,
  zIndex = 999
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.xp-window-controls')) return;

    onFocus && onFocus(id);
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleTitleBarDoubleClick = () => {
    if (maximizable) {
      handleMaximize();
    }
  };



  const handleResizeStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  const handleMinimize = () => {
    // Hide the window by setting display to none
    if (windowRef.current) {
      windowRef.current.style.display = 'none';
    }
    // In a real implementation, this would also update the taskbar button state
    console.log('Minimize window:', id);
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      setPosition(initialPosition);
      setSize(initialSize);
    } else {
      setIsMaximized(true);
      setPosition({ x: 0, y: 0 });
      setSize({
        width: window.innerWidth,
        height: window.innerHeight - 30 // Account for taskbar
      });
    }
  };

  const handleClose = () => {
    onClose && onClose(id);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      const handleMove = (e) => {
        if (isDragging && !isMaximized) {
          const newX = e.clientX - dragStart.x;
          const newY = Math.max(0, e.clientY - dragStart.y);

          // Snap to screen edges (Windows XP behavior)
          const snapThreshold = 10;
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight - 30; // Account for taskbar

          let snappedX = newX;
          let snappedY = newY;

          // Snap to left edge
          if (newX < snapThreshold) snappedX = 0;
          // Snap to right edge
          if (newX + size.width > screenWidth - snapThreshold) snappedX = screenWidth - size.width;
          // Snap to top edge
          if (newY < snapThreshold) snappedY = 0;
          // Snap to bottom edge (above taskbar)
          if (newY + size.height > screenHeight - snapThreshold) snappedY = screenHeight - size.height;

          setPosition({ x: snappedX, y: snappedY });
        }
        if (isResizing) {
          const newWidth = Math.max(200, resizeStart.width + (e.clientX - resizeStart.x));
          const newHeight = Math.max(150, resizeStart.height + (e.clientY - resizeStart.y));
          setSize({ width: newWidth, height: newHeight });
        }
      };

      const handleUp = () => {
        setIsDragging(false);
        setIsResizing(false);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);

      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart, isMaximized]);

  const windowStyle = {
    left: position.x,
    top: position.y,
    width: size.width,
    height: size.height,
    zIndex: zIndex
  };

  return (
    <div
      ref={windowRef}
      className={`xp-window ${isActive ? 'active' : 'inactive'} ${isDragging ? 'dragging' : ''}`}
      style={windowStyle}
      data-window-id={id}
      onClick={() => onFocus && onFocus(id)}
    >
      <div
        className="xp-window-titlebar"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleTitleBarDoubleClick}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {icon && (
          <img
            src={icon}
            alt=""
            style={{ width: '16px', height: '16px', marginRight: '4px' }}
          />
        )}
        <span className="xp-window-title">{title}</span>
        <div className="xp-window-controls">
          {minimizable && (
            <button
              className="xp-window-button"
              onClick={handleMinimize}
              title="Minimize"
            >
              _
            </button>
          )}
          {maximizable && (
            <button
              className="xp-window-button"
              onClick={handleMaximize}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? '❐' : '□'}
            </button>
          )}
          <button
            className="xp-window-button xp-close-button"
            onClick={handleClose}
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="xp-window-content">
        {children}
      </div>
      {resizable && !isMaximized && (
        <div
          className="xp-window-resize-handle"
          onMouseDown={handleResizeStart}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            cursor: 'nw-resize',
            background: 'transparent'
          }}
        />
      )}
    </div>
  );
};

export default Window;
