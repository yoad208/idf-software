import { FC } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IGov } from '../../../interfaces/IGov.interface';

type CustomPopupContentProps = {
  gov: IGov;
};

const CustomPopupContent: FC<CustomPopupContentProps> = ({ gov }) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack spacing={2} alignItems="center" justifyContent="center" p={1}>
        <Typography color="primary.light" fontWeight="bold">
          {gov.gov_name}
        </Typography>
        <Typography>{gov.place_description}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" p={1} mb={2}>
        <Typography dir="ltr" fontSize={12}>
          Lat:{gov.location.lat}
        </Typography>
        <Typography dir="ltr" fontSize={12}>
          Long:{gov.location.lang}
        </Typography>
      </Stack>
      <Button
        fullWidth
        variant="contained"
        onClick={() => navigate(`all-testing?q=${gov.id}`)}
      >
        פתח בדיקות
      </Button>
    </>
  );
};

export default CustomPopupContent;
