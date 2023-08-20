import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "../../components/Report";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "react-chartjs-2";


function Report() {

  const {generateReport,chart_data_object,chart_image,chart_ref} = useContext(AppContext)

  return (
    <>
      <div style={{ marginLeft: "500px", marginTop: "60px" }}>
        <div style={{ width: "300px", height: "350px" }}>
          <button onClick={generateReport}>Generate Report</button>
          <Line ref={chart_ref} data={chart_data_object} />
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
        <MyDocument img={chart_image} />
      </PDFViewer>
    </>
  );
}

export default Report;
