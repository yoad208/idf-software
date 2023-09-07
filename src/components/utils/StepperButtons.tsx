import { FC } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { IStepperButtons } from '../../interfaces/IStepperButtons.interface';

export const StepperButtons: FC<IStepperButtons> = ({
  activeStep,
  completed,
  number,
  handleBack,
  handleComplete,
  allStepsCompleted,
  totalSteps,
  steps,
}) => {
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
          <Button variant="contained" onClick={handleComplete}>
            {number === totalSteps - 1 ? 'סיום' : 'הבא'}
          </Button>
        )}
      </Stack>
    </Box>
  );
};
