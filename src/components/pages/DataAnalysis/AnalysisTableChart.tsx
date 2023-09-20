import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@mui/material';
import { FC } from 'react';
import { ChartProps } from './AnalysisBarChart';

export const AnalysisTableChart: FC<ChartProps> = ({ data }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ maxHeight: 10 }}>
          <TableRow>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
              גיד
            </TableCell>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
              כיוון בדיקה
            </TableCell>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
              אורך הסיב
            </TableCell>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
              ניחות ממוצע
            </TableCell>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
              ניחות מצטבר
            </TableCell>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
              סוף קו
            </TableCell>
            <TableCell sx={{ textAlign: 'center', p: 0, fontWeight: 'bold' }}>
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
    </TableContainer>
  );
};
