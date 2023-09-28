import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.png";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { AppContext } from "../context/AppContext";

const Devices = () => {
  const {
    isLoading,
    isTabletOrLaptop,
    deviceInfo,
    deviceInfo_,
    errortext,
    errortext2,
    handleDeviceRegistration,
    handleDevicePick,
    user,
    setErrorText,
  } = useContext(AppContext);

  const [appliances, setAppliances] = useState([]);
  const [appliances_, setAppliances_] = useState([]);
  const [variants,setVariants] = useState([]);
  const [variants_,setVariants_] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        response.json().then((data) => {
          // console.log(data.message);
          setErrorText(data.message);
        });
      } else {
        console.log("User session created");
      }
    });
    fetch("http://localhost:3001/appliences/").then((response) => {
      // console.log(response.json());
      if(response.ok){
        response.json().then((result) => {
          // console.log();
          // let appliences = result.appliances
          setAppliances(result.appliances);
          setAppliances_(result.appliances);
        })
      }
    }).catch((err)=>{
      console.log(err);
    })
  }, []);

  return (
    <motion.div
      className="device-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      <div className="device-card">
        <div className="device-card-content">
          <img
            src={logo}
            alt="logo"
            className="logo"
            style={{ width: isTabletOrLaptop ? "16rem" : "14rem" }}
          />
          <div className="device-title">
            <h1>Flow State</h1>
          </div>

          <div className="device-form">
            <div
              className="device-form-column"
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginRight: "80px",
              }}
            >
              <div style={{ marginRight: "50px" }}>
                <h1 className="device-card-title">Register Devices </h1>
                <input
                  type="test"
                  placeholder="Device 1 Brand"
                  onChange={(e) => {
                    deviceInfo.device_1.brand = e.target.value;
                  }}
                  className="login-input"
                  style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
                />
                <input
                  type="text"
                  name="text"
                  placeholder="Device 1 Variant/Alias"
                  onChange={(e) => {
                    deviceInfo.device_1.alias = e.target.value;
                  }}
                  className="login-input"
                  style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
                />

                {/* Device 2 details */}
                <input
                  type="test"
                  placeholder="Device 2 Brand"
                  onChange={(e) => {
                    deviceInfo.device_2.brand = e.target.value;
                  }}
                  className="login-input"
                  style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
                />
                <input
                  type="text"
                  name="text"
                  placeholder="Device 2 Variant/Alias"
                  onChange={(e) => {
                    deviceInfo.device_2.alias = e.target.value;
                  }}
                  className="login-input"
                  style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
                />
              </div>
              <div
                className="device-registered-select"
                style={{ borderLeft: "1px solid #ccc", paddingLeft: "50px" }}
              >
                <h1 className="device-card-title">Registered</h1>
                <select
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "150%",
                    marginBottom: "20px",
                  }}
                  name=""
                  onChange={(e) => {
                    let variants_ = appliances.filter((applience) => applience.applience_brand==e.target.value);
                    console.log("Appliences from brand ",e.target.value,": ",variants_);
                    setVariants(variants_)
                    deviceInfo.device_1.brand = e.target.value;
                  }}
                >
                  <option value="">Device 1</option>
                  {appliances.length > 0 
                  ?
                  appliances.map((appliance) => {
                      
                    return(
                      <option
                      key={appliance.applience_id}
                      value={appliance.applience_brand}
                    >
                      {appliance.applience_brand}
                    </option>
                    )
                }): (<></>)
                  }
                </select>
                <select
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "150%",
                    marginBottom: "20px",
                  }}
                  name=""
                  onChange={(e) => {
                    let variants = appliances.filter((applience) => applience.applience_brand==e.target.value);
                    console.log("Appliences from brand ",e.target.value,": ",variants);
                    deviceInfo.device_1.alias = e.target.value;
                  }}
                >
                  <option value="">Device 1 variant</option>
                  {
                    variants.length > 0
                    ?
                    variants.map((appliance) => {
                      
                      return(
                        <option
                        key={appliance.applience_id}
                        value={appliance.applience_variant}
                      >
                        {appliance.applience_variant}
                      </option>
                      )
                  }):(<></>)
                  }
                </select>
                <br />
                <select
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "150%",
                    marginBottom: "20px",
                  }}
                  name=""
                  onChange={(e) => {
                    let variants_ = appliances_.filter((applience) => applience.applience_brand==e.target.value);
                    console.log("Appliences from brand ",e.target.value,": ",variants_);
                    setVariants_(variants_)
                    deviceInfo.device_2.brand = e.target.value;
                  }}
                >
                  <option value="">Device 2</option>
                  {
                    appliances.length > 0
                    ?
                    appliances_.map((appliance) => {
                      
                      return(
                        <option
                        key={appliance.applience_id}
                        value={appliance.applience_brand}
                      >
                        {appliance.applience_brand}
                      </option>
                      )
                  }):(<></>)
                  }
                </select>
                <select
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    width: "150%",
                    marginBottom: "20px",
                  }}
                  name=""
                  onChange={(e) => {
                    let variants = appliances.filter((applience) => applience.applience_brand==e.target.value);
                    console.log("Appliences from brand ",e.target.value,": ",variants);
                    deviceInfo.device_2.alias = e.target.value;
                  }}
                >
                  <option value="">Device 2 variant</option>
                  {
                    variants_.length > 0?
                    variants_.map((appliance) => {
                      
                      return(
                        <option
                        key={appliance.applience_id}
                        value={appliance.applience_variant}
                      >
                        {appliance.applience_variant}
                      </option>
                      )
                  }):(<></>)
                  }
                </select>
              </div>
            </div>
            <br />
            <button
              onClick={() => handleDeviceRegistration()}
              className="device-button"
              style={{ width: isTabletOrLaptop ? "15rem" : "50%" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Devices);
