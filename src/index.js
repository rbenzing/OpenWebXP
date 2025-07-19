import React from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-beautiful-dnd';
import CssBaseline from '@mui/material/CssBaseline';
import Desktop from './components/Desktop';
import './styles/index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <DndProvider>
      <CssBaseline />
      <Desktop />
    </DndProvider>
  </React.StrictMode>
);
