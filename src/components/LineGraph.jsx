import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
import { useContext } from "react";
  import { Line } from "react-chartjs-2";
import { DashboardContext } from "../context/DashboardContext";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const LineGraph = () => {

    const {dataObject} = useContext(DashboardContext);

    return ( 
        <Line data={dataObject} />
     );
}
 
export default LineGraph;