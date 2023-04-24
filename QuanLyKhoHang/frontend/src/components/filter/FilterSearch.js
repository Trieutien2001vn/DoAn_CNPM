import React from 'react';
import FilterBox from './FilterBox';
import { TextField } from '@mui/material';

function FilterSearch({ title }) {
  return (
    <FilterBox title={title}>
      <TextField
        fullWidth
        sx={{
          '& .MuiInputBase-input': { padding: '6px 10px', fontSize: '13px' },
        }}
        variant="outlined"
      />
    </FilterBox>
  );
}

export default FilterSearch;
