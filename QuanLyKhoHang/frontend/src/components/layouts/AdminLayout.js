import React from 'react';
import Header from './components/header/Header';
import MenuBar from './components/menubar/MenuBar';
import Footer from './components/footer/Footer';
import { Box, Container } from '@mui/material';

function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <MenuBar />
      <Box>
        <Container maxWidth="xl">{children}</Container>
      </Box>
      <Footer />
    </>
  );
}

export default AdminLayout;
