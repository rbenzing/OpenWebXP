import React, { useEffect } from 'react';

const LogOffDialog = ({ onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleLogOff = () => {
    console.log('Logging off...');
    alert('Mock log off - would return to login screen');
    onClose();
  };

  return (
    <>
      <div className="dialog-overlay" onClick={onClose} />
      <div className="xp-dialog logoff-dialog">
        <div className="dialog-titlebar">
          <img
            src="/assets/icons/png/Logout.png"
            alt="Log Off"
            className="dialog-icon"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="dialog-title">Log Off Windows</span>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="dialog-content">
          <div className="logoff-dialog-body">
            <div className="logoff-icon">
              <img
                src="/assets/icons/png/Whistler - Help and Support.png"
                alt="Question"
                style={{ width: '32px', height: '32px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="logoff-message">
              <p>Are you sure you want to log off?</p>
            </div>
          </div>
        </div>
        <div className="dialog-buttons">
          <button className="xp-button dialog-button-primary" onClick={handleLogOff}>
            Log Off
          </button>
          <button className="xp-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default LogOffDialog;
