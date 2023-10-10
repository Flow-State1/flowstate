/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { ThemeProvider } from "../../context/ThemeContext";
import Recommendations from "./Recommendation";

const DashboardRoutes = () => {
  const path = useLocation();
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
    setKillowatts_,
    setKillowatts,
    user,
    appliencesId
  } = useContext(AppContext);

  const [data, setData] = useState();


  const results = [
    {
      applience_id: "Ideapad 3_15:28",
      hour: "15:00",
      label: "15:30",
      date: "2023/10/03, 15:30:45",
      data: {
        output: false,
        apower: 0,
        voltage: 0,
        current: 0,
      },
      id: "651c17858f2ddff55c3d8c08",
    },
    {
      applience_id: "Ideapad 3_15:28",
      hour: "15:00",
      label: "15:50",
      date: "2023/10/03, 15:50:36",
      data: {
        output: false,
        apower: 0,
        voltage: 0,
        current: 0,
      },
      id: "651c1c2c837426c74789c264",
    },
    {
      applience_id: "Ideapad 3_15:28",
      hour: "16:00",
      label: "16:04",
      date: "2023/10/03, 16:04:48",
      data: {
        output: false,
        apower: 0,
        voltage: 0,
        current: 0,
      },
      id: "651c1f800b60b6a0633e19b5",
    },
  ];
// console.log("Appliences: ",appliencesId);
  const dataObject = JSON.stringify({
    applience_id: [appliencesId["applience_id1"], appliencesId["applience_id2"]],
  });

  const Fetchdata = () => {
    fetch("http://localhost:3001/payload/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: dataObject,
    })
      .then((response) => response.json())
      .then((results_) => {
        console.log("Results from the",dataObject," ",results_);
        // For device 1
        const labels = [];
        const consumption = [];
        let power = [];
        results_[appliencesId["applience_id1"]].forEach((element) => {
          // console.log("Element1: ",element);
          labels.push(element.label);
          power.push((element["data"]["apower"]).toFixed(6))
          let apower =  (element["data"]["apower"]/1000).toFixed(6);
          consumption.push(apower);

        });
        // console.log("Labels array: ",labels);
        setLabels(labels);
        setConsumption((prevConsumption) => [
          ...prevConsumption,
          ...consumption,
        ]);
        setPower(power[power.length - 1])

        // For device 2
        const consumption_ = [];
        let power_ = [];
        results_[appliencesId["applience_id2"]].forEach((element) => {
          // console.log("Element2: ",element);
          power_.push((element["data"]["apower"]).toFixed(6))
          let apower =  (element["data"]["apower"]/1000).toFixed(6);
          consumption_.push(apower);
        });
        setConsumption_((prevConsumption) => [
          ...prevConsumption,
          ...consumption_,
        ]);
        setPower_(power_[power_.length - 1]);

        // Calculate the cost of running both devices
        let cost1 = 0;
        consumption.forEach((cons)=>{
          let rate = cons * 1.77;
          // console.log(rate);
          cost1 = cost1 + rate

        })
        let cost2 = 0;

        consumption_.forEach((cons)=>{
          // console.log(`Cost ${cost2} + ${cons} * 1,77 = ${cost2 + (cons * 1.77)}`);
          let rate = cons * 1.77;
          // console.log(rate);
          cost2 = cost2 + rate
        })
        const totalcost = cost1 +cost2
        setCost(totalcost.toFixed(6))

      });
  };

  useEffect(() => {
    Fetchdata();
    let interval = setInterval(() => {
      Fetchdata();
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  //       // let saved_time = `${hour}:${minutes}`;

  //       console.log("User: ", user);
  //     const socket = io("ws://localhost:3001", {
  //       transports: ["websocket"],
  //     });

  //     socket.onAny((e)=>{
  //         console.log("Connects ",e);
  //     })

  //     //Listen for messages from web socket
  //     socket.on("message", (event) => {
  //       console.log(event);
  //       const json = JSON.parse(event.data);
  //       console.log(json);
  //       // Updating variables for device1
  //       if (json["payload_src"] == "shellyplus1pm-a8032ab11964") {
  //         let power = json.data[json.data.length - 1].apower.toFixed(4);
  //         let voltage = json.data[json.data.length - 1].voltage.toFixed(4);
  //         let current = json.data[json.data.length - 1].current;
  //         let labels = json.labels_array[json.labels_array.length - 1];
  //         console.log("Labels for ", json["payload_src"], " is ", labels);
  //         console.log(
  //           "Labels for ",
  //           json["payload_src"],
  //           " is ",
  //           json.labels_array
  //         );

  //         setPower(power);
  //         setConsumption((prevConsumption) => {
  //           // let consumption = [...prevConsumption, json.power];
  //           // let duration = consumption.length/60;
  //           let result = power / 60;
  //           console.log("cons1", result);
  //           return [...prevConsumption, result];
  //         });
  //         setVoltage(voltage);
  //         setCurrent(current);
  //         setCost(() => {
  //           const pwr_kwh = power;
  //           const cst = pwr_kwh * 1.77;
  //           c_cost = c_cost + cst;
  //           let finalCost = c_cost.toFixed(4);
  //           return finalCost;
  //         });
  //         setCost1(() => {
  //           const pwr_kwh = power;
  //           const cst = pwr_kwh * 1.77;
  //           c_cost = c_cost + cst;
  //           let finalCost = c_cost.toFixed(4);
  //           return finalCost;
  //         });
  //       }

  //       // Updating state variable for device 2
  //       else if (json["payload_src"] == "shellyplus1pm-7c87ce719ccc") {
  //         let power = json.data[json.data.length - 1].apower.toFixed(4);
  //         let voltage = json.data[json.data.length - 1].voltage.toFixed(4);
  //         let current = json.data[json.data.length - 1].current;
  //         let labels = json.labels_array[json.labels_array.length - 1];
  //         console.log("Labels for ", json["payload_src"], " is ", labels);
  //         console.log(
  //           "Labels for ",
  //           json["payload_src"],
  //           " is ",
  //           json.labels_array
  //         );

  //         setLabels((prevLabel) => {
  //           if (prevLabel !== labels) {
  //             console.log("Prev label is ", prevLabel);
  //             console.log("Current label is ", labels);
  //             return [...prevLabel, labels];
  //           } else {
  //             console.log("Prev label is ", prevLabel);
  //             console.log("Current label is ", labels);
  //             return prevLabel;
  //           }
  //         });
  //         setPower_(power);
  //         // Calculate the consumption of the devices, by using the values in the labels array is the number of minutes a device has been on(time/duration)
  //         // Then use the power(which is now in Kw/h)
  //         // Get the duration the device has been on for(length of array) devide it by 60 to get it in hour
  //         // Divide the power you got by the newly calculated duration
  //         setConsumption_((prevConsumption) => {
  //           // let consumption = [...prevConsumption, json.power];
  //           // let duration = consumption.length/60;
  //           let result = power / 60;
  //           console.log("cons2", result);
  //           return [...prevConsumption, result];
  //         });
  //         setVoltage_(voltage);
  //         setCurrent_(current);
  //         setCost(() => {
  //           const pwr_kwh = power;
  //           const cst = pwr_kwh * 1.77;
  //           c_cost = c_cost + cst;
  //           let finalCost = c_cost.toFixed(4);
  //           return finalCost;
  //         });
  //         setCost2(() => {
  //           const pwr_kwh = power;
  //           const cst = pwr_kwh * 1.77;
  //           c_cost = c_cost + cst;
  //           let finalCost = c_cost.toFixed(4);
  //           return finalCost;
  //         });
  //       }
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  return (
    <>
      <AnimatePresence mode="sync">
        <DashboardContextProvider>
          <ThemeProvider>
            <LayoutDashboard>
              <Routes location={path} key={path.pathname}>
                <Route path="/dashboard/dashboard" element={<Dashboard />} />
                <Route
                  path="/dashboard/recommendation"
                  element={<Recommendations />}
                />
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
