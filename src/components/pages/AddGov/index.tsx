import {
  Button,
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

const TextFieldStyle = {
  TextField: {
    color: 'lightgray',
  },
  label: {
    color: 'grey',
  },
};

// eslint-disable-next-line import/prefer-default-export
export const NewGov = () => {
  const { createGov } = useGovs();
  const isLargerThen768 = useMediaQuery('(min-width: 768px)');
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
    end_line_UP: 0,
    end_line_DOWN: 0,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createGov(gov);
  };

  return (
    <Paper
      sx={{
        p: 2,
        width: '100%',
        maxHeight: '95%',
        m: '.8rem auto',
        maxWidth: '600px',
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
              <Typography fontSize="1.2rem" fontWeight="bolder">
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
                  onChange={(e) => setGov({ ...gov, gov_name: e.target.value })}
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
                <FormLabel>(DOWN) מטרא'ז הסיב</FormLabel>
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
                <FormLabel>(UP) סןף קו</FormLabel>
                <TextField
                  variant="filled"
                  fullWidth
                  sx={TextFieldStyle}
                  size="small"
                  label="סוף קו (UP)"
                  onChange={(e) =>
                    setGov({ ...gov, end_line_UP: Number(e.target.value) })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>(DOWN) סוף קו</FormLabel>
                <TextField
                  variant="filled"
                  fullWidth
                  sx={TextFieldStyle}
                  size="small"
                  label="סוף קו (DOWN)"
                  onChange={(e) =>
                    setGov({ ...gov, end_line_DOWN: Number(e.target.value) })
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
                          ...location,
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
                          ...location,
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
    </Paper>
  );
};

//     <Stack spacing={1}>
//                         <Typography fontSize={"1.2rem"} fontWeight={"bolder"}>
//                             תוצאות הבדיקות
//                         </Typography>
//                         <FormControl>
//                             <FormLabel>
//                                 כחול
//                             </FormLabel>
//                             <Stack direction={"row"} spacing={1}>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"מרחק"}/>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"ניחות"}/>
//                             </Stack>
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>
//                                 כתום
//                             </FormLabel>
//                             <Stack direction={"row"} spacing={1}>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"מרחק"}/>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"ניחות"}/>
//                             </Stack>
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>
//                                 ירוק
//                             </FormLabel>
//                             <Stack direction={"row"} spacing={1}>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"מרחק"}/>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"ניחות"}/>
//                             </Stack>
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>
//                                 חום
//                             </FormLabel>
//                             <Stack direction={"row"} spacing={1}>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"מרחק"}/>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"ניחות"}/>
//                             </Stack>
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>
//                                 אפור
//                             </FormLabel>
//                             <Stack direction={"row"} spacing={1}>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"מרחק"}/>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"ניחות"}/>
//                             </Stack>
//                         </FormControl>
//                         <FormControl>
//                             <FormLabel>
//                                 לבן
//                             </FormLabel>
//                             <Stack direction={"row"} spacing={1}>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"מרחק"}/>
//                                 <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"ניחות"}/>
//                             </Stack>
//                         </FormControl>
//
//                         <FormControl>
//                             <FormLabel>
//                                 סוף הקטע
//                             </FormLabel>
//                             <TextField variant={"filled"} sx={TextFieldStyle} size={"small"} label={"סוף הקטע"}/>
//                         </FormControl>
//                     </Stack>
