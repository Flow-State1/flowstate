/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
//import { useNavigate } from "react-router";
import "../styles.css";
//import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppContext";
import {
  Line,
  //Bar
} from "react-chartjs-2";
//import * as zoom from "chartjs-plugin-zoom";

import { Chart } from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

const Analytics = () => {
  const {
    user,
    appliences,
    setAppliences,
    applienceId,
    consumptionAnalaytics,
    setConsumptionAnalytics,
    consumptionAnalaytics_,
    setConsumptionAnalytics_,
    analyticsLabel,
    labels,
  } = useContext(AppContext);
  // const [appliences, setAppliences] = useState([]);
  const [appliance1, setAppliance1] = useState([]);
  const [appliance2, setAppliance2] = useState([]);
  const [variants, setVariants] = useState([]);
  const [variants_, setVariants_] = useState([]);

  const [payload, setPayload] = useState([]);
  const [payload_, setPayload_] = useState([]);
  const [applienceid1, setApplienceId1] = useState();
  const [applienceid2, setApplienceId2] = useState();
  const [label, setLabels] = useState([]);

  const [date, setDate] = useState("");
  const [date_, setDate_] = useState("");
  const [hour, sethour] = useState();
  const [existing, setExisting] = useState();

  const [data, setData] = useState([{ hour: "", readings: "" }]);
  const [data_, setData_] = useState([{ hour: "", readings: "" }]);

  // const [appliencesId,setAppliencesId] = useState([]);
  const [object, setObject] = useState([]);

  // const userAppliences = async () => {
  //   const appliences = await fetch(
  //     `http://localhost:3001/appliences/65254d7f1922a89961ebdca7`
  //   );
  //   const results = await appliences.json();
  //   // console.log("Results for fetching appliences: ", results);
  //   setAppliences(results);
  //   // setAppliences_(results);
  // };
  console.log("User Applienes: ", applienceId);

  const payload1 = async () => {
    console.log("Payload 1 executed: ", hour);
    const payloads = await fetch(
      "http://localhost:3001/payload/analytics/hour",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applience_id: applienceid1,
          date: date,
          hour: hour,
        }),
      }
    );
    // setAppliencesId((prev) => {
    //   let arr = [];
    //   appliences.map(applience=>{
    //     arr.push(applience.applience_id);
    //   })
    //   return [...arr]
    // });
    const results = await payloads.json();
    console.log("Date from payload1: ", results);
    let existingArr = [];
    results.forEach((element) => {
      const data = JSON.parse(element.data);
      setPayload(data);
      const consumption = data["apower"] / 1000;
      const label = element.label;
      setConsumptionAnalytics((prevCons) => [...prevCons, consumption]);
      existingArr.push({ hour: label, readings: consumption }); //Existing data
    });
    // console.log("Existing array: ",existingArr);
    // setPayload(results);
    setData((prev) => {
      let data = [];
      label.forEach((time_) => {
        const existingEntry = existingArr.find((entry) => entry.hour === time_);
        if (existingEntry) {
          data.push({ hour: time_, readings: existingEntry.readings });
        } else {
          data.push({ hour: time_, readings: 0 });
        }
      });
      return data;
    });
  };
  const payload2 = async () => {
    console.log("Payload 2 executed");
    const payloads = await fetch("http://localhost:3001/payload/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applience_id: applienceid2,
        date: date_,
        hour: hour,
      }),
    });
    const results = await payloads.json();
    console.log("Date from payload2: ", results);
    let existingArr = [];
    results.forEach((element) => {
      const data = JSON.parse(element.data);
      setPayload_(data);
      const consumption = data["apower"] / 1000;
      const label = element.label;
      setConsumptionAnalytics_((prevCons) => [...prevCons, consumption]);
      existingArr.push({ hour: label, readings: consumption });
    });
    setData_((prev) => {
      let data = [];
      label.forEach((time_) => {
        const existingEntry = existingArr.find((entry) => entry.hour === time_);
        if (existingEntry) {
          data.push({ hour: time_, readings: existingEntry.readings });
        } else {
          data.push({ hour: time_, readings: 0 });
        }
      });
      return data;
    });
  };

  const [app, setApp] = useState([
    { applience: "", consumption: "", cost: "" },
  ]);

  const setAppliencesStatistics = async () => {
    const payloads = await fetch(
      `http://localhost:3001/payload/analytics/appliences`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applience_id: applienceId }),
      }
    );
    const results = await payloads.json();
    console.log("Payloads RESULT: ", results);
    let object_ = [];
    applienceId.forEach((result) => {
      let array = [];
      results.forEach((item) => {
        if (item.applience_id == result) {
          const json = JSON.parse(item.data);
          const consumption = json.apower / 1000;
          array.push(consumption);
        }
      });
      let sum = 0;
      let duration = array.length;
      array.forEach((item) => {
        sum += item;
      });
      let rate = (1.77 / 60) * duration;
      let cost = sum * rate;
      object_.push({
        applience_id: result,
        data: sum,
        cost: cost,
        duration,
      });
    });
    setObject(object_);
    console.log("Object: ", object);
  };

  // Fetch user appliences
  // useEffect(() => {
  //   userAppliences();
  // }, []);
  // console.log("Payload: ", payload);
  // Create a useeffect for device1
  useEffect(() => {
    payload1();
    setAppliencesStatistics();
    console.log("Date changed to: ", date);
  }, [hour]);
  useEffect(() => {
    payload2();
    console.log("Date changed to: ", date);
  }, [hour]);

  const dataObject = {
    labels: label,
    datasets: [
      {
        label: appliance1,
        data: data.map((data) => data.readings),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.1,
      },
      {
        label: appliance2,
        data: data_.map((data) => data.readings),
        borderColor: "rgb(54, 12, 235)",
        backgroundColor: "rgba(54, 12, 235, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: "ctrl",
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
          drag: true,
          scaleMode: "x",
        },
        pan: {
          enabled: true,
          mode: "y",
          speed: 10,
          threshold: 10,
          modifierKey: "shift",
        },
      },
    },
  };

  console.log("Ids: ", object);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="analytics-container">
        <div className="analytics-content">
          <div
            style={{
              background: "white",
              boxShadow:
                "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "25px",
              marginBottom: "10px",
            }}
          >
            <h2>Filter data</h2>
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "49%",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              <select
                name=""
                id=""
                onChange={(e) => {
                  // console.log(e.target.value);
                  setAppliance1(e.target.value);
                  // console.log("Selected brand: ", e.target.value);
                  const filteredAppliences = appliences.filter(
                    (applience) => applience.applience_brand == e.target.value
                  );
                  // console.log("Filtered Appliences: ", filteredAppliences);
                  setVariants(filteredAppliences);
                }}
              >
                <option value="">Device 1 Brand</option>
                {appliences.map((applience, index) => {
                  return (
                    <option value={applience.applience_brand} key={index}>
                      {applience.applience_brand}
                    </option>
                  );
                })}
              </select>{" "}
              <select
                name=""
                id=""
                onChange={(e) => {
                  let selectedApplience = variants.filter(
                    (variant) => variant.applience_variant == e.target.value
                  );
                  // console.log("selected: ", selectedApplience[0].applience_id);
                  setApplienceId1(selectedApplience[0].applience_id);
                }}
              >
                <option value="">Device 1 Variant</option>
                {variants.map((applience, index) => {
                  return (
                    <option value={applience.applience_variant} key={index}>
                      {applience.applience_variant}
                    </option>
                  );
                })}
              </select>{" "}
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const year = date.getFullYear();
                  const month =
                    date.getMonth() < 9
                      ? `0${date.getMonth() + 1}`
                      : date.getMonth() + 1;
                  const day =
                    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                  setDate(`${year}/${month}/${day}`);
                }}
              />
              {/* Device2 */}
              <br />
              <select
                name=""
                id=""
                onChange={(e) => {
                  // console.log(e.target.value);
                  setAppliance2(e.target.value);
                  // console.log("Selected brand: ", e.target.value);
                  let filteredAppliences = appliences.filter(
                    (applience) => applience.applience_brand == e.target.value
                  );
                  // console.log("Filtered Appliences: ", filteredAppliences);
                  setVariants_(filteredAppliences);
                }}
              >
                <option value="">Device 2 Brand</option>
                {appliences.map((applience, index) => {
                  return (
                    <option value={applience.applience_brand} key={index}>
                      {applience.applience_brand}
                    </option>
                  );
                })}
              </select>{" "}
              <select
                name=""
                id=""
                onChange={(e) => {
                  let selectedApplience = variants_.filter(
                    (variant) => variant.applience_variant == e.target.value
                  );
                  // console.log("selected: ", selectedApplience[0].applience_id);
                  setApplienceId2(selectedApplience[0].applience_id);
                }}
              >
                <option value="">Device 2 Variant</option>
                {variants_.map((applience, index) => {
                  return (
                    <option value={applience.applience_variant} key={index}>
                      {applience.applience_variant}
                    </option>
                  );
                })}
              </select>
              <input
                type="date"
                name=""
                id=""
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  const year = date.getFullYear();
                  const month =
                    date.getMonth() < 9
                      ? `0${date.getMonth() + 1}`
                      : date.getMonth() + 1;
                  const day =
                    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
                  setDate_(`${year}/${month}/${day}`);
                }}
              />
              <br />
              <select
                name=""
                id=""
                onChange={(e) => {
                  const value = e.target.value.split(":");
                  const hour = value[0];
                  sethour(e.target.value);
                  setLabels(() => {
                    let time = [];
                    for (let i = 0; i < 60; i++) {
                      if (i < 10) {
                        time.push(`${hour}:0${i}`);
                      } else {
                        time.push(`${hour}:${i}`);
                      }
                    }
                    return time;
                  });
                }}
              >
                <option value="">Hour</option>
                {labels.map((label, index) => (
                  <option key={index}>{label}</option>
                ))}
              </select>
              {/* <button>Filter Data</button> */}
            </div>
          </div>
          <div className="analytics-content-header">
            <h2>Analytics</h2>
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
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                boxShadow: "0 10px 10px 10px lightgrey",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <div className="analytics-content-header">
                <h2>Consumption Energy(Kw/h)</h2>
              </div>
              <Line
                style={{ width: "700px", height: "700px" }}
                data={dataObject}
                options={options}
              />
            </div>
          </div>
          <div className="analytics-content-header">
            <h2>User Devices Statistics</h2>
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
            <table>
              <thead>
                <tr>
                  <td>Brand</td>
                  <td>Variant</td>
                  <td>Duration(Minutes)</td>
                  <td>Total Consumption(Kw/h)</td>
                  <td>Total Cost(Rands)</td>
                </tr>
              </thead>
              <tbody>
                {/* Iterate through user registered deivces */}
                {appliences.map((appliece, index) => (
                  <tr key={index}>
                    <td>{appliece.applience_brand}</td>
                    <td>{appliece.applience_variant}</td>
                    <td>
                      {object.length > 0 ? (
                        <>
                          {object
                            .filter(
                              (obj) => obj.applience_id == appliece.applience_id
                            )
                            .map((result, index) => (
                              <span key={index}>{result.duration}</span>
                            ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>
                      {object.length > 0 ? (
                        <>
                          {object
                            .filter(
                              (obj) => obj.applience_id == appliece.applience_id
                            )
                            .map((result, index) => (
                              <span key={index}>{result.data}</span>
                            ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td>
                      {object.length > 0 ? (
                        <>
                          {object
                            .filter(
                              (obj) => obj.applience_id == appliece.applience_id
                            )
                            .map((result, index) => (
                              <span key={index}>{result.cost}</span>
                            ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
