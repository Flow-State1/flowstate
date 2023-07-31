import React, { useEffect, useMemo, useState } from "react";
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
  const [payload, setPayload] = useState([]);
  const [data, setData] = useState([]);
  const [voltage, setVoltage] = useState();
  const [apower, setPower] = useState();
  const [current, setCurrent] = useState();
  const [consumption, setConcumption] = useState([]);
  // Power, Voltage, Current,AEnergy
  const time = new Date();
  const hour = time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  const [labels, setLabels] = useState([`${hour}:00`]);

  useEffect(() => {
    return () => {
      //Instance of the WebSocket
      const socket = new WebSocket("ws://localhost:3001");
      let saved_time = `${hour}:${minutes}`;
      setInterval(() => {
        const c_time = new Date();
        const c_hour = c_time.getHours();
        const c_minutes =
          c_time.getMinutes() < 10
            ? `0${c_time.getMinutes()}`
            : c_time.getMinutes();

        if (saved_time != `${c_hour}:${c_minutes}`) {
          saved_time = `${c_hour}:${c_minutes}`;
          setLabels((prevLabel) => {
            if (prevLabel !== `${c_hour}:${c_minutes}`) {
              return [...prevLabel, `${c_hour}:${c_minutes}`];
            } else {
              return prevLabel;
            }
          });
        }
        setData((prevData) => [
          ...prevData,
          Math.floor(Math.random() * 100) + 1,
        ]);

        socket.send("Send me messages");
      }, 30000);

      //Listen for messages from web socket
      socket.addEventListener("message", (event) => {
        const json = JSON.parse(event.data);
        const result = json.result["switch:0"];
        const consumption = result["aenergy"];
        //Currently loggin out mutliple time, issue is with the websocket send ing messages and stuff need to fix that out later
        console.log(result);
        setPayload((prevLoad) => [...prevLoad, result]);
        setConcumption((prevConsumption) => [
          ...prevConsumption,
          consumption["total"],
        ]);
        setCurrent(result["current"]);
        setPower(result["apower"]);
        setVoltage(result["voltage"]);
      });
    };
  }, []);

  const dataObject = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: consumption,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

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
              onClick={()=>{
                fetch('http://localhost:3001/publish/switch',{
                  method:'POST',
                  headers:{"Content-type":"application/json"}
                }).then(response=>console.log(response)).catch((error)=>{
                  console.log(`id:Switch_End_Point,${error}`);
                })
              }}
            >Switch Device On/Of</button>
          </div>

          <div className="dashboard-content-body">
            <div className="dashboard-content-body-summary-graph-card">
              <div className="dashboard-content-body-summary-graph-card-header">
                <h3>Live Graph</h3>
                
              </div>
              <Line
                data={dataObject} />
                
            </div>
            <div className="dashboard-content-body-profile-right-card">
              <div className="dashboard-content-body-profile-right-card-avatar">
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                />

                <div className="dashboard-content-body-profile-right-card-avatar-name">
                  <h3>Hi Andre!</h3>
                  <p>How are you today?</p>
                </div>
              </div>
            </div>

            <div className="dashboard-content-body-profile-right-summary-card">
              <div className="dashboard-content-body-profile-right-summary-card-header">
                <h3>Latest Updates</h3>
              </div>
            </div>

            <div className="dashboard-content-body-profile-middle-mini-cards">
              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Voltage: {voltage}</h3>
                </div>
              </div>
              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Current: {current}</h3>
                </div>
              </div>

              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Power: {apower}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Dashboard);
