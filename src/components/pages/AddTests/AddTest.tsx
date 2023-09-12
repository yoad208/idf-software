import { ChangeEvent, FC, useContext, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Box, Button, FormControl, Stack, TextField } from '@mui/material';
import { IFiberColors, IOtdr } from '../../../interfaces/ITestings.interface';
import { IAddTestInterface } from '../../../interfaces/IAddTest.interface';
import { DynamicInput } from '../../utils/dynamicInput/DynamicInput';
import { DynamicInputField } from '../../utils/dynamicInput/DynamicInputField';
import { DynamicInputButton } from '../../utils/dynamicInput/DynamicInputButton';
import { DynamicInputGroup } from '../../utils/dynamicInput/DynamicInputGroup';
import { TestInput } from './TestInput';
import { fiberColors } from './AddTestButtons';
import { testsProvider } from '../../../context/testsProvider';
import { Toast } from '../../utils/Toast';
import { IToast } from '../../../interfaces/IToast.interface';

export const AddTest: FC<IAddTestInterface> = ({
  activeStep,
  testDirection,
}) => {
  const test: IOtdr = {
    id: '',
    distance: 0,
    landing: 0,
  };
  const [testsArray, setTestsArray] = useState<IFiberColors>(
    {} as IFiberColors
  );
  const [openToast, setOpenToast] = useState<boolean>(false);
  const { tests, setTests } = useContext(testsProvider);
  const arr = testsArray[fiberColors[activeStep || 0].label]?.OTDR;
  const [toastMessage, setToastMessage] = useState<IToast>({} as IToast);

  const lastTestIsNotEmpty = () => {
    if (!testsArray[fiberColors[activeStep || 0].label]?.OTDR) {
      return true;
    }
    return !(
      testsArray[fiberColors[activeStep || 0].label]?.OTDR[
        testsArray[fiberColors[activeStep || 0].label]?.OTDR.length - 1
      ].distance === 0 ||
      testsArray[fiberColors[activeStep || 0].label]?.OTDR[
        testsArray[fiberColors[activeStep || 0].label]?.OTDR.length - 1
      ].landing === 0
    );
  };

  const addMoreTests = () => {
    if (!lastTestIsNotEmpty()) {
      setToastMessage({
        message: 'לא נבחרו בדיקות',
        severity: 'error',
      });
      setOpenToast(true);
      return;
    }
    setTestsArray((prev) => {
      if (!prev[fiberColors[activeStep || 0].label]?.OTDR) {
        return {
          ...prev,
          [fiberColors[activeStep || 0].label]: {
            ...prev[fiberColors[activeStep || 0].label],
            OTDR: [{ ...test, id: uuidV4() }],
          },
        };
      }
      return {
        ...prev,
        [fiberColors[activeStep || 0].label]: {
          ...prev[fiberColors[activeStep || 0].label],
          OTDR: [
            ...prev[fiberColors[activeStep || 0].label]?.OTDR,
            { ...test, id: uuidV4() },
          ],
        },
      };
    });
  };

  const updateTest = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number
  ) => {
    const newTestsArray: IOtdr[] = [
      ...testsArray[fiberColors[activeStep || 0].label]?.OTDR,
    ];
    newTestsArray[index][e.target.name] = Number(e.target.value);
    newTestsArray[index].id = uuidV4();
    setTestsArray((prev) => ({
      ...prev,
      [fiberColors[activeStep || 0].label]: {
        ...prev[fiberColors[activeStep || 0].label],
        OTDR: newTestsArray,
      },
    }));
  };

  const handleSubmit = () => {
    if (!lastTestIsNotEmpty()) {
      setToastMessage({
        message: 'לא נבחרו בדיקות',
        severity: 'error',
      });
      setOpenToast(true);
      return;
    }
    setTests({
      ...tests,
      [`${testDirection}`]: testsArray,
    });
    setToastMessage({
      message: 'הבדיקה הוספה בהצלחה',
      severity: 'success',
    });
    setOpenToast(true);
  };

  return (
    <Box
      sx={{
        p: 1.5,
        height: '35vh',
        maxHeight: '35vh',
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
          {arr?.length > 0 ? (
            <DynamicInputButton onClick={addMoreTests} />
          ) : (
            <Button variant="outlined" onClick={addMoreTests}>
              OTDR הוסף
            </Button>
          )}
        </DynamicInputGroup>
        <Stack
          direction="row"
          spacing={2}
          py={2}
          pr={3.5}
          flexWrap="wrap"
          justifyContent="center"
        >
          <TextField
            sx={{ width: '20%' }}
            type="number"
            size="small"
            variant="filled"
            label="ניחות מצטבר"
            value={
              testsArray[fiberColors[activeStep || 0].label]
                ?.CumulativeLanding || 0
            }
            onChange={(e) =>
              setTestsArray((prev) => ({
                ...prev,
                [fiberColors[activeStep || 0].label]: {
                  ...prev[fiberColors[activeStep || 0].label],
                  CumulativeLanding: Number(e.target.value),
                },
              }))
            }
          />
          <TextField
            sx={{ width: '20%' }}
            type="number"
            size="small"
            variant="filled"
            label="ניחות ממוצע"
            value={
              testsArray[fiberColors[activeStep || 0].label]?.AverageLanding ||
              0
            }
            onChange={(e) =>
              setTestsArray((prev) => ({
                ...prev,
                [fiberColors[activeStep || 0].label]: {
                  ...prev[fiberColors[activeStep || 0].label],
                  AverageLanding: Number(e.target.value),
                },
              }))
            }
          />
          <TextField
            sx={{ width: '20%' }}
            type="number"
            size="small"
            variant="filled"
            label="סוף קו"
            value={testsArray[fiberColors[activeStep || 0].label]?.end || 0}
            onChange={(e) =>
              setTestsArray((prev) => ({
                ...prev,
                [fiberColors[activeStep || 0].label]: {
                  ...prev[fiberColors[activeStep || 0].label],
                  end: Number(e.target.value),
                },
              }))
            }
          />
        </Stack>
        <FormControl
          fullWidth
          sx={{ cursor: 'pointer', fontSize: 20, mt: 3, maxWidth: '250px' }}
        >
          <Button variant="contained" size="small" onClick={handleSubmit}>
            הוסף
          </Button>
        </FormControl>
      </Stack>
      <Toast
        open={openToast}
        setOpen={setOpenToast}
        message={toastMessage.message}
        severity={toastMessage.severity}
      />
    </Box>
  );
};
