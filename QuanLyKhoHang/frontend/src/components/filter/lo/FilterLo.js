import { Stack } from '@mui/material';
import React from 'react';
import FilterSearch from '../FilterSearch';
import { useState } from 'react';
import { useEffect } from 'react';

function FilterLo({ setCondition }) {
  const [filter, setFilter] = useState({
    lo: '',
  });

  useEffect(() => {
    const condition = {
      $or: [
        { ma_lo: { $regex: filter.lo.split(' ').join('.*'), $options: 'i' } },
        { ten_lo: { $regex: filter.lo.split(' ').join('.*'), $options: 'i' } },
        { $text: { $search: filter.lo } },
      ],
    };
    setCondition(condition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <Stack sx={{ width: '100%' }} spacing="10px">
      <FilterSearch
        title="Mã, tên lô"
        onSearch={(value) => setFilter({ lo: value })}
      />
    </Stack>
  );
}

export default FilterLo;
