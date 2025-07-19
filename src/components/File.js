import React from 'react';
import { styled } from '@mui/material/styles';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileContainer = styled('div')(() => ({
  display: 'inline-flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px',
}));

const File = ({ name }) => {
  return (
    <FileContainer>
      <InsertDriveFileIcon />
      <span>{name}</span>
    </FileContainer>
  );
};

export default File;
