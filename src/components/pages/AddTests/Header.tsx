import { Stack, Typography } from '@mui/material';

export const Header = () => {
  return (
    <Stack
      py={2}
      pr={1}
      color="gray"
      direction="row"
      justifyContent="space-between"
      borderBottom={1}
      borderColor="lightgray"
    >
      <Typography textAlign="right" fontWeight="bold" width="50%">
        שם
      </Typography>
      <Typography textAlign="right" fontWeight="bold" width="50%">
        מיקום
      </Typography>

      <Typography textAlign="right" fontWeight="bold" width="70%">
        פירוט מיקום
      </Typography>
      <Typography textAlign="right" fontWeight="bold" width="50%">
        סוג הסיב
      </Typography>

      <Stack width="60%">
        <Typography textAlign="center" fontWeight="bold">
          מטרא&apos;ז
        </Typography>
        <Typography textAlign="center" fontWeight="bold" fontSize={10}>
          (down / up)
        </Typography>
      </Stack>
    </Stack>
  );
};
