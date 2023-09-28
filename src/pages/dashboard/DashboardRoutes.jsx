import React, { useContext, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LayoutDashboard from "../../../src/components/BackgroundImage";
import Analytics from "./Analytics";
import Dashboard from "./Dashboard";
import Notifications from "./Notifications";
import Settings from "./Settings";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import ViewProfile from "./ViewProfile";
import ChangePassword from "./ChangePassword";
import ChatBot from "./ChatBot";
import DashboardContextProvider from "../../context/DashboardContext";
import Report from "./Report";
import { AppContext } from "../../context/AppContext";
import LoginCard from "../../components/LoginCard";
import Redirect from "../Redirect";
import { ThemeProvider } from "../../context/ThemeContext";

const DashboardRoutes = () => {
    const {
        setPower,
        setPower_,
        setConsumption,
        setConsumption_,
        setCurrent,
        setCurrent_,
        setVoltage,
        setVoltage_,
        setCost,
        setLabels,
    } = useContext(AppContext);

    const time = new Date();
    const hour = time.getHours();
    const minutes =
        time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    const path = useLocation();
    let c_cost = 0;

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3001");
        let saved_time = `${hour}:${minutes}`;
        socket.onopen = () => {
            console.log("Connected to websocket");
        };

        //Listen for messages from web socket
        socket.addEventListener("message", (event) => {
            const json = JSON.parse(event.data);
            console.log(json);
            // Updating variables for device1
            if (json["payload_src"] == "shellyplus1pm-a8032ab11964") {
                let power = json.data[json.data.length - 1].apower.toFixed(4);
                let voltage = json.data[json.data.length - 1].voltage.toFixed(4);
                let current = json.data[json.data.length - 1].current;
                let labels = json.labels_array[(json.labels_array).length - 1];
                console.log("Labels for ", json["payload_src"], " is ", labels);
                console.log("Labels for ", json["payload_src"], " is ", json.labels_array);

                setPower(power);
                setConsumption((prevConsumption) => {
                    let consumption = [...prevConsumption, json.power];
                    // let duration = consumption.length/60;
                    let result = power / 60;
                    console.log("cons1", result);
                    return [...prevConsumption, result];
                });
                setVoltage(voltage);
                setCurrent(current);
                setCost(() => {
                    const pwr_kwh = power;
                    const cst = pwr_kwh * 1.77;
                    c_cost = c_cost + cst;
                    let finalCost = c_cost.toFixed(4);
                    return finalCost;
                });
            }

            // Updating state variable for device 2
            else if (json["payload_src"] == "shellyplus1pm-7c87ce719ccc") {
                let power = json.data[json.data.length - 1].apower.toFixed(4);
                let voltage = json.data[json.data.length - 1].voltage.toFixed(4);
                let current = json.data[json.data.length - 1].current;
                let labels = json.labels_array[(json.labels_array).length - 1];
                console.log("Labels for ", json["payload_src"], " is ", labels);
                console.log("Labels for ", json["payload_src"], " is ", json.labels_array);

                setLabels((prevLabel) => {
                    if (prevLabel !== labels) {
                        console.log("Prev label is ", prevLabel);
                        console.log("Current label is ", labels);
                        return [...prevLabel, labels];
                    } else {
                        console.log("Prev label is ", prevLabel);
                        console.log("Current label is ", labels);
                        return prevLabel;
                    }
                });
                setPower_(power);
                // Calculate the consumption of the devices, by using the values in the labels array is the number of minutes a device has been on(time/duration)
                // Then use the power(which is now in Kw/h)
                // Get the duration the device has been on for(length of array) devide it by 60 to get it in hour
                // Divide the power you got by the newly calculated duration
                setConsumption_((prevConsumption) => {
                    let consumption = [...prevConsumption, json.power];
                    // let duration = consumption.length/60;
                    let result = power / 60;
                    console.log("cons2", result);
                    return [...prevConsumption, result];
                });
                setVoltage_(voltage);
                setCurrent_(current);
                setCost(() => {
                    const pwr_kwh = power;
                    const cst = pwr_kwh * 1.77;
                    let finalCost = c_cost.toFixed(4);
                    return finalCost;
                });
            }
        });

        return () => {
            // socket.close();
        };
    }, []);

    return (
        <>
            <AnimatePresence mode="sync">
                <DashboardContextProvider>
                    <ThemeProvider>
                        <LayoutDashboard>
                            <Routes location={path} key={path.pathname}>
                                <Route path="/dashboard/dashboard" element={<Dashboard />} />z
                                <Route path="/dashboard/analytics" element={<Analytics />} />
                                <Route path="/dashboard/chatbot" element={<ChatBot />} />
                                <Route
                                    path="/dashboard/notifications"
                                    element={<Notifications />}
                                />
                                <Route path="/dashboard/settings" element={<Settings />} />
                                <Route path="/dashboard/profile" element={<Profile />} />
                                <Route
                                    path="/dashboard/profile/editprofile"
                                    element={<EditProfile />}
                                />
                                <Route
                                    path="/dashboard/profile/viewprofile"
                                    element={<ViewProfile />}
                                />
                                <Route
                                    path="/dashboard/profile/changepassword"
                                    element={<ChangePassword />}
                                />
                                <Route path="/dashboard/Report" element={<Report />} />
                            </Routes>
                        </LayoutDashboard>
                    </ThemeProvider>
                </DashboardContextProvider>
            </AnimatePresence>
        </>
    );
};

export default React.memo(DashboardRoutes);
