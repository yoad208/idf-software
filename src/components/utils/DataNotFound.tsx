import { Stack, Typography } from '@mui/material';
import img from '../../../assets/no-data-img.png';

export const DataNotFound = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%">
      <Typography fontWeight="bold" color="grey" letterSpacing={1}>
        לא נמצאו נתונים
      </Typography>
      <Stack justifyContent="center" alignItems="center" maxWidth="100px">
        <img src={img} alt="img" width="100%" className="no-data" />
      </Stack>
      <Typography fontSize={12} color="grey" letterSpacing={1}>
        בחר גוב, כיוון ותאריך ונסה שוב
      </Typography>
    </Stack>
  );
};
