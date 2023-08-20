import { useState, createContext,useRef, useCallback  } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [payload, setPayload] = useState([]);
  const [payload_, setPayload_] = useState([]);
  //State variable for device shellyplus1pm-a8032ab1196
  const [data, setData] = useState([]);
  const [voltage, setVoltage] = useState();
  const [apower, setPower] = useState();
  const [current, setCurrent] = useState();
  const [consumption, setConsumption] = useState([]);
  const [minutes_ts, setMinutes_ts] = useState();
  const [cost, setCost] = useState(0);
  //State variable for device  shellyplus1pm-7c87ce719ccc
  const [data_, setData_] = useState([]);
  const [voltage_, setVoltage_] = useState();
  const [apower_, setPower_] = useState();
  const [current_, setCurrent_] = useState();
  const [consumption_, setConsumption_] = useState([]);

  // Context for the report page
  let chart_ref = useRef(null);
  let [chart_image, setChart_image] = useState("");
  const chart_data_object = {
    labels: ["2011", "2012", "2013"],
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: [10, 20, 35],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: [5, 15, 45],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const generateReport = useCallback(() => {
    const link = document.createElement("a");
    // link.download = "chart.png";
    link.href = chart_ref.current.toBase64Image();
    link.click();
    setChart_image(chart_ref.current.toBase64Image());
  }, []);

  return (
    <AppContext.Provider
      value={{
        apower,
        apower_,
        consumption,
        consumption_,
        current,
        current_,
        data,
        data_,
        payload,
        payload_,
        voltage,
        voltage_,
        minutes_ts,
        cost,
        chart_data_object,
        chart_image,
        chart_ref,
        generateReport,
        setPower,
        setPower_,
        setConsumption,
        setConsumption_,
        setCurrent,
        setCurrent_,
        setData,
        setData_,
        setPayload,
        setPayload_,
        setVoltage,
        setVoltage_,
        setMinutes_ts,
        setCost,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
