import React, { useState } from 'react';
import { IconButton, Paper, Stack, Typography, Collapse } from '@mui/material';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';

function FilterBox({ children, title }) {
  const [open, setOpen] = useState(true);

  return (
    <Paper sx={{ padding: '10px' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography sx={{ fontSize: '13px', fontWeight: 500 }}>
          {title}
        </Typography>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? (
            <BsCaretUp fontSize="14px" />
          ) : (
            <BsCaretDown fontSize="14px" />
          )}
        </IconButton>
      </Stack>
      <Collapse in={open}>{children}</Collapse>
    </Paper>
  );
}

export default FilterBox;
