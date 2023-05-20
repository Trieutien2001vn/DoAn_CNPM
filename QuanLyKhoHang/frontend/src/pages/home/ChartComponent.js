import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, MenuItem, Paper, TextField, Typography } from '@mui/material';

const menuOptions = [
  { value: 1, label: 'Hôm nay' },
  { value: 2, label: 'Hôm qua' },
  { value: 3, label: '7 ngày qua' },
  { value: 4, label: 'Tháng này' },
];

function ChartComponent({ title }) {
  const [menuOption, setMenuOption] = useState(menuOptions[0]);

  return (
    <ChartComponentWrapper>
      <Header>
        <Title>{title || 'Tiêu đề'} </Title>
        <Total>100.000.000</Total>
        <Select>
          <TextField
            select
            variant="standard"
            sx={{ width: '100px', '& .MuiSelect-select': { fontSize: '13px' } }}
            value={menuOption}
            onChange={(e) => setMenuOption(e.target.value)}
          >
            {menuOptions.map((option) => (
              <MenuItem
                sx={{ fontSize: '13px' }}
                key={option.value}
                value={option}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Select>
      </Header>
    </ChartComponentWrapper>
  );
}

export default ChartComponent;

const ChartComponentWrapper = styled(Paper)(({ theme }) => ({
  padding: '10px',
}));
const Header = styled(Box)`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
`;
const Title = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  textTransform: 'uppercase',
  fontWeight: 500,
}));
const Total = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  fontWeight: 500,
  marginLeft: 10,
  color: theme.palette.secondary.main,
}));
const Select = styled(Box)((theme) => ({
  marginLeft: 'auto',
}));
