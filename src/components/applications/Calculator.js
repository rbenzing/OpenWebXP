import React, { useState } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(String(num));
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const buttonStyle = {
    padding: '12px',
    fontSize: '14px',
    background: 'linear-gradient(to bottom, #ffffff 0%, #ece9d8 100%)',
    border: '1px solid #aca899',
    cursor: 'pointer',
    borderRadius: '2px'
  };

  return (
    <div style={{ padding: '8px', background: 'var(--xp-window-bg)', height: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {/* Menu */}
      <div style={{ fontSize: '11px', display: 'flex', gap: '8px' }}>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>View</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Edit</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
      </div>

      {/* Display */}
      <div style={{
        background: '#0a0a0a',
        color: '#00ff00',
        padding: '12px',
        fontFamily: 'Consolas, Courier New, monospace',
        fontSize: '24px',
        textAlign: 'right',
        border: '2px inset #808080',
        fontWeight: 'bold'
      }}>
        {display}
      </div>

      {/* Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
        <button style={buttonStyle} onClick={handleClear}>C</button>
        <button style={buttonStyle} onClick={() => setDisplay(String(-parseFloat(display)))}>±</button>
        <button style={buttonStyle}>%</button>
        <button style={buttonStyle} onClick={() => handleOperation('÷')}>÷</button>

        <button style={buttonStyle} onClick={() => handleNumber(7)}>7</button>
        <button style={buttonStyle} onClick={() => handleNumber(8)}>8</button>
        <button style={buttonStyle} onClick={() => handleNumber(9)}>9</button>
        <button style={buttonStyle} onClick={() => handleOperation('×')}>×</button>

        <button style={buttonStyle} onClick={() => handleNumber(4)}>4</button>
        <button style={buttonStyle} onClick={() => handleNumber(5)}>5</button>
        <button style={buttonStyle} onClick={() => handleNumber(6)}>6</button>
        <button style={buttonStyle} onClick={() => handleOperation('-')}>−</button>

        <button style={buttonStyle} onClick={() => handleNumber(1)}>1</button>
        <button style={buttonStyle} onClick={() => handleNumber(2)}>2</button>
        <button style={buttonStyle} onClick={() => handleNumber(3)}>3</button>
        <button style={buttonStyle} onClick={() => handleOperation('+')}>+</button>

        <button style={{...buttonStyle, gridColumn: 'span 2'}} onClick={() => handleNumber(0)}>0</button>
        <button style={buttonStyle} onClick={() => setDisplay(display + '.')}>.</button>
        <button style={buttonStyle} onClick={handleEquals}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
