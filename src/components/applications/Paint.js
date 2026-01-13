import React, { useRef, useState, useEffect } from 'react';

const Paint = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [tool, setTool] = useState('pencil');

  const colors = [
    '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
    '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
    '#ffffe0', '#ffd700', '#ffa500', '#ff6347', '#98fb98', '#87ceeb', '#9370db', '#ff69b4'
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    setIsDrawing(true);
    ctx.strokeStyle = color;
    ctx.lineWidth = tool === 'pencil' ? 2 : 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--xp-window-bg)' }}>
      {/* Menu Bar */}
      <div style={{
        borderBottom: '1px solid #d4d0c8',
        padding: '2px 4px',
        fontSize: '11px',
        display: 'flex',
        gap: '8px'
      }}>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>File</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Edit</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>View</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Image</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Colors</span>
        <span style={{ padding: '2px 8px', cursor: 'pointer' }}>Help</span>
      </div>

      {/* Toolbar */}
      <div style={{
        borderBottom: '1px solid #d4d0c8',
        padding: '4px',
        display: 'flex',
        gap: '2px'
      }}>
        <button
          onClick={() => setTool('pencil')}
          style={{ padding: '4px 8px', background: tool === 'pencil' ? '#c1d2ee' : 'white', border: '1px solid #aca899', cursor: 'pointer', fontSize: '11px' }}
        >
          Pencil
        </button>
        <button
          onClick={() => setTool('brush')}
          style={{ padding: '4px 8px', background: tool === 'brush' ? '#c1d2ee' : 'white', border: '1px solid #aca899', cursor: 'pointer', fontSize: '11px' }}
        >
          Brush
        </button>
        <button
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }}
          style={{ padding: '4px 8px', background: 'white', border: '1px solid #aca899', cursor: 'pointer', marginLeft: '8px' }}
        >
          Clear
        </button>
      </div>

      {/* Canvas Area */}
      <div style={{ flex: 1, padding: '8px', overflow: 'auto' }}>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          style={{ border: '2px solid #808080', cursor: 'crosshair', background: 'white' }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Color Palette */}
      <div style={{
        borderTop: '1px solid #d4d0c8',
        padding: '8px',
        display: 'grid',
        gridTemplateColumns: 'repeat(14, 1fr)',
        gap: '2px',
        maxWidth: '400px'
      }}>
        {colors.map((c, i) => (
          <div
            key={i}
            onClick={() => setColor(c)}
            style={{
              width: '20px',
              height: '20px',
              background: c,
              border: color === c ? '2px solid black' : '1px solid #808080',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Paint;
