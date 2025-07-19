import React from 'react';

const ContextMenu = ({ x, y, items, onClose, onItemClick }) => {
  if (!items || items.length === 0) return null;

  const handleItemClick = (item) => {
    onItemClick && onItemClick(item);
    onClose && onClose();
  };

  const menuStyle = {
    position: 'fixed',
    left: x,
    top: y,
    zIndex: 2000,
    background: 'var(--xp-window-bg)',
    border: '1px solid var(--xp-window-border)',
    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
    minWidth: '150px',
    padding: '2px 0'
  };

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1999
        }}
        onClick={onClose}
      />
      <div style={menuStyle}>
        {items.map((item, index) => (
          <div key={index}>
            {item.separator ? (
              <div style={{
                height: '1px',
                background: '#d4d0c8',
                margin: '2px 4px'
              }} />
            ) : (
              <div 
                style={{
                  padding: '4px 16px',
                  cursor: item.disabled ? 'default' : 'pointer',
                  color: item.disabled ? 'var(--xp-text-disabled)' : 'var(--xp-text-primary)',
                  fontSize: 'var(--xp-font-size)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled) {
                    e.target.style.background = 'linear-gradient(to right, #316ac5, #4a9eff)';
                    e.target.style.color = 'white';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.disabled) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--xp-text-primary)';
                  }
                }}
                onClick={() => !item.disabled && handleItemClick(item)}
              >
                {item.icon && (
                  <img 
                    src={item.icon} 
                    alt="" 
                    style={{ width: '16px', height: '16px' }}
                  />
                )}
                <span>{item.label}</span>
                {item.shortcut && (
                  <span style={{ marginLeft: 'auto', fontSize: '10px' }}>
                    {item.shortcut}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContextMenu;
