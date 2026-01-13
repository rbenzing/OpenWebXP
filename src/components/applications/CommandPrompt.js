import React, { useState, useRef, useEffect } from 'react';

const CommandPrompt = () => {
  const [history, setHistory] = useState(['Microsoft Windows XP [Version 5.1.2600]', '(C) Copyright 1985-2001 Microsoft Corp.', '']);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = [];

    switch (trimmed) {
      case 'dir':
        output = [
          ' Volume in drive C has no label.',
          ' Directory of C:\\WINDOWS\\system32',
          '',
          '01/12/2026  10:30 AM    <DIR>          .',
          '01/12/2026  10:30 AM    <DIR>          ..',
          '01/01/2025  09:15 AM           256,000 notepad.exe',
          '01/01/2025  09:15 AM           128,000 calc.exe',
          '               2 File(s)        384,000 bytes',
          '               2 Dir(s)  15,234,567,890 bytes free'
        ];
        break;
      case 'help':
        output = [
          'For more information on a specific command, type HELP command-name',
          'CD              Displays the name of or changes the current directory.',
          'CLS             Clears the screen.',
          'DIR             Displays a list of files and subdirectories in a directory.',
          'EXIT            Quits the CMD.EXE program (command interpreter).',
          'HELP            Provides Help information for Windows commands.',
          'VER             Displays the Windows version.'
        ];
        break;
      case 'cls':
        setHistory([]);
        return;
      case 'ver':
        output = ['Microsoft Windows XP [Version 5.1.2600]'];
        break;
      case 'exit':
        output = ['Command Prompt closed (mock).'];
        break;
      case '':
        break;
      default:
        output = [`'${cmd}' is not recognized as an internal or external command,`, 'operable program or batch file.'];
    }

    return output;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentCommand.trim()) {
      setCommandHistory([...commandHistory, currentCommand]);
      setHistoryIndex(-1);

      const output = processCommand(currentCommand);
      const newHistory = [...history, `C:\\>${currentCommand}`, ...(output || []), ''];
      setHistory(newHistory);
      setCurrentCommand('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        background: '#000000',
        color: '#c0c0c0',
        fontFamily: 'Consolas, Courier New, monospace',
        fontSize: '12px',
        padding: '8px',
        height: '100%',
        overflow: 'auto',
        cursor: 'text'
      }}
    >
      {history.map((line, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap' }}>{line}</div>
      ))}
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <span>C:\&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#c0c0c0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            outline: 'none',
            marginLeft: '4px'
          }}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};

export default CommandPrompt;
