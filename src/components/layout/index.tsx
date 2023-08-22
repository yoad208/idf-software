import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import { SideBar } from './SideBar';

// eslint-disable-next-line import/prefer-default-export
export const Layout = () => {
  return (
    <Stack direction="row">
      <SideBar />

      <Stack sx={{ flexGrow: 1 }}>
        <Box maxHeight="100vh" bgcolor="#e6e6e7" maxWidth="calc(100% - 240px)">
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};
