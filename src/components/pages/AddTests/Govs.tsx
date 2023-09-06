import { Box, Stack, Typography } from '@mui/material';
import { IGov } from '../../../interfaces/IGov.interface';
import { Header } from './Header';
import { AddTestButtons } from './AddTestButtons';
import { useGovs } from '../../../hooks/useGovs';
import { TestProvider } from '../../../context/testsProvider';

export const Govs = () => {
  const { govs } = useGovs();

  return (
    <TestProvider>
      <Stack
        dir="rtl"
        spacing={2}
        m={2}
        p={1}
        bgcolor="whitesmoke"
        sx={{
          maxHeight: '95%',
          overflow: 'auto',
          overflowY: '-moz-hidden-unscrollable',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <Header />
        {govs.map((gov: IGov) => {
          return (
            <Box key={gov?.id} borderBottom={1} borderColor="lightgray">
              <Stack
                pr={1}
                py={2}
                color="gray"
                direction="row"
                justifyContent="space-between"
              >
                <Typography textAlign="right" fontSize={14} width="50%">
                  {gov.gov_name}
                </Typography>
                <Typography textAlign="right" fontSize={14} width="50%">
                  {gov.gov_place}
                </Typography>

                <Typography textAlign="right" width="70%">
                  {gov.place_description}
                </Typography>
                <Typography textAlign="right" width="50%">
                  {gov.fiber_type !== '' ? gov.fiber_type : '---'}
                </Typography>

                <Typography textAlign="center" fontSize={14} width="60%">
                  {gov.fiber_len_UP} / {gov.fiber_len_DOWN}
                </Typography>
              </Stack>
              <AddTestButtons
                fullWidth
                size="small"
                variant="outlined"
                govId={gov.id || ''}
              />
            </Box>
          );
        })}
      </Stack>
    </TestProvider>
  );
};
