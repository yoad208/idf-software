import {
  Box,
  Button,
  ButtonProps,
  Modal,
  Stack,
  Typography,
  Tab,
} from '@mui/material';
import { TabList, TabContext, TabPanel } from '@mui/lab';
import {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import { FaXmark } from 'react-icons/fa6';
import { StepperComponent } from '../../utils/StepperComponent';
import { AddTest } from './AddTest';
import { testsProvider } from '../../../context/testsProvider';
import { IGov } from '../../../interfaces/IGov.interface';
import { useGovs } from '../../../hooks/useGovs';
import { useGovTestings } from '../../../hooks/useGovTestings';

interface AddTestButtonProps extends ButtonProps {
  govId: string;
}

export const fiberColors = [
  {
    id: 1,
    label: 'blue',
    value: 'כחול',
  },
  {
    id: 2,
    label: 'orange',
    value: 'כתום',
  },
  {
    id: 3,
    label: 'green',
    value: 'ירוק',
  },
  {
    id: 4,
    label: 'brown',
    value: 'חום',
  },
  {
    id: 5,
    label: 'grey',
    value: 'אפור',
  },
  {
    id: 6,
    label: 'white',
    value: 'לבן',
  },
];

type TestDirectionProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

/* TODO :
 * extract this components to other file
 */
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

export const AddTestButtons: FC<AddTestButtonProps> = ({ govId, ...rest }) => {
  const { govs } = useGovs();
  const { tests, setTests } = useContext(testsProvider);
  const [open, setOpen] = useState(false);
  const [currGov, setCurrGov] = useState<IGov | null>(null);
  const handelClick = () => {
    const gov: IGov | undefined = govs.find((g) => g.id === govId);
    if (!gov) return;
    setCurrGov(gov);
    setTests({ ...tests, govId });
    setOpen(true);
  };

  return (
    <>
      <Button {...rest} onClick={handelClick}>
        הוסף בדיקה
      </Button>
      <Modal
        open={open}
        sx={{
          minHeight: '50px',
          maxWidth: '800px',
          width: '100%',
          color: 'black',
          border: 'none',
          m: '80px auto',
          position: 'relative',
        }}
      >
        <Box
          bgcolor="white"
          height="100%"
          minHeight="500px"
          borderRadius="10px"
        >
          <Stack
            borderRadius="10px 10px 0 0"
            direction="row-reverse"
            px={1}
            spacing="35%"
            bgcolor="whitesmoke"
            alignItems="center"
            sx={{
              height: '35px',
            }}
          >
            <FaXmark
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => {
                setOpen(false);
              }}
            />
            <Typography textAlign="center" px={1}>
              ({currGov?.gov_name}) הוסף בדיקה לגוב
            </Typography>
            {currGov?.place_description}
          </Stack>
          <TestsDirections setOpen={setOpen} />
        </Box>
      </Modal>
    </>
  );
};
