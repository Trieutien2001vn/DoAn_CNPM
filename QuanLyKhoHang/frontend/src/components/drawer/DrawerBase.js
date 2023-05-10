import React, { useMemo } from 'react';
import { Box, Drawer, IconButton, Stack } from '@mui/material';
import { VscClose } from 'react-icons/vsc';

function DrawerBase({
  anchor = 'left',
  open,
  onClose,
  paperStyle,
  contentHeight,
  children,
  ...props
}) {
  const paperStyleSelf = useMemo(() => {
    switch (anchor) {
      case 'top':
        return { borderRadius: '0 0 20px 20px' };
      case 'left':
        return { borderRadius: '0 20px 20px 0' };
      case 'right':
        return { borderRadius: '20px 0 0 20px' };
      default:
        return { borderRadius: '20px 20px 0 0' };
    }
  }, [anchor]);

  return (
    <Drawer
      ModalProps={{ sx: { zIndex: 2000 } }}
      PaperProps={{
        sx: { ...paperStyleSelf, ...paperStyle },
        className: 'hidden-scroll',
        ...props.PaperProps,
      }}
      anchor={anchor}
      open={open}
      onClose={onClose}
      {...props}
    >
      <Stack
        sx={{
          height: '100%',
          padding: '0 10px',
          position: 'relative',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ height: '40px', borderBottom: '1px dashed #ccc' }}
        >
          <IconButton onClick={onClose}>
            <VscClose fontSize="16px" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            height: contentHeight || 'calc(100% - 40px)',
            overflow: 'auto',
            paddingRight: '10px',
          }}
          className="custome-scrolly"
        >
          {children}
        </Box>
      </Stack>
    </Drawer>
  );
}

export default DrawerBase;
