import React from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import styled from 'styled-components';
import Logo from '~/components/svgs/Logo';
import ButtonOption from '~/components/button/ButtonOption';
import { SlEnvolope } from 'react-icons/sl';
import { AiOutlineSetting } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import MenuSettings from './MenuSettings';
import MenuStore from './MenuStore';
import { TbLogout } from 'react-icons/tb';
import { logoutUser } from '~/redux/actions/auth.action';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { auth } = useSelector((state) => state);
  const dispath = useDispatch();
  const navigate = useNavigate();

  return (
    <HeaderWrapper component="header">
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <HeaderContainer direction="row">
          <HeaderLogo onClick={() => navigate('/')}>
            <Logo />
            <Typography sx={{ fontSize: '20px', fontWeight: 550 }}>
              HA Mart
            </Typography>
          </HeaderLogo>
          <HeaderActions>
            <MenuStore />
            <ButtonOption
              style={{ borderRadius: '4px' }}
              startIcon={<SlEnvolope fontSize="14px" />}
              notification
            />
            <ButtonOption
              style={{ borderRadius: '4px' }}
              endIcon={<AiOutlineSetting fontSize="14px" />}
              PopupComponent={<MenuSettings />}
            >
              Thiết lập
            </ButtonOption>
            <ButtonOption
              style={{ borderRadius: '4px' }}
              endIcon={<FaUserCircle fontSize="14px" />}
              menuWidth="200px"
              popupOptions={[
                {
                  text: 'Tài khoản',
                  startIcon: <FaUserCircle fontSize="14px" />,
                },
                {
                  text: 'Đăng xuất',
                  startIcon: <TbLogout fontSize="14px" />,
                  onClick: () => logoutUser(dispath),
                },
              ]}
            >
              {auth.login?.user?.user?.email || 'email@gmail.com'}
            </ButtonOption>
          </HeaderActions>
        </HeaderContainer>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
const HeaderWrapper = styled(Box)`
  width: 100%;
  height: 50px;
`;
const HeaderContainer = styled(Stack)`
  height: 100%;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLogo = styled(Box)`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  cursor: pointer;
`;
const HeaderActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
`;
