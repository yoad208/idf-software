import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { IGov } from '../../../interfaces/IGov.interface';
import { useGovs } from '../../../hooks/useGovs';
import { IToast } from '../../../interfaces/IToast.interface';
import { Toast } from '../../utils/Toast';

const TextFieldStyle = {
  TextField: {
    color: 'lightgray',
  },
  label: {
    color: 'grey',
  },
};

export const NewGov = () => {
  const { createGov } = useGovs();
  const isLargerThen768 = useMediaQuery('(min-width: 768px)');
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<IToast>({} as IToast);
  const [gov, setGov] = useState<IGov>({
    gov_name: '',
    gov_place: '',
    place_description: '',
    location: {
      lat: 0,
      lang: 0,
    },
    fiber_type: '',
    fiber_len_UP: 0,
    fiber_len_DOWN: 0,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createGov(gov);
    setToastMessage({
      message: 'הגוב נוסף בהצלחה',
      severity: 'success',
    });
    setOpenToast(true);
  };

  return (
    <Container>
      <Paper
        sx={{
          p: 2,
          width: '100%',
          maxHeight: '98vh',
          m: '.4rem auto',
          maxWidth: '650px',
          overflow: 'auto',
          overflowY: '-moz-hidden-unscrollable',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        <form onSubmit={handleSubmit} style={{ color: 'grey' }}>
          <FormControl fullWidth>
            <Stack
              direction={isLargerThen768 ? 'row' : 'column'}
              spacing={5}
              justifyContent="center"
            >
              <Stack spacing={1}>
                <Typography fontSize="1.1rem" fontWeight="bolder">
                  פרטי הגוב
                </Typography>
                <FormControl>
                  <FormLabel>שם הגוב</FormLabel>
                  <TextField
                    variant="filled"
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    label="שם הגוב"
                    onChange={(e) =>
                      setGov({ ...gov, gov_name: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>מיקום הגוב</FormLabel>
                  <TextField
                    variant="filled"
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    label="מיקום הגוב (המיקום ברשימה)"
                    onChange={(e) =>
                      setGov({ ...gov, gov_place: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>תיאור המיקום</FormLabel>
                  <TextField
                    variant="filled"
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    label="תיאור המיקום"
                    onChange={(e) =>
                      setGov({ ...gov, place_description: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>סוג הסיב</FormLabel>
                  <TextField
                    variant="filled"
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    label="סוג הסיב"
                    onChange={(e) =>
                      setGov({ ...gov, fiber_type: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>(UP) מספר הסיב</FormLabel>
                  <TextField
                    variant="filled"
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    label={"מטרא'ז הסיב"}
                    onChange={(e) =>
                      setGov({ ...gov, fiber_len_UP: Number(e.target.value) })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>(DOWN) מטרא&apos;ז הסיב</FormLabel>
                  <TextField
                    variant="filled"
                    fullWidth
                    sx={TextFieldStyle}
                    size="small"
                    label={"מטרא'ז הסיב"}
                    onChange={(e) =>
                      setGov({ ...gov, fiber_len_DOWN: Number(e.target.value) })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>מיקום נ.צ</FormLabel>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      variant="filled"
                      sx={TextFieldStyle}
                      size="small"
                      label="Latitude"
                      fullWidth
                      onChange={(e) => {
                        setGov({
                          ...gov,
                          location: {
                            ...gov.location,
                            lat: Number(e.target.value),
                            lang: gov.location.lang,
                          },
                        });
                      }}
                    />
                    <TextField
                      variant="filled"
                      sx={TextFieldStyle}
                      size="small"
                      label="Longitude"
                      fullWidth
                      onChange={(e) => {
                        setGov({
                          ...gov,
                          location: {
                            ...gov.location,
                            lang: Number(e.target.value),
                            lat: gov.location.lat,
                          },
                        });
                      }}
                    />
                  </Stack>
                </FormControl>
              </Stack>
            </Stack>

            <Button
              sx={{
                width: '100%',
                maxWidth: '450px',
                mt: '1rem',
                placeSelf: 'center',
              }}
              type="submit"
              variant="contained"
            >
              בצע פעולה
            </Button>
          </FormControl>
        </form>
        <Toast
          open={openToast}
          setOpen={setOpenToast}
          message={toastMessage.message}
          severity={toastMessage.severity}
        />
      </Paper>
    </Container>
  );
};
