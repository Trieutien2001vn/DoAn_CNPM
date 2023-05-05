import React, { memo } from 'react';
import { Stack } from '@mui/material';
import FilterSearch from '../FilterSearch';
import { useState } from 'react';
import { useEffect } from 'react';
import FilterSelectApi from '../FilterSelectApi';
import { dsDanhMuc } from '~/utils/data';

function FilterProduct({ setCondition }) {
  const [filter, setFilter] = useState({
    vat_tu: '',
    barcode: '',
    nhom_vat_tu: null,
  });

  useEffect(() => {
    const condition = {
      $and: [
        {
          $or: [
            {
              ma_vt: {
                $regex: filter.vat_tu.split(' ').join('.*'),
                $options: 'i',
              },
            },
            {
              ten_vt: {
                $regex: filter.vat_tu.split(' ').join('.*'),
                $options: 'i',
              },
            },
            { $text: { $search: filter.vat_tu } },
          ],
        },
      ],
    };
    if (filter.barcode) {
      condition.$and.push({ barcode: filter.barcode });
    }
    if (filter.nhom_vat_tu) {
      condition.$and.push({ ma_nvt: filter.nhom_vat_tu.ma_nvt });
    }
    setCondition(condition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <Stack sx={{ width: '100%' }} spacing="10px">
      <FilterSearch
        title="Mã, tên hàng hóa"
        onSearch={(value) => setFilter({ ...filter, vat_tu: value })}
      />
      <FilterSearch
        title="Barcode"
        onSearch={(value) => setFilter({ ...filter, barcode: value })}
      />
      <FilterSelectApi
        title="Nhóm hàng hóa"
        apiCode="dmnvt"
        searchFileds={['ma_nvt', 'ten_nvt']}
        value={filter.nhom_vat_tu}
        onSelect={(value) => setFilter({ ...filter, nhom_vat_tu: value })}
        FormAdd={dsDanhMuc.dmnvt.Form}
      />
    </Stack>
  );
}

export default memo(FilterProduct);
