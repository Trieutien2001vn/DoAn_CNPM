import React, { memo } from 'react';
import ButtonOption from '~/components/button/ButtonOption';
import { GoLocation } from 'react-icons/go';
import { Box, MenuItem } from '@mui/material';

function MenuStore() {
  return (
    <ButtonOption
      style={{ borderRadius: '4px' }}
      endIcon={<GoLocation fontSize="14px" />}
      PopupComponent={
        <Box sx={{ width: 200 }}>
          <MenuItem sx={{ fontSize: '1.3rem' }}>Kho Lấp Vò</MenuItem>
          <MenuItem sx={{ fontSize: '1.3rem' }}>Kho Cao Lãnh</MenuItem>
        </Box>
      }
    >
      Chi nhánh trung tâm
    </ButtonOption>
  );
}

export default memo(MenuStore);
