/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "../styles.css";
import { motion } from "framer-motion";
import { AppContext } from "../../context/AppContext";
const Recommendations = () => {
  const [electronics, setElectronics] = useState([]);
  const [FilteredElectronics, setFilteredElectronics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [recommded, setRecommended] = useState("");
  const [recommded2, setRecommended2] = useState("");
  let avg1 = 0;
  let cos1 = 0;
  let cos2 = 0;
  let avg2 = 0;
  const { cost1, cost2, deviceInfo, consumption, consumption_ } =
    useContext(AppContext);

  useEffect(() => {
    fetch(`http://localhost:3001/electronics/`).then((response) =>
      response.json().then((result) => {
        // console.log("Results ", result);
        setElectronics(result);
        result.forEach((element) => {
          setCategories((prevElectronic) => {
            let count = 0;

            prevElectronic.forEach((electronic) => {
              if (electronic == element.electronic_caregory) {
                count++;
              }
            });

            if (count == 0) {
              return [...prevElectronic, element.electronic_caregory];
            } else {
              return prevElectronic;
            }
          });
        });
      })
    );
  }, []);

  const handleSelect = () => {
    // Fetch the appliences with specified category
    // console.log("Filtered electronics", electronics);
    console.log("Category: ", category);
    electronics.forEach((electronic) => {
      if (electronic.electronic_caregory == category) {
        setFilteredElectronics((prevE) => [...prevE, electronic]);
      }
    });

    if (consumption.length < 60 && consumption.length < 60) {
      alert(
        "We recommend that you have the device plugged in for atleast an hour and using the applience for a day or more, As this will help us compare the appliances, with recommended ones listed"
      );
      //   get the avarage consumption. Figure out an estimated hourly figure
      //   let n1 = consumption.length;
      //   let n2 = consumption_.length;
      //   let sum1 = 0;
      //   let sum2 = 0;
      //   consumption.forEach((element) => {
      //     sum1 = sum1 + element;
      //   });
      //   consumption_.forEach((element) => {
      //     sum2 = sum2 + element;
      //   });

      //   avg1 = sum1 / n1;
      //   avg2 = sum2 / n2;
      //   cos1 = avg1 * 1.77;
      //   cos2 = avg2 * 1.77;
    }
    // else get the avarage the hourly consumption,and compare it to the one with the filtered array devices and recommend the best saving one
    else {
      let n1 = consumption.length;
      let n2 = consumption_.length;
      let sum1 = 0;
      let sum2 = 0;
      console.log("Hopur has passed");
      consumption.forEach((element) => {
        // console.log("Sum1: ",sum1);
        sum1 = sum1 + element;
      });
      consumption_.forEach((element) => {
        // console.log("Sum2: ",sum2);
        sum2 = sum2 + element;
      });

      avg1 = sum1 / n1;
      avg2 = sum2 / n2;
      cos1 = avg1 * 1.77;
      cos2 = avg2 * 1.77;

      // console.log("cost1: ",cos1);
      // console.log("cost2: ",cos2);

      // FilteredElectronics.forEach((electronic) => {
      //   console.log("e: ", electronic.electronic_cost);
      //   if (electronic.electronic_cost < cos1) {
      //     console.log("Prev Recmmen1", recommded);
      //     setRecommended(electronic.electronic_variant);
      //   } else if (electronic.electronic_cost < cos2) {
      //     console.log("Prev Recmmen2", recommded2);
      //     setRecommended2(electronic.electronic_variant);
      //   } else if (electronic.electronic_cost > cos1) {
      //     console.log("Prev Recmmen3", recommded);
      //     setRecommended(deviceInfo.device_1.alias);
      //   } else if (electronic.electronic_cost > cos2) {
      //     console.log("Prev Recmmen4", recommded2);
      //     setRecommended2(deviceInfo.ddevice_2.alias);
      //   }
      // });
      for (let i = 0; i < FilteredElectronics.length; i++) {
        console.log("E: ", FilteredElectronics[i]);
        if (FilteredElectronics[i].electronic.electronic_cost < cos1) {
          setRecommended(FilteredElectronics[i].electronic.electronic_variant);
        } else if (FilteredElectronics[i].electronic.electronic_cost < cos2) {
          console.log("Prev Recmmen2", recommded2);
          setRecommended2(FilteredElectronics[i].electronic.electronic_variant);
        } else if (FilteredElectronics[i].electronic.electronic_cost > cos1) {
          console.log("Prev Recmmen3", recommded);
          setRecommended(deviceInfo.device_1.alias);
        } else if (FilteredElectronics[i].electronic.electronic_cost > cos2) {
          console.log("Prev Recmmen4", recommded2);
          setRecommended2(deviceInfo.ddevice_2.alias);
        }
      }
      console.log("Recomm1: ", recommded);
      console.log("Recomm2: ", recommded2);
    }
  };
  //   console.log(FilteredElectronics);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div
            style={{
              height: "100%",
              width: "100%",
              padding: "25px",
              background: "white",
            }}
            className="reg-container"
          >
            <h1>Generate Recommendations</h1>
            <select
              name=""
              id=""
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button onClick={() => handleSelect()}>Select Category</button>
            <p style={{ marginTop: "15px" }}>
              Please note that, consumption and cost will, vary based on how you
              use the electrical applience that you are using. The figures,
              below are collected from various site, some are provided by
              manufactures and they may differ from what you will get from using
              the suggested appliences
            </p>
            <>
              <table
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  padding: "8px",
                  marginTop: "20px",
                }}
              >
                <thead
                  style={{
                    border: "1px solid black",
                    borderCollapse: "collapse",
                    padding: "8px",
                  }}
                >
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        padding: "8px",
                      }}
                    >
                      Brand
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        padding: "8px",
                      }}
                    >
                      Variant
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        padding: "8px",
                      }}
                    >
                      Estimated Hourly Consumption(Kw/h)
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        padding: "8px",
                      }}
                    >
                      Estimated Hourly Cost
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {FilteredElectronics.map((electronic) => {
                    // console.log("Ele: ", electronic);

                    return (
                      <tr key={electronic._id}>
                        <td
                          style={{
                            border: "1px solid black",
                            borderCollapse: "collapse",
                            padding: "8px",
                          }}
                        >
                          {electronic.electronic_brand}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            borderCollapse: "collapse",
                            padding: "8px",
                          }}
                        >
                          {electronic.electronic_variant}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            borderCollapse: "collapse",
                            padding: "8px",
                          }}
                        >
                          {electronic.electronic_consumption}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            borderCollapse: "collapse",
                            padding: "8px",
                          }}
                        >
                          R {electronic.electronic_cost}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
            {recommded !== "" && recommded2 !== "" ? (
              <>
                <p
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {recommded} has proven to be a better device between it and{" "}
                  {deviceInfo.device1_alias}
                </p>
                <p>
                  {recommded2} has proven to be a better device between it and{" "}
                  {deviceInfo.device2_alias}
                </p>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Recommendations);
