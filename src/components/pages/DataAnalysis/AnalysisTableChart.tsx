import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { ChartProps } from './AnalysisBarChart';
import { DataNotFound } from '../../utils/DataNotFound';
import { useGovs } from '../../../hooks/useGovs';

export const AnalysisTableChart: FC<ChartProps> = ({ data }) => {
  const { govs } = useGovs();
  const currGov = govs?.find((gov) => {
    return gov.id === data?.gov;
  });
  console.log(currGov);
  return (
    <TableContainer>
      {data?.fibersEnd?.length > 0 && data?.results?.length > 0 ? (
        <>
          <Stack direction="row-reverse" spacing={2} px={2}>
            <Stack direction="row-reverse" spacing={1}>
              <Typography color="grey">:שם הגוב</Typography>
              <Typography fontWeight="bold">{currGov?.gov_name}</Typography>
            </Stack>
            <Stack direction="row-reverse" spacing={1}>
              <Typography color="grey">:מיקום הגוב</Typography>
              <Typography fontWeight="bold">{currGov?.place_description}</Typography>
            </Stack>
          </Stack>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ maxHeight: 10 }}>
              <TableRow>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  גיד
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  כיוון בדיקה
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  אורך הסיב
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  ניחות ממוצע
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  ניחות מצטבר
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  סוף קו
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}
                >
                  תוצאה
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ p: 0, fontWeight: 'bold' }} align="center">
                    {data?.colors?.[index]}
                  </TableCell>
                  <TableCell sx={{ p: 0, color: 'grey' }} align="center">
                    {data?.testDirection}
                  </TableCell>
                  <TableCell sx={{ p: 0, color: 'grey' }} align="center">
                    {data?.fiberLength}
                  </TableCell>
                  <TableCell sx={{ p: 0, color: 'grey' }} align="center">
                    {data?.averageLanding?.[index]}
                  </TableCell>
                  <TableCell sx={{ p: 0, color: 'grey' }} align="center">
                    {data?.cumulativeLanding?.[index]}
                  </TableCell>
                  <TableCell sx={{ p: 0, color: 'grey' }} align="center">
                    {data?.fibersEnd?.[index]}
                  </TableCell>
                  <TableCell sx={{ p: 0, color: 'red' }} align="center">
                    {data?.results?.[index]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <DataNotFound />
      )}
    </TableContainer>
  );
};
