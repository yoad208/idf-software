import {
  Box,
  Button,
  ButtonProps,
  Modal,
  Stack,
  Typography,
} from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import { FC, useContext, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { testsProvider } from '../../../context/testsProvider';
import { IGov } from '../../../interfaces/IGov.interface';
import { useGovs } from '../../../hooks/useGovs';
import { TestsDirections } from './TestsDirections';

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
  const { govs } = useGovs();
  const { tests, setTests } = useContext(testsProvider);
  const [open, setOpen] = useState(false);
  const [currGov, setCurrGov] = useState<IGov | null>(null);
  const handelClick = () => {
    const gov: IGov | undefined = govs.find((g) => g.id === govId);
    if (!gov) return;
    setCurrGov(gov);
    setTests({ ...tests, id: uuidV4(), govId });
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
          position: 'absolute',
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
