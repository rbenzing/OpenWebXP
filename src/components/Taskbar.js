import React, { useState, useEffect } from 'react';

const Taskbar = ({ onStartClick, openWindows = [], onWindowClick, startMenuOpen = false }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="xp-taskbar">
      <button
        className={`xp-start-button ${startMenuOpen ? 'active' : ''}`}
        onClick={onStartClick}
      >
        start
      </button>
      
      <div className="xp-taskbar-tasks">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`xp-taskbar-task ${window.active ? 'active' : ''}`}
            onClick={() => onWindowClick(window.id)}
            style={{
              height: '24px',
              margin: '3px 1px',
              padding: '0 8px',
              background: window.active 
                ? 'linear-gradient(to bottom, #c1d2ee, #d4e6f1)' 
                : 'linear-gradient(to bottom, #ffffff, #ece9d8)',
              border: '1px solid #aca899',
              borderStyle: window.active ? 'inset' : 'outset',
              cursor: 'pointer',
              fontSize: '11px',
              maxWidth: '160px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {window.icon && (
              <img 
                src={window.icon} 
                alt="" 
                style={{ width: '16px', height: '16px', marginRight: '4px' }}
              />
            )}
            {window.title}
          </button>
        ))}
      </div>
      
      <div className="xp-system-tray">
        {/* System Tray Icons */}
        <div className="system-tray-icons">
          {/* Volume Icon */}
          <div className="system-tray-icon" title="Volume">
            <img
              src="/assets/icons/png/Whistler - Volume.png"
              alt="Volume"
              style={{ width: '16px', height: '16px' }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNnY0aDJsMyAzVjNMNCA2SDJ6bTcgMmMwLS42Ni0uMzQtMS4yNC0uODUtMS42bC0uMTUuMjNhMS4yNSAxLjI1IDAgMCAxIDAgMi43NGwuMTUuMjNjLjUxLS4zNi44NS0uOTQuODUtMS42eiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K';
              }}
            />
          </div>

          {/* Network Icon */}
          <div className="system-tray-icon" title="Network Connection">
            <img
              src="/assets/icons/png/Network Connection.png"
              alt="Network"
              style={{ width: '16px', height: '16px' }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEgOGMwLTMuODYgMy4xNC03IDctN3M3IDMuMTQgNyA3aC0yYzAtMi43Ni0yLjI0LTUtNS01cy01IDIuMjQtNSA1SDF6bTMgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0aC0yYzAtMS4xLS45LTItMi0ycy0yIC45LTIgMkg0em0zIDBoMnYySDd2LTJ6IiBmaWxsPSIjZmZmZmZmIi8+Cjwvc3ZnPgo=';
              }}
            />
          </div>

          {/* Antivirus/Security Icon */}
          <div className="system-tray-icon" title="Security Center">
            <img
              src="/assets/icons/png/Security Center.png"
              alt="Security"
              style={{ width: '16px', height: '16px' }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMUwzIDN2NmMwIDMuMDkgMi4xNCA1Ljk5IDUgNi43MiAyLjg2LS43MyA1LTMuNjMgNS02LjcyVjNMOCAxem0wIDEwLjVjLTEuMzggMC0yLjUtMS4xMi0yLjUtMi41UzYuNjIgNi41IDggNi41czIuNSAxLjEyIDIuNSAyLjVTOS4zOCAxMS41IDggMTEuNXoiIGZpbGw9IiNmZmZmZmYiLz4KPC9zdmc+Cg==';
              }}
            />
          </div>

          {/* Windows Update Icon */}
          <div className="system-tray-icon" title="Automatic Updates">
            <img
              src="/assets/icons/png/Whistler - Update.png"
              alt="Updates"
              style={{ width: '16px', height: '16px' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Safely Remove Hardware Icon */}
          <div className="system-tray-icon" title="Safely Remove Hardware">
            <img
              src="/assets/icons/png/Memory Stick.png"
              alt="USB"
              style={{ width: '16px', height: '16px' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Clock */}
        <div className="xp-clock" title={formatDate(currentTime)}>
          <div>{formatTime(currentTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
