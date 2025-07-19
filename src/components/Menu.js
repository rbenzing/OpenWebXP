import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';

const StyledMenu = styled(Menu)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
}));

const CustomMenu = ({ onClose, onCreateWindow }) => {

  const handleBackgroundChange = (color) => {
    document.body.style.backgroundColor = color;
  };

  const handleImageChange = (image) => {
    const desktop = document.querySelector('.desktop');
    desktop.style.backgroundImage = `url(${image})`;
  };

  return (
    <StyledMenu open={true} onClose={onClose}>
      <MenuItem onClick={() => handleBackgroundChange('white')}>Change Background Color</MenuItem>
      <MenuItem onClick={() => handleBackgroundChange('lightgray')}>Change Background Color</MenuItem>
      <MenuItem onClick={() => handleImageChange('path/to/your/background/image.jpg')}>Change Background Image</MenuItem>
      <MenuItem onClick={onCreateWindow}>Create Window</MenuItem>
    </StyledMenu>
  );
};

export default CustomMenu;
