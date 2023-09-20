import {
  Box, Button,
  MenuItem,
  Popper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import { SlCalender } from 'react-icons/sl';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Dispatch, FC, MouseEvent, SetStateAction, useState } from 'react';
import { useGovs } from '../../../hooks/useGovs';
import { IAnalysisData } from './index';

type SelectOptionsProps = {
  data: {
    date: Date;
    gov: string;
    testDirection: string;
  };
  setData: Dispatch<SetStateAction<IAnalysisData>>;
};
export const SelectOptions: FC<SelectOptionsProps> = ({ data, setData }) => {
  const { govs } = useGovs();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Box sx={{ width: '100%' }} maxWidth="550px">
      <Stack direction="row-reverse" spacing={5} alignItems="center">
        <Stack direction="row" width="100%">
          <Button
            size="small"
            onClick={handleClick}
            color="inherit"
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
          >
            <SlCalender fontSize={22} />
          </Button>
        </Stack>
        <Popper
          id={id}
          open={open}
          placement="bottom-end"
          anchorEl={anchorEl}
          sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: 2 }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateCalendar
              value={data.date}
              onChange={(e) => {
                if (e && e instanceof Date) {
                  setData({ ...data, date: new Date(e.toDateString()) });
                }
              }}
            />
          </LocalizationProvider>
        </Popper>
        <Select
          variant="standard"
          color="primary"
          label="בחר גוב"
          fullWidth
          value={data.gov}
          displayEmpty
          onChange={(e: SelectChangeEvent) => {
            setData({ ...data, gov: e.target.value });
          }}
        >
          <MenuItem value="" disabled>
            <Typography width="100%" textAlign="center">
              בחר גוב
            </Typography>
          </MenuItem>
          {govs?.map((gov) => {
            return (
              <MenuItem key={gov.id} value={gov.id}>
                <Typography width="100%" textAlign="center">
                  {gov.place_description}
                </Typography>
              </MenuItem>
            );
          })}
        </Select>
        <Select
          variant="standard"
          color="primary"
          label="בחר כיוון"
          fullWidth
          value={data.testDirection}
          displayEmpty
          onChange={(e: SelectChangeEvent) => {
            setData({ ...data, testDirection: e.target.value });
          }}
        >
          <MenuItem value="" disabled>
            בחר כיוון
          </MenuItem>
          <MenuItem value="down">כיוון ראש חוקר</MenuItem>
          <MenuItem value="up">כיוון סוף קו</MenuItem>
        </Select>
      </Stack>
    </Box>
  );
};
