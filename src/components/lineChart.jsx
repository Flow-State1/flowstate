import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../pages/styles.css';

const LineChart = () => {
    // Sample data for the chart
    const consumptionData = [400, 600, 800, 700, 500, 300, 400, 500, 600, 700, 800, 900, 1000, 800, 700];
    const costData = [200, 255, 130, 128, 122, 218, 220, 325, 228, 230, 135, 140, 238, 132, 30];
  
    // Chart data
    const data = {
      labels: Array.from({ length: 15 }, (_, i) => `${i + 1}am`),
      datasets: [
        {
          label: 'Consumption (Watts)',
          data: consumptionData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        },
        {
          label: 'Cost (Rands)',
          data: costData,
          backgroundColor: 'rgba(192, 75, 192, 0.2)',
          borderColor: 'rgba(192, 75, 192, 1)',
          borderWidth: 2,
        },
      ],
    };
  
    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: [
          {
            id: 'consumption',
            type: 'linear',
            position: 'left',
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return value + ' W';
              },
            },
          },
          {
            id: 'cost',
            type: 'linear',
            position: 'right',
            ticks: {
              beginAtZero: true,
              callback: function (value) {
                return value + ' R';
              },
            },
          },
        ],
      },
    };
  
    return (
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    );
};  
export default LineChart;