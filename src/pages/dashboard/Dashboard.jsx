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
  const time = new Date();
  const hour = time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();

  const [labels, setLabels] = useState([`${hour}:${minutes}`]);

  const {
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
    user
  } = useContext(AppContext);

  const userName = user ? user.name : ' ';

  let c_cost = 0;
  console.log(user);

  useEffect(() => {
    return () => {
      //Instance of the WebSocket
      const socket = new WebSocket("ws://localhost:3001");
      let saved_time = `${hour}:${minutes}`;

      //This is for creating the labels on the graph
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
      }, 60000);

      //Listen for messages from web socket
      socket.addEventListener("message", (event) => {
        const json = JSON.parse(event.data);
        console.log(`Results: ${JSON.stringify(json.result["switch:0"])}`);

        if (json["src"] == "shellyplus1pm-a8032ab11964") {
          if (json.result["switch:0"]["output"] == true) {
            const result = json.result["switch:0"];
            const consumption = result["aenergy"];
            console.log(`aenergy:${result.toString()}`);
            setCost(() => {
              const pwr_kwh = result["apower"] / 1000;
              const cst = pwr_kwh * 1.77;
              console.log(`current cost:${cst}`);
              console.log(`Total cost:${c_cost}+${cst} = ${c_cost + cst}`);
              c_cost = c_cost + cst;
              return c_cost;
            });
            setPayload((prevLoad) => [...prevLoad, result]);
            setConsumption((prevConsumption) => {
              if (consumption["total"] != 0) {
                return [...prevConsumption, consumption["total"]];
              } else if (consumption["total"] == 0) {
                return 0;
              }
            });
            setCurrent(result["current"]);
            setPower(result["apower"]);
            setVoltage(result["voltage"]);
          } 
          // Check if switch is off
          else {
            const result = json.result["switch:0"];
            console.log("switch is off");
            setCost(() => {
              const pwr_kwh = 0 / 1000;
              // console.log(pwr_kwh);
              const cst = pwr_kwh * 1.77;
              console.log(`current cost:${cst}`);
              console.log(`Total cost:${c_cost}+${cst} = ${c_cost + cst}`);
              c_cost = c_cost + cst;
              return c_cost;
            });
            setPayload((prevLoad) => [...prevLoad, result]);
            setConsumption((prevConsumption) => [...prevConsumption, 0]);
            setCurrent(0);
            setPower(0);
            setVoltage(result["voltage"]);
          }
        }

        // Updating state variable for device 2
        else if (json["src"] == "shellyplus1pm-7c87ce719ccc") {
          if (json.result["switch:0"]["output"] == true) {
            const result = json.result["switch:0"];
            const consumption = result["aenergy"];
            console.log(`aenergy:${result.toString()}`);
            setCost(() => {
              const pwr_kwh = result["apower"] / 1000;
              // console.log(pwr_kwh);
              const cst = pwr_kwh * 1.77;
              console.log(`current cost:${cst}`);
              console.log(`Total cost:${c_cost}+${cst} = ${c_cost + cst}`);
              c_cost = c_cost + cst;
              return c_cost;
            });
            setPayload_((prevLoad) => [...prevLoad, result]);
            setConsumption_((prevConsumption) => {
              if (consumption["total"] != 0) {
                return [...prevConsumption, consumption["total"]];
              } else if (consumption["total"] == 0) {
                return 0;
              }
            });
            setCurrent_(result["current"]);
            setPower_(result["apower"]);
            setVoltage_(result["voltage"]);
          } 
          //Check if switch is off
          else {
            const result = json.result["switch:0"];
            console.log("switch is off");
            setCost(() => {
              const pwr_kwh = 0 / 1000;
              // console.log(pwr_kwh);
              const cst = pwr_kwh * 1.77;
              console.log(`current cost:${cst}`);
              console.log(`Total cost:${c_cost}+${cst} = ${c_cost + cst}`);
              c_cost = c_cost + cst;
              return c_cost;
            });
            setPayload_((prevLoad) => [...prevLoad, result]);
            setConsumption_((prevConsumption) => [...prevConsumption, 0]);
            setCurrent_(0);
            setPower_(0);
            setVoltage_(result["voltage"]);
          }
        }
      });
    };
  }, []);

  console.log(`Consumption:${consumption}`);
  console.log(`Consumption_:${consumption_}`);

  const dataObject = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: consumption,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: consumption_,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
            {/* <button
              onClick={() => {
                fetch("http://localhost:3001/publish/switch/1", {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                })
                  .then((response) => console.log(response))
                  .catch((error) => {
                    console.log(`id:Switch_End_Point,${error}`);
                  });
              }}
            >
              Device1 On/Of
            </button>
            <button
              onClick={() => {
                fetch("http://localhost:3001/publish/switch/2", {
                  method: "POST",
                  headers: { "Content-type": "application/json" },
                })
                  .then((response) => console.log(response))
                  .catch((error) => {
                    console.log(`id:Switch_End_Point,${error}`);
                  });
              }}
            >
              Device2 On/Of
            </button> */}
            <ToggleSwitch deviceId={1} />
            <ToggleSwitch deviceId={2} />
          </div>

          <div className="dashboard-content-body">
            <div className="dashboard-content-body-summary-graph-card">
              <div className="dashboard-content-body-summary-graph-card-header">
                <h3>Live Graph</h3>
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
                </div>
              </div>
            </div>

            <div className="dashboard-content-body-profile-right-summary-card">
              <div className="dashboard-content-body-profile-right-summary-card-header">
                <h3>Running Costs:R{cost}</h3>
              </div>
            </div>

            <div className="dashboard-content-body-profile-middle-mini-cards">
              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Voltage1: {voltage}</h3>
                  <h3>Voltage2: {voltage_}</h3>
                </div>
              </div>
              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Current1: {current}</h3>
                  <h3>Current2: {current_}</h3>
                </div>
              </div>

              <div className="dashboard-content-body-profile-middle-mini-card">
                <div className="dashboard-content-body-profile-middle-mini-card-header">
                  <h3>Power1: {apower}</h3>
                  <h3>Power2: {apower_}</h3>
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