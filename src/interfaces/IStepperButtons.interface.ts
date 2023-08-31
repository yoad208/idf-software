export interface IStepperButtons {
  activeStep: number;
  handleBack: () => void;
  handleNext: () => void;
  completed: { [p: number]: boolean };
  handleComplete: () => void;
  number: number;
  totalSteps: number;
  steps: any[];
  testsDirection: string;
}
