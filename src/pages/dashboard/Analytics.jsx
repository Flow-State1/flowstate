import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import "../styles.css";
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppContext";
import { Line,Bar } from "react-chartjs-2";

const Analytics = () => {
  const {
    generateReport,
    chart_image,
    chart_ref,
    chartData,
    aenergy1,
    apower1,
    acurrent1,
    avoltage1,
    aenergy2,
    apower2,
    acurrent2,
    avoltage2,
    generateReadings,
    labels,
    costFunction
  } = useContext(AppContext);

  //Making analytics functional
  const [selected, setSelected] = useState("thirty");
  const [apowerData, setAPowerData] = useState([]);

  //Data for Apower chart
  const [apowerChart, setApowerChart] = useState([]);

  //Data for aEnergy
  const [aEnergyChart, setAEnergyChart] = useState([]);

  //Data for aCurrent
  const [aCurrentChart, setACurrentChart] = useState([]);

  //Data for Voltage
  const [aVoltageChart, setVoltageChart] = useState([]);

  const aenergyObject = {
    labels,
    datasets: [
      {
        label: "Consumption",
        data: aEnergyChart,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Device2 (Consumption)",
      //   data: aenergy2,
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };
  const apowerObject = {
    labels,
    datasets: [
      {
        label: "Consumption",
        data: apowerChart,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Device2 (Consumption)",
      //   data: apower2,
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };
  const acurrent = {
    labels,
    datasets: [
      {
        label: "Consumption",
        data: aCurrentChart,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Device2 (Consumption)",
      //   data: acurrent2,
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };
  const avoltage = {
    labels,
    datasets: [
      {
        label: "Consumption",
        data: aVoltageChart,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      // {
      //   label: "Device2 (Consumption)",
      //   data: avoltage2,
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      // },
    ],
  };

  //Fetching data
  const getData = async (e) => {
      e.preventDefault();
      setSelected(e.target.value);
      console.log(selected);
        const response = await fetch(`http://localhost:3001/payload/${selected}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }).then((response) => response.json().then((responseData) => {
          console.log(responseData);
            setAPowerData(responseData)
        }))

        apowerData.forEach((item) => {
          let apowerStuff = item.data;
          apowerStuff.forEach(element => {
            setApowerChart((prev) => [...prev, element.apower]);
            setAEnergyChart((prev) => [...prev, element.aenergy]);
            setACurrentChart((prev) => [...prev, element.current]);
            setVoltageChart((prev) => [...prev, element.voltage]);
            console.log(apowerChart);
            console.log(element.apower)
          });
          console.log("A power stuff:", apowerStuff)
        })
  }

 
  useEffect(() => {
    return () => {
      costFunction();
      generateReadings();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="analytics-container">
        <div className="analytics-content">
          <div className="analytics-content-header">
            <h2>Analytics</h2>
          </div>
          <div className="analytics-content-body-summary-graph-card-header-select">
            <select name="selector" id="" onChange={getData}>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="seven">Last 7 Days</option>
              <option value="thirty">Last 30 Days</option>
            </select>
          </div>
          <div
            style={{
              background: "white",
              boxShadow:
                "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "25px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Active Energy(W/h)</h2>
              </div>
              {/* Line chart here */}
              <Line
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={aenergyObject}
              />
              <p style={{textAlign:'center', color:'grey'}}>Time</p>
            </div>
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Active Power(W)</h2>
              </div>
              {/* Chart here */}
              <Bar
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={apowerObject}
              />
              <p style={{textAlign:'center', color:'grey'}}>Time</p>
            </div>
          </div>
          <div
            style={{
              marginTop: 15,
              background: "white",
              boxShadow:
                "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "25px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Current(A)</h2>
              </div>
              {/* Chart here */}
              <Bar
              options={{
                x:{
                    stacked:true
                },
                y:{
                    stacked:true
                }
              }}
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={acurrent}
              />
              <p style={{textAlign:'center', color:'grey'}}>Time</p>
            </div>
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Voltage(V)</h2>
              </div>
              {/* Chargt here */}
              <Line
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={avoltage}
              />
              <p style={{textAlign:'center', color:'grey'}}>Time</p>
            </div>
          </div>
          <div
            style={{
              marginTop: 15,
              background: "white",
              borderRadius: "10px",
              padding: "25px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Cost(R)</h2>
              </div>
              {/* Chart here */}
              <Line
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={acurrent}
              />
              <p style={{textAlign:'center', color:'grey'}}>Time</p>
            </div>
            {/* <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Voltage</h2>
              </div>
              
              <Line
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={avoltage}
              />
            </div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
