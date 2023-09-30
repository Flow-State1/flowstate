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
        labels_, setLabels,
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
        dashRoutes, setDashroutes,
        deviceInfo,
        setCon
    } = useContext(AppContext);

    const userName = user ? user.name : " ";



    // After registering create an instance of the websocket, the websocket should only be created when devices are registered(we can just create an actual page fro registering the devices instead of using acomponent this way we can set a boolean and pass it to the dashboard)

    // console.log("comsumption",consumption);
    // console.log("comsumption_",consumption_);
    // console.log(socket);

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
                                <h3>Live Graph Consumption(Kw/h)</h3>
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
                                            color: "white"
                                        }}
                                        onClick={() => {
                                            // This should also reset the values of power and everything else that is being shown on the live chart portion
                                            setCon(false)
                                            fetch('http://localhost:3001/payload/reset').then((res) => {
                                                setPower(0)
                                                setPower_(0)
                                                setConsumption([])
                                                setConsumption_([])
                                                setCurrent(0)
                                                setCurrent_(0)
                                                setVoltage(0)
                                                setVoltage_(0)
                                                setCost(0)
                                                setLabels([])
                                                if (!res.ok) {
                                                    console.log("Response error");
                                                } else {
                                                    navigate('/devices')
                                                }
                                            })
                                        }}
                                    >Change Devices</button>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-content-body-profile-right-summary-card">
                            <div className="dashboard-content-body-profile-right-summary-card-header">
                                <h3>Running Costs:R{cost}</h3>
                            </div>
                            <h3>{deviceInfo.device_1.alias} kW: {killowatts.toFixed(4)}</h3>
                            <h3>{deviceInfo.device_2.alias} kW: {killowatts_.toFixed(4)}</h3>
                        </div>

                        {/*Change this section to be a form wheee user can change the devices they are using  */}
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
