import React from 'react';
import FilterBox from './FilterBox';
import SelectApiInput from '../input/SelectApiInput';

function FilterSelectApi({
  title,
  apiCode,
  value,
  searchFileds,
  onSelect = () => {},
  FormAdd,
}) {
  return (
    <FilterBox title={title}>
      <SelectApiInput
        title={title}
        apiCode={apiCode}
        getOptionLabel={(option) => option.ten_nvt}
        searchFileds={searchFileds}
        value={value}
        selectedValue={value}
        onSelect={onSelect}
        FormAdd={FormAdd}
      />
    </FilterBox>
  );
}

export default FilterSelectApi;
