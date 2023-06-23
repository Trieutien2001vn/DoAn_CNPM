import React from 'react';
import FilterBox from './FilterBox';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

function FilterSearch({ title, onSearch = () => {} }) {
  const [search, setSearch] = useState('');
  const [dot, setDot] = useState(false);

  // handle search
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(search.trim());
      if (!search) {
        setDot(false);
      } else {
        setDot(true);
      }
    }
  };
  // handle clear
  const handleClear = () => {
    onSearch('');
    setSearch('');
    setDot(false);
  };

  return (
    <FilterBox title={title} dot={dot}>
      <TextField
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleSearch}
        fullWidth
        sx={{
          '& .MuiInputBase-root': {
            height: '42px',
            paddingRight: '5px',
            '& input': {
              height: '100%',
            },
          },
          '& .MuiInputBase-input': { padding: '0 10px', fontSize: '13px' },
        }}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <>
              {search && (
                <IconButton onClick={handleClear}>
                  <MdClose fontSize="14px" />
                </IconButton>
              )}
            </>
          ),
        }}
      />
    </FilterBox>
  );
}

export default FilterSearch;
