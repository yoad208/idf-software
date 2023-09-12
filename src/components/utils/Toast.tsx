import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';
import { ComponentType, Dispatch, FC, SetStateAction } from 'react';

type ToastProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
};
export const Toast: FC<ToastProps> = ({ open, setOpen, message, severity }) => {
  type TransitionProps = Omit<SlideProps, 'direction'>;
  function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="right" />;
  }

  const transition: ComponentType<TransitionProps> | undefined = TransitionLeft;

  const handelClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3500}
      onClose={handelClose}
      TransitionComponent={transition}
    >
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
