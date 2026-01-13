import React, { useState, useEffect } from 'react';

const ShutdownDialog = ({ onClose }) => {
  const [selected, setSelected] = useState('turnoff');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleShutdown = () => {
    console.log('Shutdown option:', selected);
    alert(`Mock ${selected === 'standby' ? 'Standby' : selected === 'turnoff' ? 'Turn Off' : 'Restart'}`);
    onClose();
  };

  return (
    <>
      <div className="dialog-overlay" onClick={onClose} />
      <div className="xp-dialog shutdown-dialog">
        <div className="dialog-titlebar">
          <img
            src="/assets/icons/png/Power.png"
            alt="Shut Down"
            className="dialog-icon"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="dialog-title">Shut Down Windows</span>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="dialog-content">
          <div className="shutdown-dialog-body">
            <div className="shutdown-icon-section">
              <img
                src="/assets/icons/png/My Computer.png"
                alt="Computer"
                style={{ width: '48px', height: '48px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="shutdown-options-section">
              <p className="shutdown-question">What do you want the computer to do?</p>
              <div className="shutdown-options">
                <label className="shutdown-option">
                  <input
                    type="radio"
                    name="shutdown"
                    value="standby"
                    checked={selected === 'standby'}
                    onChange={(e) => setSelected(e.target.value)}
                  />
                  <img
                    src="/assets/icons/png/Standby.png"
                    alt="Standby"
                    className="option-icon"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span>Stand by</span>
                </label>
                <label className="shutdown-option">
                  <input
                    type="radio"
                    name="shutdown"
                    value="turnoff"
                    checked={selected === 'turnoff'}
                    onChange={(e) => setSelected(e.target.value)}
                  />
                  <img
                    src="/assets/icons/png/Power.png"
                    alt="Turn Off"
                    className="option-icon"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span>Turn off</span>
                </label>
                <label className="shutdown-option">
                  <input
                    type="radio"
                    name="shutdown"
                    value="restart"
                    checked={selected === 'restart'}
                    onChange={(e) => setSelected(e.target.value)}
                  />
                  <img
                    src="/assets/icons/png/Restart.png"
                    alt="Restart"
                    className="option-icon"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span>Restart</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-buttons">
          <button className="xp-button dialog-button-primary" onClick={handleShutdown}>
            OK
          </button>
          <button className="xp-button" onClick={onClose}>
            Cancel
          </button>
          <button className="xp-button">
            Help
          </button>
        </div>
      </div>
    </>
  );
};

export default ShutdownDialog;
