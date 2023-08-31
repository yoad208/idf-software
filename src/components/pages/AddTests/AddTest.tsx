import { ChangeEvent, FC, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Box, Button, FormControl, Stack } from '@mui/material';
import { IFiberColors, ITest } from '../../../interfaces/ITestings.interface';
import { IAddTestInterface } from '../../../interfaces/IAddTest.interface';
import { DynamicInput } from '../../utils/dynamicInput/DynamicInput';
import { DynamicInputField } from '../../utils/dynamicInput/DynamicInputField';
import { DynamicInputButton } from '../../utils/dynamicInput/DynamicInputButton';
import { DynamicInputGroup } from '../../utils/dynamicInput/DynamicInputGroup';
import { TestInput } from './TestInput';
import { fiberColors } from './AddTestButtons';
import { testsProvider } from '../../../context/testsProvider';

export const AddTest: FC<IAddTestInterface> = ({
  testDirection,
  activeStep,
}) => {
  const test: ITest = {
    id: '',
    distance: 0,
    landing: 0,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  };
  const [upTestsArray, setUpTestsArray] = useState<IFiberColors>({
    blue: [{ ...test, id: uuidV4() }],
    orange: [{ ...test, id: uuidV4() }],
    green: [{ ...test, id: uuidV4() }],
    brown: [{ ...test, id: uuidV4() }],
    grey: [{ ...test, id: uuidV4() }],
    white: [{ ...test, id: uuidV4() }],
  });
  const [downTestsArray, setDownTestsArray] = useState<IFiberColors>({
    blue: [{ ...test, id: uuidV4() }],
    orange: [{ ...test, id: uuidV4() }],
    green: [{ ...test, id: uuidV4() }],
    brown: [{ ...test, id: uuidV4() }],
    grey: [{ ...test, id: uuidV4() }],
    white: [{ ...test, id: uuidV4() }],
  });
  const { tests, setTests } = useContext(testsProvider);
  const arr =
    testDirection === 'down'
      ? downTestsArray[fiberColors[activeStep || 0].label]
      : upTestsArray[fiberColors[activeStep || 0].label];
  const lastTestIsNotEmpty = () => {
    if (testDirection === 'up') {
      return !(
        upTestsArray[fiberColors[activeStep || 0].label][
          upTestsArray[fiberColors[activeStep || 0].label].length - 1
        ].distance === 0 ||
        upTestsArray[fiberColors[activeStep || 0].label][
          upTestsArray[fiberColors[activeStep || 0].label].length - 1
        ].landing === 0
      );
    }
    return !(
      downTestsArray[fiberColors[activeStep || 0].label][
        downTestsArray[fiberColors[activeStep || 0].label].length - 1
      ].distance === 0 ||
      downTestsArray[fiberColors[activeStep || 0].label][
        downTestsArray[fiberColors[activeStep || 0].label].length - 1
      ].landing === 0
    );
  };

  const addMoreTests = () => {
    if (!lastTestIsNotEmpty()) return;
    if (testDirection === 'up') {
      setUpTestsArray((prev) => ({
        ...prev,
        [fiberColors[activeStep || 0].label]: [
          ...prev[fiberColors[activeStep || 0].label],
          { ...test, id: uuidV4() },
        ],
      }));
    } else {
      setDownTestsArray((prev) => ({
        ...prev,
        [fiberColors[activeStep || 0].label]: [
          ...prev[fiberColors[activeStep || 0].label],
          { ...test, id: uuidV4() },
        ],
      }));
    }
  };

  const updateTest = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    let newTestsArray: ITest[];
    if (testDirection === 'up') {
      newTestsArray = [...upTestsArray[fiberColors[activeStep || 0].label]];
      newTestsArray[index][e.target.name] = Number(e.target.value);
      newTestsArray[index].id = uuidV4();
      setUpTestsArray((prev) => ({
        ...prev,
        [fiberColors[activeStep || 0].label]: newTestsArray,
      }));
    } else {
      newTestsArray = [...downTestsArray[fiberColors[activeStep || 0].label]];
      newTestsArray[index][e.target.name] = Number(e.target.value);
      newTestsArray[index].id = uuidV4();
      setDownTestsArray((prev) => ({
        ...prev,
        [fiberColors[activeStep || 0].label]: newTestsArray,
      }));
    }
  };

  const handleSubmit = () => {
    if (!lastTestIsNotEmpty()) return;
    if (testDirection === 'down') {
      setTests({
        ...tests,
        down: downTestsArray,
      });
    } else {
      setTests({
        ...tests,
        up: upTestsArray,
      });
    }
  };

  return (
    <Box
      sx={{
        p: 1,
        height: '220px',
        maxHeight: '220px',
        overflow: 'auto',
        overflowY: '-moz-hidden-unscrollable',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <DynamicInputGroup>
          <DynamicInput
            direction="row-reverse"
            spacing={2.5}
            alignItems="center"
            arr={arr}
          >
            <DynamicInputField
              direction="row-reverse"
              spacing={5}
              justifyContent="space-evenly"
              alignItems="center"
            >
              <TestInput
                updateTest={updateTest}
                label="מרחק"
                name="distance"
                tests={arr}
              />
              <TestInput
                updateTest={updateTest}
                label="ניחות"
                name="landing"
                tests={arr}
              />
            </DynamicInputField>
          </DynamicInput>
          <DynamicInputButton onClick={addMoreTests} />
        </DynamicInputGroup>

        <FormControl
          fullWidth
          sx={{ cursor: 'pointer', fontSize: 20, mt: 3, maxWidth: '250px' }}
        >
          <Button variant="contained" size="small" onClick={handleSubmit}>
            הוסף
          </Button>
        </FormControl>
      </Stack>
    </Box>
  );
};
