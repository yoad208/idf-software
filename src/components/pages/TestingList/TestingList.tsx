import { Stack } from '@mui/material';
import { ITestings } from 'interfaces/ITestings.interface';
import { useGovTestings } from '../../../hooks/useGovTestings';
import { GovTestCard } from './govTestCard';

export const TestingList = () => {
  const { govTestings } = useGovTestings();

  return (
    <Stack
      sx={{
        overflow: 'auto',
        overflowY: '-moz-hidden-unscrollable',
        '&::-webkit-scrollbar': { display: 'none' },
        height: '100%',
        maxHeight: '100vh',
        width: '100%',
      }}
    >
      {govTestings.map((govTest: ITestings) => {
        return <GovTestCard govTest={govTest} key={govTest.id} />;
      })}
    </Stack>
  );
};
