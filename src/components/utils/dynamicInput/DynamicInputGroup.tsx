import { Box } from '@mui/material';
import { ReactNode } from 'react';

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
