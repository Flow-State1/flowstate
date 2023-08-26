import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/Report";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "react-chartjs-2";

function Report() {
  const { generateReport, chart_data_object, chart_image, chart_ref,chartData } =
    useContext(AppContext);

  const [date,setDate] = useState("");

  console.log("Chartdata",chartData);

  return (
    <>
      <div style={{ marginLeft: "400px", marginTop: "60px" }}>
        <input
          type="date"
          name="date picker"
          id=""
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={generateReport}>Generate Report</button>
        <div style={{ background: "#FFF" }}>
          <Line
            style={{ width: "700px", height: "700px" }}
            ref={chart_ref}
            data={chart_data_object}
          />
        </div>
        <p>{date}</p>
      </div>
      <PDFViewer
        style={{
          marginLeft: "350px",
          marginTop: "15px",
          width: "80%",
          height: "90vh",
        }}
      >
        <MyDocument img={chart_image} />
      </PDFViewer>
    </>
  );
}

export default Report;
