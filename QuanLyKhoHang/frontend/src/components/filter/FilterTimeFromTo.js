import React, { useState } from 'react';
import FilterBox from './FilterBox';
import TextInput from '../input/TextInput';
import { Stack } from '@mui/material';
import ButtonBase from '../button/ButtonBase';
import { useEffect } from 'react';

function FilterTimeFromTo({
  title,
  defaultTimeFrom,
  defaultTimeTo,
  onSearch = () => {},
}) {
  const [time, setTime] = useState({
    timeFrom: defaultTimeFrom || '',
    timeTo: defaultTimeTo || '',
  });

  const handleTimeChange = ({ target: { name, value } }) => {
    setTime({ ...time, [name]: value });
  };
  useEffect(() => {
    onSearch(time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FilterBox title={title}>
      <Stack spacing="10px" sx={{ padding: '10px 0' }}>
        <TextInput
          label="Từ ngày"
          type="date"
          name="timeFrom"
          value={time.timeFrom}
          onChange={handleTimeChange}
        />
        <TextInput
          label="Đến ngày"
          type="date"
          name="timeTo"
          value={time.timeTo}
          onChange={handleTimeChange}
        />
        <ButtonBase onClick={() => onSearch(time)}>Lọc</ButtonBase>
      </Stack>
    </FilterBox>
  );
}

export default FilterTimeFromTo;
