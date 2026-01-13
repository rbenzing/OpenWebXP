import React, { useState } from 'react';

const Notepad = () => {
  const [text, setText] = useState('');
  const [statusBar, setStatusBar] = useState(true);

  const getLineColumn = () => {
    const lines = text.split('\n');
    const currentLine = lines.length;
    const currentColumn = lines[lines.length - 1]?.length + 1 || 1;
    return { line: currentLine, column: currentColumn };
  };

  const { line, column } = getLineColumn();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'white' }}>
      {/* Menu Bar */}
      <div style={{
        background: 'var(--xp-window-bg)',
        borderBottom: '1px solid #d4d0c8',
        padding: '2px 4px',
        fontSize: '11px',
        display: 'flex',
        gap: '8px'
      }}>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>File</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Edit</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Format</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>View</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
      </div>

      {/* Text Area */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          border: 'none',
          padding: '4px',
          fontFamily: 'Lucida Console, Courier New, monospace',
          fontSize: '13px',
          resize: 'none',
          outline: 'none',
          background: 'white',
          color: 'black'
        }}
        placeholder="Type your text here..."
      />

      {/* Status Bar */}
      {statusBar && (
        <div style={{
          background: 'var(--xp-window-bg)',
          borderTop: '1px solid #d4d0c8',
          padding: '2px 8px',
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>Ln {line}, Col {column}</span>
          <span>{text.length} characters</span>
        </div>
      )}
    </div>
  );
};

export default Notepad;
