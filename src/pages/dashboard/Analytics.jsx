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
    labels
  } = useContext(AppContext);

  const aenergyObject = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: aenergy1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: aenergy2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const apowerObject = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: apower1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: apower2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const acurrent = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: acurrent1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: acurrent2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const avoltage = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: avoltage1,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: avoltage2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const { costFunction, obj, obj2 } = useContext(AppContext);
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
            <select name="" id="">
              <option value="">Today</option>
              <option value="">Yesterday</option>
              <option value="">Last 7 Days</option>
              <option value="">Last 30 Days</option>
            </select>
          </div>
          <div
            style={{
              background: "white",
              height: "550px",
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
            </div>
          </div>
          <div
            style={{
              marginTop: 15,
              background: "white",
              height: "550px",
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
            </div>
          </div>
          <div
            style={{
              marginTop: 15,
              background: "white",
              height: "550px",
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
                <h2>Cost</h2>
              </div>
              {/* Chart here */}
              <Line
                style={{ width: "700px", height: "700px" }}
                ref={chart_ref}
                data={acurrent}
              />
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
