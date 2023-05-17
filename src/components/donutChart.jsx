import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  datasets: [
    {
      data: [75, 25], // values should add up to 100
      backgroundColor: ['#0A4D68', '#ECECEC'],
      hoverBackgroundColor: ['#0A4D68', '#ECECEC'],
      cutout: '75%', // adjust as needed to create the progress effect
    },
  ],
};

const options = {
  cutoutPercentage: 85, // match the cutout value from the dataset
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};

const ProgressDonutChart = () => {
  return (
    <div className='donut-chart-container'>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProgressDonutChart;
