import {
  Box,
  Button,
  ButtonProps,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { FC, useContext, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { StepperComponent } from '../../utils/StepperComponent';
import { AddTest } from './AddTest';
import { testsProvider } from '../../../context/testsProvider';

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

export const AddTestButtons: FC<AddTestButtonProps> = ({ govId, ...rest }) => {
  const [open, setOpen] = useState('');
  const { tests, setTests } = useContext(testsProvider);
  const handelClick = (testDirection: string) => {
    setTests({ ...tests, govId });
    setOpen(testDirection);
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-evenly">
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Button {...rest} onClick={() => handelClick('up')}>
          הוסף בדיקה (UP)
        </Button>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Button {...rest} onClick={() => handelClick('down')}>
          הוסף בדיקה (DOWN)
        </Button>
      </Stack>
      <Modal
        open={open !== ''}
        sx={{
          minHeight: '50px',
          maxWidth: '800px',
          width: '100%',
          color: 'black',
          border: 'none',
          m: '125px auto',
        }}
      >
        <Box bgcolor="white" height="100%" borderRadius="10px">
          <Stack
            borderRadius="10px 10px 0 0"
            direction="row-reverse"
            px={1}
            spacing="40%"
            bgcolor="whitesmoke"
            alignItems="center"
            sx={{
              height: '35px',
            }}
          >
            <FaXmark
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => {
                setOpen('');
              }}
            />
            <Typography textAlign="center">({open}) הוסף בדיקה </Typography>
          </Stack>
          <StepperComponent testsDirection={open} steps={fiberColors}>
            <AddTest testDirection={open} />
          </StepperComponent>
        </Box>
      </Modal>
    </>
  );
};
