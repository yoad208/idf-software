import { Stack, Typography } from '@mui/material';
import WindowOperations from './WindowOperations';

// eslint-disable-next-line import/prefer-default-export
export const Navigation = () => {
  return (
    <Stack
      className="titleBar"
      pr={2}
      spacing={2}
      bgcolor="#ececee"
      color="#313338"
      height="2.8rem"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        boxShadow: 2,
        zIndex: 1,
      }}
    >
      <WindowOperations />
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={2}
        direction="row"
      >
        <Typography>חט&quot;ל</Typography>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Hatal.png"
          width="30px"
          alt="Hatal"
        />
      </Stack>
    </Stack>
  );
};
