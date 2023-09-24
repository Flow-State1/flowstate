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
    return () => {
      const socket = new WebSocket("ws://localhost:3001");
      let saved_time = `${hour}:${minutes}`;

      //Listen for messages from web socket
      socket.addEventListener("message", (event) => {
        const json = JSON.parse(event.data);
        // Updating variables for device1
        if (json["payload_src"] == "shellyplus1pm-a8032ab11964") {
          setPower(json.power);
          setConsumption((prevConsumption) => {
            if (json.aenergy != 0) {
              return [...prevConsumption, json.aenergy];
            } else if (json.aenergy == 0) {
              return 0;
            }
          });
          setVoltage(json.voltage);
          setCurrent(json.current_);
          setCost(() => {
            const pwr_kwh = json.power;
            const cst = pwr_kwh * 1.77;
            c_cost = c_cost + cst;
            let finalCost = c_cost.toFixed(4)
            return finalCost ;
          });

        }

        // Updating state variable for device 2
        else if (json["payload_src"] == "shellyplus1pm-7c87ce719ccc") {
          setLabels((prevLabel) => {
            if ((prevLabel) !== json.time_label) {
              console.log("Prev label is ",prevLabel);
              console.log("Current label is ",json.time_label);
              return [...prevLabel, json.time_label];
            } else {
              console.log("Prev label is ",prevLabel);
              console.log("Current label is ",json.time_label);
              return prevLabel
            }
          });
          setPower_(json.power);
          setConsumption_((prevConsumption) => {
            if (json.aenergy != 0) {
              return [...prevConsumption, json.aenergy];
            } else if (json.aenergy == 0) {
              return 0;
            }
          });
          setVoltage_(json.voltage);
          setCurrent_(json.current_);
          setCost(() => {
            const pwr_kwh = json.power;
            const cst = pwr_kwh * 1.77;
            let finalCost = c_cost.toFixed(4)
            return finalCost ;
          });
        }
      });
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
