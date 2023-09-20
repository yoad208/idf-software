import { Chart } from 'react-google-charts';
import { FC, useMemo, useState } from 'react';
import { AnalysisData } from './index';

export type ChartProps = {
  data: AnalysisData;
};
export const options = {
  chartArea: { width: '70%' },
  legend: { position: 'top' },
  hAxis: {
    title: 'Km',
    minValue: 0,
  },
  colors: ['#1266e3', '#e89292'],
};

export const AnalysisBarChart: FC<ChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<Array<(string | number)[]>>([]);

  useMemo(() => {
    setChartData([['color', 'length', 'loss']]);
    data?.colors.map((color, i) => {
      return setChartData((prev) => [
        ...prev,
        [color, data?.fibersEnd[i], data?.results[i]],
      ]);
    });
  }, [data]);

  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="inherit"
      data={chartData}
      options={options}
    />
  );
};
