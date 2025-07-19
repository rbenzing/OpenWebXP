import React from 'react';
import { styled } from '@mui/material/styles';
import FolderIcon from '@mui/icons-material/Folder';

const FolderContainer = styled('div')(() => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
}));

const Folder = ({ name }) => {
  return (
    <FolderContainer>
      <FolderIcon />
      <span>{name}</span>
    </FolderContainer>
  );
};

export default Folder;
