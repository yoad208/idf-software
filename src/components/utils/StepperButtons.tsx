import { FC, useContext } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { IStepperButtons } from '../../interfaces/IStepperButtons.interface';
import { testsProvider } from '../../context/testsProvider';
import { fiberColors } from '../pages/AddTests/AddTestButtons';

export const StepperButtons: FC<IStepperButtons> = ({
  activeStep,
  completed,
  number,
  handleBack,
  handleComplete,
  totalSteps,
  steps,
  testsDirection,
}) => {
  const { tests } = useContext(testsProvider);
  const completedSteps = () => {
    if (tests[testsDirection][fiberColors[activeStep].label].length === 0) {
      console.error('You need to add at least one test for this tube color');
    } else {
      console.log(tests);
      handleComplete();
    }
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        הקודם
      </Button>
      <Box sx={{ flex: '1 1 auto' }} />
      <Stack direction="row" spacing={2} alignItems="center">
        {activeStep !== steps?.length && completed[activeStep] && (
          <Typography color="green">הושלם</Typography>
        )}
        <Button variant="contained" onClick={completedSteps}>
          {number === totalSteps - 1 ? 'סיום' : 'הבא'}
        </Button>
      </Stack>
    </Box>
  );
};
