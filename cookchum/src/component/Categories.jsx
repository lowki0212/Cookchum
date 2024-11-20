import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="one">Egg, Milk and Milk Products</Button>,
  <Button key="two">Fruits</Button>,
  <Button key="three">Herbs and Spices</Button>,
  <Button key="four">Grain</Button>,
  <Button key="five">Meat</Button>,
  <Button key="six">Pasta</Button>,
  <Button key="seven">Fish</Button>,
  <Button key="eight">Vegetables</Button>,
  <Button key="nine">Nuts</Button>,
  <Button key="ten">Sweets</Button>,
];

export default function GroupOrientation() {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup orientation="vertical" aria-label="Vertical button group">
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="contained"
      >
        {buttons}
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}