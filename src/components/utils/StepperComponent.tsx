import { Children, cloneElement, FC, isValidElement, ReactNode } from 'react';
import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { BsPatchCheckFill } from 'react-icons/bs';
import { StepperButtons } from './StepperButtons';
import { useStepper } from '../../hooks/useStepper';

type TStepperComponent = {
  children: ReactNode;
  steps: any[];
  testDirection: string;
};

export const StepperComponent: FC<TStepperComponent> = ({
  children,
  steps,
  testDirection,
}) => {
  const {
    handleNext,
    handleBack,
    handleComplete,
    allStepsCompleted,
    completedSteps,
    totalSteps,
    completed,
    activeStep,
  } = useStepper(steps);

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps?.map((label) => (
          <Step key={label.id}>
            <StepLabel
              sx={{
                span: {
                  textAlign: 'center',
                },
              }}
            >
              {label.value}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>
        {allStepsCompleted() ? (
          <Stack alignItems="center" direction="column" spacing={2} p={8}>
            <BsPatchCheckFill fontSize="25px" style={{ color: 'green' }} />
            <Typography
              sx={{ width: '100%', textAlign: 'center', color: 'green' }}
            >
              כיוון הבדיקה הושלם
            </Typography>
          </Stack>
        ) : (
          <>
            {Children.map(children, (child) => {
              return (
                isValidElement(child) &&
                cloneElement(child, {
                  ...child.props,
                  activeStep,
                })
              );
            })}
          </>
        )}
        <StepperButtons
          activeStep={activeStep}
          handleBack={handleBack}
          handleNext={handleNext}
          completed={completed}
          handleComplete={handleComplete}
          allStepsCompleted={allStepsCompleted}
          number={completedSteps()}
          totalSteps={totalSteps()}
          steps={steps}
          testDirection={testDirection}
        />
      </Box>
    </>
  );
};
