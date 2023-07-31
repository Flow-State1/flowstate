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
import { AppContext } from "../context/AppContext";
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

    const {dataObject} = useContext(AppContext);

    return ( 
        <Line data={dataObject} />
     );
}
 
export default LineGraph;