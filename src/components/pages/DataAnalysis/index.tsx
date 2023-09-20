import { Button, Container, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';
import { SelectOptions } from './SelectOptions';
import { useGovTestings } from '../../../hooks/useGovTestings';
import { useGovs } from '../../../hooks/useGovs';
import { IFiberColors } from '../../../interfaces/ITestings.interface';
import { AnalysisBarChart } from './AnalysisBarChart';
import { Toast } from '../../utils/Toast';
import { IToast } from '../../../interfaces/IToast.interface';
import { AnalysisLineChart } from './AnalysisLineChart';
import { AnalysisTableChart } from './AnalysisTableChart';
import { downloadPdf } from '../../../utils/exportToPdf';

export interface IAnalysisData {
  date: Date;
  gov: string;
  testDirection: string;
}

export interface AnalysisData {
  colors: string[];
  testDirection: string;
  fiberLength: number | undefined;
  averageLanding: number[];
  cumulativeLanding: number[];
  fibersEnd: number[];
  results: number[];
}

export const DataAnalysis = () => {
  const { govs } = useGovs();
  const { govTestings } = useGovTestings();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<IToast>({} as IToast);
  const [govTestToAnalysis, setGovTestToAnalysis] = useState<IAnalysisData>({
    date: new Date() as Date,
    gov: '',
    testDirection: '',
  });
  const [analysisData, setAnalysisData] = useState<AnalysisData>(
    {} as AnalysisData
  );

  const capturePdf = document.getElementById('analysisData');

  const findCurrentData = () => {
    if (govTestToAnalysis.testDirection === '' || govTestToAnalysis.gov === '')
      return 'Gov and Direction are required';
    const currGov = govs.find((gov) => {
      return gov.id === govTestToAnalysis.gov;
    });
    const currentTest = govTestings.find((test) => {
      const createdAt = new Date(test.createdAt).toLocaleDateString();
      return (
        createdAt === govTestToAnalysis.date.toLocaleDateString() &&
        test.govId === govTestToAnalysis.gov
      );
    });
    if (!currentTest) return 'No data';
    return {
      fiberLength:
        govTestToAnalysis.testDirection === 'up'
          ? currGov?.fiber_len_UP
          : currGov?.fiber_len_DOWN,
      fiberOTDR:
        govTestToAnalysis.testDirection === 'up'
          ? currentTest.up
          : currentTest.down,
    };
  };

  const handleAnalysisData = () => {
    const averageLanding: number[] = [];
    const cumulativeLanding: number[] = [];
    const lengthArray: number[] = [];
    const lossPlaces: number[] = [];
    let colors: string[] | undefined = [];
    let fiberLength: number | undefined;
    let testDirection: string | undefined = '';
    const obj = findCurrentData();
    if (obj === 'Gov and Direction are required') {
      setToastMessage({
        message: 'חובה למלא את כל השדות',
        severity: 'error',
      });
      setOpenToast(true);
    } else if (obj === 'No data') {
      setToastMessage({
        message: 'אין נתונים לניתוח',
        severity: 'info',
      });
      setOpenToast(true);
    } else {
      fiberLength = Number(obj?.fiberLength);
      testDirection = govTestToAnalysis?.testDirection;
      colors = Array.from(Object.keys(obj?.fiberOTDR));
      Object.entries(obj?.fiberOTDR as IFiberColors).forEach(([, value]) => {
        averageLanding.push(value?.AverageLanding);
        cumulativeLanding.push(value?.CumulativeLanding);
        lengthArray.push(value?.end);
        lossPlaces.push(Math.abs((obj?.fiberLength || 0) - value?.end));
      });
    }

    setAnalysisData({
      colors,
      testDirection,
      fiberLength,
      averageLanding,
      cumulativeLanding,
      fibersEnd: lengthArray,
      results: lossPlaces,
    });
    setGovTestToAnalysis({
      date: new Date(),
      gov: '',
      testDirection: '',
    });
  };

  return (
    <Container>
      <Stack
        direction="row"
        flexWrap="wrap"
        height="100vh"
        maxHeight="100vh"
        gap={1}
        py={1}
      >
        <Paper
          sx={{
            height: '10vh',
            width: '100%',
            bgcolor: 'white',
            p: 1.5,
            maxHeight: '10vh',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            height="100%"
            alignItems="center"
          >
            <SelectOptions
              data={govTestToAnalysis}
              setData={setGovTestToAnalysis}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button variant="contained" onClick={handleAnalysisData}>
                נתח נתונים
              </Button>
              <BsFillFileEarmarkPdfFill
                fontSize={24}
                title="PDF הורד קובץ"
                color="red"
                onClick={() => {
                  if (capturePdf instanceof HTMLElement) {
                    downloadPdf(capturePdf);
                  }
                }}
              />
            </Stack>
          </Stack>
        </Paper>

        <Stack width="100%" height="100%" spacing={1} id="analysisData">
          <Stack
            width="100%"
            maxHeight="60vh"
            height="60vh"
            direction="row"
            justifyContent="space-between"
          >
            <Paper
              sx={{
                height: '100%',
                width: '59.5%',
                bgcolor: 'white',
              }}
            >
              {analysisData?.fibersEnd?.length > 0 &&
              analysisData?.results?.length > 0 ? (
                <AnalysisLineChart data={analysisData} />
              ) : (
                <Typography>לא נמצאו נתונים</Typography>
              )}
            </Paper>
            <Paper
              sx={{
                height: '100%',
                width: '39.5%',
                bgcolor: 'white',
              }}
            >
              {analysisData?.fibersEnd?.length > 0 &&
              analysisData?.results?.length > 0 ? (
                <AnalysisBarChart data={analysisData} />
              ) : (
                <Typography>לא נמצאו נתונים</Typography>
              )}
            </Paper>
          </Stack>
          <Paper
            sx={{
              height: '25vh',
              width: '100%',
              bgcolor: 'white',
              p: 1,
              maxHeight: '25vh',
            }}
          >
            <AnalysisTableChart data={analysisData} />
          </Paper>
        </Stack>
      </Stack>

      <Toast
        open={openToast}
        setOpen={setOpenToast}
        message={toastMessage.message}
        severity={toastMessage.severity}
      />
    </Container>
  );
};

//      <Grid container spacing={2} py={2} maxHeight="90vh" height="90vh">
//         <Grid item xs={7}>
//           <Paper
//             sx={{
//               height: '100%',
//             }}
//           >
//             {analysisData.length > 0 ? (
//               <AnalysisBarChart data={analysisData} />
//             ) : (
//               <Typography>לא נמצאו נתונים</Typography>
//             )}
//           </Paper>
//         </Grid>
//         <Grid item xs={5}>
//           <Paper
//             sx={{
//               height: '100%',
//             }}
//           >
//             {analysisData.length > 0 ? (
//               <AnalysisBarChart data={analysisData} />
//             ) : (
//               <Typography>לא נמצאו נתונים</Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
