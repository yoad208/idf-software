import { FC, useState } from 'react';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { ITestings } from '../../../interfaces/ITestings.interface';
import { useGovs } from '../../../hooks/useGovs';
import { Testings } from './Testings';

type GovTestCardProps = {
  govTest: ITestings;
};

export const GovTestCard: FC<GovTestCardProps> = ({ govTest }) => {
  const [open, setOpen] = useState<'up' | 'down' | ''>('');
  const createdAt = new Date(govTest.createdAt).toLocaleString();
  const { govId } = govTest;
  const { govs } = useGovs();

  const gov = govs.find((g) => g.id === govId);

  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction="row-reverse"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography>{gov?.gov_name}</Typography>
        <Typography>{gov?.place_description}</Typography>
        <Typography>{createdAt}</Typography>
      </Stack>
      <hr />
      <Stack direction="row" spacing={2.5}>
        <Button variant="outlined" onClick={() => setOpen('down')}>
          כיוון ראש חוקר
        </Button>
        <Button variant="contained" onClick={() => setOpen('up')}>
          כיוון סוף קו
        </Button>
      </Stack>
      <Testings open={open} setOpen={setOpen} govTest={govTest[open]} />
    </Paper>
  );
};
