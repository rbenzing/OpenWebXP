import React from 'react';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

const TrashContainer = styled('div')(() => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
}));

const Trash = () => {
  return (
    <TrashContainer>
      <DeleteIcon />
      <span>Trash</span>
    </TrashContainer>
  );
};

export default Trash;
