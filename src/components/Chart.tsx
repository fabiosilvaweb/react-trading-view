import ApexChart from 'react-apexcharts';
import React from 'react';

interface Series {
  data: SeriesItem[]
}

interface SeriesItem {
  name?: string
  x: Date
  y: number[]
}

interface ChartProps {
  type?: "area" | "line" | "candlestick" | "bar" | "histogram" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "treemap" | "boxPlot" | "radar" | "polarArea" | "rangeBar"
  options?: any
  series?: Series[]
}

const Chart: React.FC<ChartProps> = (
  {
    type,
    options,
    series 
  }
) => {
  return (
    <div>
      <ApexChart 
        type={type}
        options={options} 
        series={series}
        width={840} 
        height={680} 
      />
    </div>
  );
}

Chart.defaultProps = {
  type: "candlestick",
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
          enabled: true
      }
    },
    grid: {
      show: true,
    },
    legend: {
      show: false
    }
  },
  series: []
}

export default Chart;