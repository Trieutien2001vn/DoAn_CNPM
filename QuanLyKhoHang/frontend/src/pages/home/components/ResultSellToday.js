import React from 'react';
import { Avatar, Grid, Paper, Stack, Typography } from '@mui/material';
import BankIcon from '~/assets/img/iconbank.png';
import BillIcon from '~/assets/img/iconBill.png';
import CustomerIcon from '~/assets/img/iconCustomer.png';
import { BsArrowUpShort } from 'react-icons/bs';

function ResultSellToday() {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography sx={{ fontSize: '13px', fontWeight: 550, mb: '10px' }}>
        KẾT QUẢ BÁN HÀNG HÔM NAY
      </Typography>
      <Grid container spacing={2}>
        {/* Đơn bán */}
        <Grid item xs={4}>
          <Stack
            sx={{
              width: '100%',
              backgroundColor: 'primary.fif',
              padding: '5px',
              borderRadius: '8px',
              height: '100%',
            }}
            direction="row"
            gap={2}
            alignItems="center"
          >
            <Avatar
              src={BankIcon}
              sx={{ width: 50, height: 50, borderRadius: 0 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                3 đơn đã xong
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 550,
                    color: 'secondary.main',
                  }}
                >
                  6.300.000
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="2px"
                  sx={{ color: 'primary.main' }}
                >
                  <BsArrowUpShort size={14} style={{ color: 'currentcolor' }} />
                  <Typography sx={{ fontSize: '10px' }}>12%</Typography>
                </Stack>
              </Stack>
              <Typography sx={{ fontSize: '12px', color: 'gray' }}>
                Hôm qua 5.350.000
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* Đơn đang phục vụ */}
        <Grid item xs={4}>
          <Stack
            sx={{
              width: '100%',
              backgroundColor: 'secondary.fif',
              padding: '5px',
              borderRadius: '8px',
              height: '100%',
            }}
            direction="row"
            gap={2}
            alignItems="center"
          >
            <Avatar
              src={BillIcon}
              sx={{ width: 50, height: 50, borderRadius: 0 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                0 đơn đang phục vụ
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 550,
                    color: 'secondary.main',
                  }}
                >
                  0
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>
        {/* Khách hàng */}
        <Grid item xs={4}>
          <Stack
            sx={{
              width: '100%',
              backgroundColor: 'thirdly.fif',
              padding: '5px',
              borderRadius: '8px',
              height: '100%',
            }}
            direction="row"
            gap={2}
            alignItems="center"
          >
            <Avatar
              src={CustomerIcon}
              sx={{ width: 50, height: 50, borderRadius: 0 }}
            />
            <Stack>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>
                Khách hàng
              </Typography>
              <Stack direction="row" gap={1} alignItems="center">
                <Typography
                  sx={{
                    fontSize: '18px',
                    fontWeight: 550,
                    color: 'secondary.main',
                  }}
                >
                  20
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  gap="2px"
                  sx={{ color: 'primary.main' }}
                >
                  <BsArrowUpShort size={14} style={{ color: 'currentcolor' }} />
                  <Typography sx={{ fontSize: '10px' }}>5%</Typography>
                </Stack>
              </Stack>
              <Typography sx={{ fontSize: '12px', color: 'gray' }}>
                Hôm qua 18
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default ResultSellToday;
