import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import '../pages/styles.css';

const LineChart = () => {
    const generateRandomData = () => {
        const data = Array.from({ length: 14 }, () => Math.floor(Math.random() * 500) + 500);
        return data;
      };
      
      const LineChart = () => {
        const [chartData, setChartData] = useState({
          labels: Array.from({ length: 14 }, (_, i) => `${i + 1}am`),
          datasets: [
            {
              label: 'Consumption (Watts)',
              data: generateRandomData(),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2.5,
            },
            {
              label: 'Cost (Rands)',
              data: generateRandomData(),
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 2.5,
            },
          ],
        });
      
        useEffect(() => {
          const interval = setInterval(() => {
            setChartData((prevChartData) => ({
              ...prevChartData,
              datasets: [
                { ...prevChartData.datasets[0], data: generateRandomData() },
                { ...prevChartData.datasets[1], data: generateRandomData() },
              ],
            }));
          }, 2000);
      
          return () => clearInterval(interval);
        }, []);
      
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
            <Line data={chartData} options={options} />
          </div>
        );
      };
};  
export default LineChart;