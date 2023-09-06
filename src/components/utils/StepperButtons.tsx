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
  allStepsCompleted,
  totalSteps,
  steps,
  testDirection,
}) => {
  const { tests } = useContext(testsProvider);
  const currentFiberColor =
    tests[testDirection][fiberColors[activeStep]?.label]?.OTDR;
  const completedSteps = () => {
    if (
      currentFiberColor.length === 0 ||
      currentFiberColor[0].distance === 0 ||
      currentFiberColor[0].landing === 0
    ) {
      window.alert('You need to add at least one test for this tube color');
    } else {
      handleComplete();
    }
  };
  return (
    <Box mt={2.5} sx={{ display: 'flex', flexDirection: 'row', p: 2 }}>
      {!allStepsCompleted() && (
        <Button
          variant="outlined"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          הקודם
        </Button>
      )}
      <Stack direction="row" spacing={2} alignItems="center">
        {activeStep !== steps?.length && completed[activeStep] && (
          <Typography color="green">הושלם</Typography>
        )}
        {!allStepsCompleted() && (
          <Button variant="contained" onClick={completedSteps}>
            {number === totalSteps - 1 ? 'סיום' : 'הבא'}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
