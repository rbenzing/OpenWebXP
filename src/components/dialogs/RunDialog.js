import React, { useState, useEffect } from 'react';

const RunDialog = ({ onClose }) => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    'notepad',
    'calc',
    'mspaint',
    'cmd'
  ]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleRun = () => {
    if (command.trim()) {
      console.log('Running command:', command);
      alert(`Would run: ${command}`);
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleRun();
    }
  };

  return (
    <>
      <div className="dialog-overlay" onClick={onClose} />
      <div className="xp-dialog run-dialog">
        <div className="dialog-titlebar">
          <img
            src="/assets/icons/png/Whistler - Run.png"
            alt="Run"
            className="dialog-icon"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span className="dialog-title">Run</span>
          <button className="dialog-close" onClick={onClose}>×</button>
        </div>
        <div className="dialog-content">
          <div className="run-dialog-body">
            <div className="run-icon-section">
              <img
                src="/assets/icons/png/Whistler - Run.png"
                alt="Run"
                style={{ width: '32px', height: '32px' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="run-form-section">
              <p className="run-description">
                Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
              </p>
              <div className="run-input-group">
                <label htmlFor="run-command">Open:</label>
                <select
                  id="run-command"
                  className="run-dropdown"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                >
                  <option value=""></option>
                  {history.map((cmd, index) => (
                    <option key={index} value={cmd}>{cmd}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="dialog-buttons">
          <button className="xp-button dialog-button-primary" onClick={handleRun}>
            OK
          </button>
          <button className="xp-button" onClick={onClose}>
            Cancel
          </button>
          <button className="xp-button">
            Browse...
          </button>
        </div>
      </div>
    </>
  );
};

export default RunDialog;
