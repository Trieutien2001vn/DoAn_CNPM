import { Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import TableDisplay from '~/components/table/TableDisplay';
import useApisContext from '~/hooks/hookContext/useApisContext';
import { formatDateDisplay } from '~/utils/helpers';

const columns = [
    {
      name: 'Mã lô hàng',
      selector: (row) => row.ma_lo,
      width: '120px',
    },
    {
      name: 'Tên lô hàng',
      selector: (row) => row.ten_lo,
      width: '150px',
      wrap: true,
    },
    {
      name: 'Kho',
      selector: (row) => row.ten_kho,
      width: '150px',
      wrap: true,
      center: true
    },
    {
      name: 'Ngày sản xuất',
      selector: (row) => row.ngay_san_xuat,
      width: '150px',
      center: true,
      format: row => formatDateDisplay(row.ngay_san_xuat)
    },
   
    {
      name: 'Ngày hết hạn',
      selector: (row) => row.han_su_dung,
      minWidth: '120px',
      center: true,
      format: row => formatDateDisplay(row.han_su_dung)
    },
  ];
    
 

  function LoTab({maVt}) {
    const { asyncGetList } = useApisContext()
  const [los, setLos] = useState([])

  const getLos = async() => {
    try {
      const resp = await asyncGetList('dmlo', {ma_vt: maVt})
      if(resp) {
        setLos(resp.data)
      }
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getLos()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maVt])

    return (
      <>
        <Stack sx={{ width: '100%' }} spacing="10px">
          <TableDisplay
            data={los}
            columns={columns}
            // uniqueKey="ma_vt"
          />
        </Stack>
      </>
    );
  }
  
  export default LoTab;