import {
  Children,
  cloneElement,
  Dispatch,
  FC,
  isValidElement,
  ReactNode,
  SetStateAction,
  useMemo,
} from 'react';
import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import { StepperButtons } from './StepperButtons';
import { useStepper } from '../../hooks/useStepper';

type TStepperComponent = {
  children: ReactNode;
  steps: any[];
  testsDirection: string;
  setOpen: Dispatch<SetStateAction<string>>;
};

// eslint-disable-next-line import/prefer-default-export
export const StepperComponent: FC<TStepperComponent> = ({
  children,
  steps,
  testsDirection,
  setOpen,
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

  useMemo(() => {
    if (allStepsCompleted()) {
      setOpen('');
    }
  }, [allStepsCompleted, setOpen]);
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
      <div>
        {allStepsCompleted() ? (
          <>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </>
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
          number={completedSteps()}
          totalSteps={totalSteps()}
          steps={steps}
          testsDirection={testsDirection}
        />
      </div>
    </>
  );
};
