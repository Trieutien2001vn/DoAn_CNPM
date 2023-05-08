import { Stack } from '@mui/material';
import React from 'react';
import FilterSearch from '../FilterSearch';
import { useState } from 'react';
import { useEffect } from 'react';
import FilterTimeFromTo from '../FilterTimeFromTo';
import FilterSelectApi from '../FilterSelectApi';

function FilterPNK({ setCondition }) {
  const [filter, setFilter] = useState({
    pnk: '',
    chungTu: '',
    kho: null,
    timeFrom: '',
    timeTo: '',
  });

  useEffect(() => {
    const condition = {
      $or: [
        {
          ma_phieu: { $regex: filter.pnk.split(' ').join('.*'), $options: 'i' },
        },
        { $text: { $search: filter.pnk } },
      ],
    };
    if (filter.chungTu) {
      condition.ma_ct = {
        $regex: filter.chungTu.split(' ').join('.*'),
        $options: 'i',
      };
    }
    if (filter.kho) {
      condition.ma_kho = filter.kho.ma_kho;
    }
    if (filter.timeFrom || filter.timeTo) {
      if (filter.timeFrom && filter.timeTo) {
        condition.ngay_ct = { $gte: filter.timeFrom, $lte: filter.timeTo };
      } else if (filter.timeFrom) {
        condition.ngay_ct = { $gte: filter.timeFrom };
      } else if (filter.timeTo) {
        condition.ngay_ct = { $lte: filter.timeTo };
      }
    }
    setCondition(condition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <Stack sx={{ width: '100%' }} spacing="10px">
      <FilterSearch
        title="Mã phiếu"
        onSearch={(value) => setFilter({ ...filter, pnk: value })}
      />
      <FilterSearch
        title="Mã chứng từ"
        onSearch={(value) => setFilter({ ...filter, chungTu: value })}
      />
      <FilterSelectApi
        title="Kho"
        apiCode="dmkho"
        value={
          filter.kho
            ? { ma_kho: filter.kho.ma_kho, ten_kho: filter.kho.ten_kho }
            : null
        }
        searchFileds={['ma_kho', 'ten_kho']}
        getOptionLabel={(option) => option.ten_kho}
        onSelect={(value) => setFilter({ ...filter, kho: value })}
      />
      <FilterTimeFromTo
        title="Ngày chứng từ"
        onSearch={(time) => setFilter({ ...filter, ...time })}
      />
    </Stack>
  );
}

export default FilterPNK;
