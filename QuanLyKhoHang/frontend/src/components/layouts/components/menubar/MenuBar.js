import React from 'react';
import { Box, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import ButtonOption from '~/components/button/ButtonOption';
import { HiOutlineViewGridAdd, HiOutlineUsers } from 'react-icons/hi';
import { BsBoxSeam, BsGrid3X3 } from 'react-icons/bs';
import { BiTransferAlt } from 'react-icons/bi';
import { RiStore3Line } from 'react-icons/ri';
import { MdOutlineSell } from 'react-icons/md';
import {
  AiOutlineUsergroupAdd,
  AiOutlineDollarCircle,
  AiOutlinePieChart,
} from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';

function MenuBar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <MenuBarWrapper bgColor={theme.palette.primary.second}>
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <MenuBarContainer>
          <ButtonOption
            active={location.pathname === '/'}
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<HiOutlineViewGridAdd fontSize="16px" />}
            onClick={() => navigate('/')}
          >
            Tổng quan
          </ButtonOption>
          <ButtonOption
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<BsBoxSeam fontSize="16px" />}
            menuColor={theme.palette.primary.second}
            active={['/list/dmvt'].includes(location.pathname)}
            popupOptions={[
              {
                text: 'Danh mục',
                startIcon: <BsGrid3X3 fontSize="14px" />,
                primary: true,
                onClick: () => navigate('/list/dmvt'),
              },
              {
                text: 'Thiết lập giá',
                startIcon: <MdOutlineSell fontSize="14px" />,
                primary: true,
              },
              {
                text: 'Kiểm kho',
                startIcon: <RiStore3Line fontSize="14px" />,
                primary: true,
              },
            ]}
          >
            Hàng hóa
          </ButtonOption>
          <ButtonOption
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<BiTransferAlt fontSize="16px" />}
          >
            Giao dịch
          </ButtonOption>
          <ButtonOption
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<AiOutlineUsergroupAdd fontSize="16px" />}
          >
            Đối tác
          </ButtonOption>
          <ButtonOption
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<HiOutlineUsers fontSize="16px" />}
          >
            Nhân viên
          </ButtonOption>
          <ButtonOption
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<AiOutlineDollarCircle fontSize="16px" />}
          >
            Sổ quỹ
          </ButtonOption>
          <ButtonOption
            style={{ borderRadius: '4px' }}
            primary
            startIcon={<AiOutlinePieChart fontSize="16px" />}
          >
            Báo cáo
          </ButtonOption>
        </MenuBarContainer>
      </Container>
    </MenuBarWrapper>
  );
}

export default MenuBar;

const MenuBarWrapper = styled.div`
  height: 42px;
  background-color: ${(props) => props.bgColor};
`;
const MenuBarContainer = styled(Box)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  gap: 10px;
`;
