'use client';

import * as React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';

type Props = {
  value: number; // expected in range 0–5
};

const GaugeChart: React.FC<Props> = ({ value }) => {
  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <Gauge
        value={value}
        valueMax={5}
        startAngle={-110}
        endAngle={110}
        text={({ value }) => `${value.toFixed(2)} / 5`}
        sx={{
          '& .MuiGauge-valueText': {
            fontSize: 20,
            fill: '#000',
          },
        }}
      />
    </div>
  );
};

export default GaugeChart;
