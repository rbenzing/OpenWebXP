import React from 'react';

const StartMenu = ({ isOpen, onClose, onProgramClick }) => {
  if (!isOpen) return null;

  // Fallback SVG icons for authentic Windows XP look
  const fallbackIcons = {
    'ie': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMwMDc1ZmYiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI0IiB5PSI0Ij4KPHBhdGggZD0iTTggMGE4IDggMCAwIDEgOCA4SDhWMHoiIGZpbGw9IiNmZmZmZmYiLz4KPHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+',
    'notepad': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiB4PSI0IiB5PSIyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM5OTk5OTkiLz4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI2IiB5PSI0Ij4KPHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxMiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+',
    'calculator': 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjIwIiB4PSI0IiB5PSIyIiBmaWxsPSIjZGRkZGRkIiBzdHJva2U9IiM5OTk5OTkiLz4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjMiIHg9IjYiIHk9IjQiIGZpbGw9IiMwMDAwMDAiLz4KPGNpcmNsZSBjeD0iOCIgY3k9IjEwIiByPSIxIiBmaWxsPSIjMzMzMzMzIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiMzMzMzMzMiLz4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxMCIgcj0iMSIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K'
  };

  const programs = [
    { name: 'Internet Explorer', icon: '/assets/icons/png/Internet Explorer 6.png', fallback: fallbackIcons.ie, id: 'ie' },
    { name: 'Outlook Express', icon: '/assets/icons/png/Outlook Express.png', id: 'outlook' },
    { name: 'Windows Media Player', icon: '/assets/icons/png/Windows Media Player 9.png', id: 'mediaplayer' },
    { name: 'Windows Messenger', icon: '/assets/icons/png/Windows Messenger.png', id: 'messenger' },
    { name: 'Notepad', icon: '/assets/icons/png/Notepad.png', fallback: fallbackIcons.notepad, id: 'notepad' },
    { name: 'Calculator', icon: '/assets/icons/png/Calculator.png', fallback: fallbackIcons.calculator, id: 'calculator' },
    { name: 'Paint', icon: '/assets/icons/png/Paint.png', id: 'paint' },
    { name: 'Command Prompt', icon: '/assets/icons/png/Command Prompt.png', id: 'cmd' }
  ];

  const recentDocuments = [
    'My Resume.doc',
    'Budget 2024.xls',
    'Vacation Photos',
    'Project Notes.txt'
  ];

  const handleProgramClick = (program) => {
    onProgramClick(program);
    onClose();
  };

  return (
    <>
      <div 
        className="start-menu-overlay" 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999
        }}
      />
      <div className="xp-start-menu">
        <div className="start-menu-header">
          <div className="start-menu-user">
            <img
              src="/assets/icons/png/User Accounts.png"
              alt="User"
              style={{ width: '48px', height: '48px' }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiMwMDU0ZTMiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6IiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+';
              }}
            />
            <span>Administrator</span>
          </div>
        </div>
        
        <div className="start-menu-content">
          <div className="start-menu-left">
            <div className="start-menu-section">
              <div className="start-menu-section-title">Pinned Programs</div>
              {programs.slice(0, 6).map((program) => (
                <div 
                  key={program.id}
                  className="start-menu-item"
                  onClick={() => handleProgramClick(program)}
                >
                  <img
                    src={program.icon}
                    alt={program.name}
                    style={{ width: '20px', height: '20px' }}
                    onError={(e) => {
                      if (program.fallback) {
                        e.target.src = program.fallback;
                      } else {
                        e.target.style.display = 'none';
                      }
                    }}
                  />
                  <span>{program.name}</span>
                </div>
              ))}
            </div>
            
            <div className="start-menu-separator" />
            
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'All Programs', id: 'all-programs' })}>
              <span>All Programs</span>
              <span className="start-menu-arrow">►</span>
            </div>
          </div>
          
          <div className="start-menu-right">
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'My Documents', id: 'my-documents' })}>
              <img
                src="/assets/icons/png/My Documents.png"
                alt="My Documents"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTMgMmgxNGEyIDIgMCAwIDEgMiAydjEyYTIgMiAwIDAgMS0yIDJIM2EyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNNSA2aDEwTTUgOWgxME01IDEyaDgiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxIi8+CjwvdGc+';
                }}
              />
              <span>My Documents</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'My Recent Documents', id: 'recent-documents' })}>
              <img
                src="/assets/icons/png/Recent Documents.png"
                alt="Recent Documents"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTAgNnY0bDMgMyIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8L3N2Zz4K';
                }}
              />
              <span>My Recent Documents</span>
              <span className="start-menu-arrow">►</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'My Pictures', id: 'my-pictures' })}>
              <img
                src="/assets/icons/png/My Pictures.png"
                alt="My Pictures"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiB4PSIyIiB5PSI0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM5OTk5OTkiLz4KPGNpcmNsZSBjeD0iNiIgY3k9IjgiIHI9IjEuNSIgZmlsbD0iI2ZmZGQwMCIvPgo8cGF0aCBkPSJNMTAgMTJsLTIuNS0yLjVMMTAgNy41bDQgNEgxMHoiIGZpbGw9IiM2NmNjNjYiLz4KPC9zdmc+';
                }}
              />
              <span>My Pictures</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'My Music', id: 'my-music' })}>
              <img
                src="/assets/icons/png/My Music.png"
                alt="My Music"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNiIgY3k9IjE0IiByPSIyIiBmaWxsPSIjMzMzMzMzIi8+CjxjaXJjbGUgY3g9IjE0IiBjeT0iMTIiIHI9IjIiIGZpbGw9IiMzMzMzMzMiLz4KPHBhdGggZD0iTTggMTRWNmw2LTJ2OCIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+';
                }}
              />
              <span>My Music</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'My Computer', id: 'my-computer' })}>
              <img
                src="/assets/icons/png/My Computer.png"
                alt="My Computer"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiB4PSIyIiB5PSI0IiBmaWxsPSIjZGRkZGRkIiBzdHJva2U9IiM5OTk5OTkiLz4KPHJlY3Qgd2lkdGg9IjEyIiBoZWlnaHQ9IjgiIHg9IjQiIHk9IjUiIGZpbGw9IiMwMDc1ZmYiLz4KPHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iMiIgeD0iNyIgeT0iMTQiIGZpbGw9IiM5OTk5OTkiLz4KPC9zdmc+';
                }}
              />
              <span>My Computer</span>
            </div>
            
            <div className="start-menu-separator" />
            
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'Control Panel', id: 'control-panel' })}>
              <img
                src="/assets/icons/png/Control Panel.png"
                alt="Control Panel"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjEwIiByPSIzIiBmaWxsPSJub25lIiBzdHJva2U9IiMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjxwYXRoIGQ9Ik0xMCAydjJNMTggMTBoLTJNMTAgMTh2LTJNMSA5aDIiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPC9zdmc+';
                }}
              />
              <span>Control Panel</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'Help and Support', id: 'help' })}>
              <img
                src="/assets/icons/png/Whistler - Help and Support.png"
                alt="Help"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMzMzMzMzIiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNNy41IDcuNWEyLjUgMi41IDAgMCAxIDUgMGMwIDEuMjUtMS4yNSAyLTIuNSAyLjVNMTAgMTQuNWguMDEiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPC9zdmc+';
                }}
              />
              <span>Help and Support</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'Search', id: 'search' })}>
              <img
                src="/assets/icons/png/Search.png"
                alt="Search"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9zdmc+';
                }}
              />
              <span>Search</span>
            </div>
            <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'Run...', id: 'run' })}>
              <img
                src="/assets/icons/png/Whistler - Run.png"
                alt="Run"
                style={{ width: '20px', height: '20px' }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgNGw4IDZsLTggNlY0eiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K';
                }}
              />
              <span>Run...</span>
            </div>
            
            <div className="start-menu-separator" />
            
            <div className="start-menu-bottom">
              <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'Log Off', id: 'logoff' })}>
                <img
                  src="/assets/icons/png/Logout.png"
                  alt="Log Off"
                  style={{ width: '20px', height: '20px' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDJhOCA4IDAgMCAxIDggOGgtMmE2IDYgMCAxIDAtNi02VjJaIiBzdHJva2U9IiMzMzMzMzMiIHN0cm9rZS13aWR0aD0iMS41Ii8+CjxwYXRoIGQ9Ik0xNCA2bDQgNGgtNFY2WiIgZmlsbD0iIzMzMzMzMyIvPgo8L3N2Zz4K';
                  }}
                />
                <span>Log Off</span>
              </div>
              <div className="start-menu-item" onClick={() => handleProgramClick({ name: 'Turn Off Computer', id: 'shutdown' })}>
                <img
                  src="/assets/icons/png/Power.png"
                  alt="Shutdown"
                  style={{ width: '20px', height: '20px' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY0NDQ0IiBzdHJva2Utd2lkdGg9IjEuNSIvPgo8cGF0aCBkPSJNMTAgNnY0IiBzdHJva2U9IiNmZjQ0NDQiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K';
                  }}
                />
                <span>Turn Off Computer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
