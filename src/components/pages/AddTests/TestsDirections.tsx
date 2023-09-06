import {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Tab } from '@mui/material';
import { testsProvider } from '../../../context/testsProvider';
import { useGovTestings } from '../../../hooks/useGovTestings';
import { StepperComponent } from '../../utils/StepperComponent';
import { AddTest } from './AddTest';
import { fiberColors } from './AddTestButtons';

type TestDirectionProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const TestsDirections: FC<TestDirectionProps> = ({ setOpen }) => {
  const { tests, upTestComplete, downTestComplete } = useContext(testsProvider);
  const [value, setValue] = useState('1');
  const { createTestings } = useGovTestings();

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleSubmit = async () => {
    if (!upTestComplete && !downTestComplete) {
      window.alert('לא ביצעת בדיקה לכיוון ראש חוקר ולא לכיוון סוף קו');
      return;
    }
    if (upTestComplete && !downTestComplete) {
      if (window.confirm('להמשיך בלי לבדוק לכיוון הראש חוקר?')) {
        createTestings(tests);
        setOpen(false);
      }
    } else if (!upTestComplete && downTestComplete) {
      if (window.confirm('להמשיך בלי לבדוק לכיוון סוף הקו?')) {
        createTestings(tests);
        setOpen(false);
      }
    } else {
      createTestings(tests);
      setOpen(false);
    }
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="לכיוון ראש חוקר" value="1" />
            <Tab label="לכיוון סוף קו" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <StepperComponent testDirection="down" steps={fiberColors}>
            <AddTest testDirection="down" />
          </StepperComponent>
        </TabPanel>
        <TabPanel value="2">
          <StepperComponent testDirection="up" steps={fiberColors}>
            <AddTest testDirection="up" />
          </StepperComponent>
        </TabPanel>
      </TabContext>

      <Button
        variant="contained"
        sx={{ position: 'absolute', bottom: 40, right: 40 }}
        onClick={handleSubmit}
      >
        סיום
      </Button>
    </>
  );
};
