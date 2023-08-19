import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/Report";

import { useState, useRef, useCallback } from "react";
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
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  let ref = useRef(null);
  let [img, setImg] = useState("");
  const dataObject = {
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
    link.href = ref.current.toBase64Image();
    link.click();
    setImg(ref.current.toBase64Image());
  }, []);

  return (
    <>
      <div style={{ marginLeft: "500px", marginTop: "60px" }}>
        <div style={{ width: "300px", height: "350px" }}>
          <button onClick={generateReport}>Generate Report</button>
          <Line ref={ref} data={dataObject} />
        </div>
      </div>
      <PDFViewer
        style={{
          marginLeft: "350px",
          marginTop: "15px",
          width: "80%",
          height: "90vh",
        }}
      >
        <MyDocument img={img} />
      </PDFViewer>
    </>
  );
}

export default Report;
