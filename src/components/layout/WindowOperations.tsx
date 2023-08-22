import { Button, Stack } from '@mui/material';
import { FaMinus, FaWindowMaximize, FaWindowRestore } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

const remote = require('@electron/remote');

const WindowOperations = () => {
  const minimizeWindow = () => {
    return remote.getCurrentWindow().minimize();
  };

  const closeWindow = () => {
    return remote.getCurrentWindow().close();
  };

  const isMaximize = () => {
    if (remote.getCurrentWindow().isMaximized()) {
      return remote.getCurrentWindow().restore();
    }
    return remote.getCurrentWindow().maximize();
  };

  return (
    <Stack direction="row" height="100%" id="operations">
      <Button
        sx={{
          '&:hover': { backgroundColor: '#e31212' },
          minWidth: '40px',
          borderRadius: 0,
        }}
        size="small"
        color="inherit"
        title="close"
        onClick={closeWindow}
      >
        <FaXmark width={12} />
      </Button>
      <Button
        sx={{ borderRadius: 0, minWidth: '40px' }}
        size="small"
        color="inherit"
        title="maximize"
        onClick={isMaximize}
      >
        {remote.getCurrentWindow().isMaximized() ? (
          <FaWindowMaximize width={12} />
        ) : (
          <FaWindowRestore width={12} />
        )}
      </Button>
      <Button
        sx={{ borderRadius: 0, minWidth: '40px' }}
        size="small"
        color="inherit"
        title="minimize"
        onClick={minimizeWindow}
      >
        <FaMinus width={12} />
      </Button>
    </Stack>
  );
};

export default WindowOperations;
