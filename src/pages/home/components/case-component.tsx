import { Chart, useChart } from '@chakra-ui/charts';
import { Card } from '@chakra-ui/react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const getRandomColor = () =>
  '#' +
  Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');

export const ChartComponent = ({ cse, title }: any) => {
  const chart = useChart({
    data:
      cse?.map((item: any) => ({
        name: item.caseTypeNameAr ?? item.missionTypeName,
        value: item.totalCount,
        color: getRandomColor(),
      })) || [],
  });

  return (
    <Card.Root>
      <Card.Header fontWeight={'semibold'}>{title}</Card.Header>

      <Card.Body>
        <Chart.Root boxSize='200px' chart={chart} mx='auto'>
          <PieChart margin={{ left: 40 }}>
            <Tooltip cursor={false} animationDuration={100} content={<Chart.Tooltip hideLabel />} />
            <Pie
              innerRadius={80}
              outerRadius={100}
              isAnimationActive={false}
              data={chart.data}
              dataKey={chart.key('value')}
              nameKey='name'
              labelLine={{ strokeWidth: 1 }}
              label={{
                fill: chart.color('fg.muted'),
              }}>
              {chart.data.map((item, index) => (
                <Cell key={index} strokeWidth={2} fill={chart.color(item.color)} />
              ))}
            </Pie>
          </PieChart>
        </Chart.Root>
      </Card.Body>

      <Card.Footer></Card.Footer>
    </Card.Root>
  );
};
