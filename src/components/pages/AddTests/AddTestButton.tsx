import {
  Box,
  Button,
  ButtonProps,
  FormControl,
  FormLabel,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { AiOutlinePlus } from 'react-icons/ai';

interface AddTestButtonProps extends ButtonProps {
  govId: string;
}

export const AddTestButton: FC<AddTestButtonProps> = ({ govId, ...rest }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...rest} onClick={() => setOpen(true)} children="הוסף בדיקה" />
      <Modal
        open={open}
        sx={{
          minHeight: '150px',
          maxWidth: '500px',
          width: '100%',
          color: 'black',
          border: 'none',
          m: '150px auto',
        }}
      >
        <Stack spacing={2} bgcolor="white" height="100%" borderRadius="10px">
          <Stack
            borderRadius="10px 10px 0 0"
            direction="row-reverse"
            spacing="40%"
            bgcolor="whitesmoke"
            alignItems="center"
          >
            <FaXmark
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => setOpen(false)}
            />
            <Typography textAlign="center">הוסף בדיקה</Typography>
          </Stack>
          <Box>
            <Typography textAlign="center">UP</Typography>
            <Stack
              direction="row-reverse"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <FormControl>
                <FormLabel>מרחק</FormLabel>
                <TextField size="small" variant="filled" label="מרחק" />
              </FormControl>
              <FormControl>
                <FormLabel>ניחות</FormLabel>
                <TextField size="small" variant="filled" label="ניחות" />
              </FormControl>
              <FormControl sx={{ cursor: 'pointer', fontSize: 20, mt: 3 }}>
                <AiOutlinePlus />
              </FormControl>
            </Stack>
          </Box>
          <Box>
            <Typography textAlign="center">DOWN</Typography>
            <Stack
              direction="row-reverse"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <FormControl>
                <FormLabel>מרחק</FormLabel>
                <TextField size="small" variant="filled" label="מרחק" />
              </FormControl>
              <FormControl>
                <FormLabel>ניחות</FormLabel>
                <TextField size="small" variant="filled" label="ניחות" />
              </FormControl>
              <FormControl sx={{ cursor: 'pointer', fontSize: 20, mt: 3 }}>
                <AiOutlinePlus />
              </FormControl>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};
