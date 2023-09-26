import {
  Box,
  Button,
  Modal,
  Paper,
  Popper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FaXmark } from 'react-icons/fa6';
import { Dispatch, FC, SetStateAction, useState, MouseEvent } from 'react';
import { IOtdr, ITest } from '../../../interfaces/ITestings.interface';

interface IModalProps {
  open: 'up' | 'down' | '';
  setOpen: Dispatch<SetStateAction<'up' | 'down' | ''>>;
  govTest: ITest;
}
interface IOtdrList {
  otdr: IOtdr[];
}

const tableCellStyles = {
  fontWeight: 'bold',
  fontSize: 15,
  color: 'whitesmoke',
};

const OtdrList: FC<IOtdrList> = ({ otdr }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <>
      <Button size="small" onClick={handleClick}>
        OTDR
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        sx={{
          minWidth: 200,
          zIndex: 9999,
          borderRadius: 3,
          bgcolor: 'white',
          boxShadow: 4,
        }}
      >
        <TableContainer
          sx={{
            borderRadius: 3,
            maxHeight: 280,
            overflow: 'auto',
            overflowY: '-moz-hidden-unscrollable',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          <Table aria-label="sicky table">
            <TableHead>
              <TableRow sx={{ bgcolor: '#f3f3f3' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold', p: 1 }}>
                  מרחק
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', p: 1 }}>
                  ניחות
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {otdr?.map((o, i) => (
                <TableRow key={i}>
                  <TableCell align="center">{o?.distance}</TableCell>
                  <TableCell align="center">{o?.landing}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Popper>
    </>
  );
};
const TestingsTable = ({ data }: { data: ITest }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#263841' }}>
            <TableCell align="center" sx={tableCellStyles}>
              מספר גיד
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>
              גיד
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>
              בדיקות
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>
              ניחות ממוצע
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>
              ניחות מצטבר
            </TableCell>
            <TableCell align="center" sx={tableCellStyles}>
              סוף קו
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data)
            .sort(
              ([, valueA], [, valueB]) =>
                valueA?.FiberNumber - valueB?.FiberNumber
            )
            .map(([name, value], index) => (
              <TableRow
                key={name}
                sx={{ bgcolor: index % 2 ? 'whitesmoke' : 'white' }}
              >
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 'bold', fontSize: 15 }}
                >
                  {value?.FiberNumber}
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  sx={{ fontWeight: 'bold', fontSize: 15 }}
                >
                  {name}
                </TableCell>
                <TableCell align="center">
                  <OtdrList otdr={value?.OTDR} />
                </TableCell>
                <TableCell align="center">{value?.AverageLanding}</TableCell>
                <TableCell align="center">{value?.CumulativeLanding}</TableCell>
                <TableCell align="center">{value?.end}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Testings: FC<IModalProps> = ({ open, setOpen, govTest }) => {
  return (
    <Modal
      open={open !== ''}
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
      <Box bgcolor="white" borderRadius="10px">
        <Stack
          borderRadius="10px 10px 0 0"
          direction="row-reverse"
          px={1}
          spacing="35%"
          bgcolor="whitesmoke"
          alignItems="center"
        >
          <FaXmark
            style={{ float: 'right', cursor: 'pointer' }}
            onClick={() => setOpen('')}
          />
          <Typography textAlign="center" px={1}>
            כל הבדיקות ל{open === 'up' ? 'כיוון סוף קו' : 'כיוון ראש חוקר'}
          </Typography>
        </Stack>
        <Paper sx={{ p: 2 }}>
          <TestingsTable data={govTest} />
        </Paper>
      </Box>
    </Modal>
  );
};
