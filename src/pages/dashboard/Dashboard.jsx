/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import "../styles.css";
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
// import ToggleSwitch from "../../components/TogggleSwitch";
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppContext";
import ToggleSwitch from "../../components/Switch";
import Registration from "../../components/Registration";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const {
    killowatts_,
    setKillowatts_,
    killowatts,
    setKillowatts,
    labels_,
    setLabels,
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
    minutes_ts,
    setMinutes_ts,
    cost,
    setCost,
    user,
    setDevicesRegistered,
    devicesRegistered,
    dashRoutes,
    setDashroutes,
    deviceInfo,
    setCon,
    isButton1On,
    isButton2On,
    toggleButton1,
    toggleButton2
  } = useContext(AppContext);

  const userName = user ? user.name : " ";

  // After registering create an instance of the websocket, the websocket should only be created when devices are registered(we can just create an actual page fro registering the devices instead of using acomponent this way we can set a boolean and pass it to the dashboard)

  // console.log("comsumption",consumption);
  // console.log("comsumption_",consumption_);
  // console.log(socket);
  const device1Label = isButton1On ? `${deviceInfo.device_1.alias} ON` : `${deviceInfo.device_1.alias} OFF`;
  const device2Label = isButton2On ? `${deviceInfo.device_2.alias} ON` : `${deviceInfo.device_2.alias} OFF`;
  const dataObject = {
    labels: labels_,
    datasets: [
      {
        label: deviceInfo.device_1.alias,
        data: consumption,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: deviceInfo.device_2.alias,
        data: consumption_,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-content-header">
            <h2>Dashboard</h2>
            <button
              onClick={toggleButton1}
              style={{
                border: "none",
                padding: "5px 25px",
                borderRadius: "5px",
                margin: '5px',
                background: isButton1On ? "limegreen" : "#0A4D68",
                color: isButton1On ? "black" : "white",
              }}
            >
              {device1Label}
            </button>
            <button
              onClick={toggleButton2}
              style={{
                border: "none",
                padding: "5px 25px",
                borderRadius: "5px",
                margin: '5px',
                background: isButton2On ? "limegreen" : "#0A4D68",
                color: isButton2On ? "black" : "white",
              }}
            >
              {device2Label}
            </button>
            {/* <ToggleSwitch deviceId={1} />
            <ToggleSwitch deviceId={2} /> */}
          </div>

          <div className="dashboard-content-body">
            <div className="dashboard-content-body-summary-graph-card">
              <div className="dashboard-content-body-summary-graph-card-header">
                <h3>Consumption</h3>
              </div>
              <Line data={dataObject} />
            </div>
            <div className="dashboard-content-body-profile-right-card">
              <div className="dashboard-content-body-profile-right-card-avatar">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                />

                <div className="dashboard-content-body-profile-right-card-avatar-name">
                  <h3>Hi {userName}</h3>
                  <p>How are you today?</p>
                  {/* Close connection to the websocket first */}
                  <p>Click button to change devices</p>
                  <button
                    style={{
                      border: "none",
                      padding: "5px 25px",
                      borderRadius: "5px",
                      background: "#0A4D68",
                      color: "white",
                    }}
                    onClick={() => {
                      // This should also reset the values of power and everything else that is being shown on the live chart portion
                      setPower(0);
                      setPower_(0);
                      setConsumption([]);
                      setConsumption_([]);
                      setCurrent(0);
                      setCurrent_(0);
                      setVoltage(0);
                      setVoltage_(0);
                      setCost(0);
                      setLabels([]);
                      navigate("/devices");
                    }}
                  >
                    Change Devices
                  </button>
                </div>
              </div>
            </div>

            <div className="dashboard-content-body-profile-right-summary-card">
              <div className="dashboard-content-body-profile-right-summary-card-header">
                <p
                  style={{
                    fontSize: 11,
                    textAlign: "start",
                    padding: 12,
                  }}
                >
                  Electricity consumption (in killowatt-hours,Kwh) is determined
                  by multiplying the power used in (Killowatts kw) by the time
                  its used(hours).
                  <br />
                  Formula: Consumption = Power(Kw) x Time(hour)..
                  <br />
                  This means that if an applience of 100 watt was being used
                  over a period of 5 hours, the consumption would be 0,1Kw x 5 =
                  0,5 Kwh
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  Power for {deviceInfo.device_1["alias"]}:{" "}
                  <span style={{ fontWeight: "bold" }}>{apower} Wh</span>
                </p>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 11,
                  }}
                >
                  Power for {deviceInfo.device_2["alias"]}:{" "}
                  <span style={{ fontWeight: "bold" }}>{apower_} Wh</span>
                </p>
              </div>
            </div>
            <div className="dashboard-content-body-profile-middle-mini-cards">
              <div
                style={{
                  background: "white",
                  width: "100%",
                  padding: "43px",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p>
                    Consumption for {deviceInfo.device_1["alias"]}:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {consumption[consumption.length - 1]} Kwh
                    </span>{" "}
                  </p>
                  <p>
                    Consumption for {deviceInfo.device_2["alias"]}:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {consumption_[consumption_.length - 1]} Kwh
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Total running cost:{" "}
                    <span style={{ fontWeight: "bold" }}> R {cost}</span>
                  </p>
                </div>
              </div>

              {/*Add a section with a table to show data that is receive, such as the current for device 1 and so on  */}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Dashboard);

/**
 *
 *
 *
 */
