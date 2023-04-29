import React from 'react';
import { Box, TextareaAutosize } from '@mui/material';

function DescriptionTab({ register }) {
  return (
    <Box>
      <TextareaAutosize
        {...register('mo_ta')}
        placeholder="Mô tả chi tiết hàng hóa"
        style={{
          width: '100%',
          border: '1px solid #ccc',
          outline: 'none',
          minHeight: '50px',
          borderRadius: '4px',
          padding: '5px',
        }}
      />
    </Box>
  );
}

export default DescriptionTab;
