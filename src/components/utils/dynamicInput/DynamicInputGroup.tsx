import { Box } from '@mui/material';
import { ReactNode } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const DynamicInputGroup = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};
