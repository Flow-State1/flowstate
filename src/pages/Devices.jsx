import React, { useContext } from "react";
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
    LoginSubmit,
    isLoading,
    isTabletOrLaptop,
    passwordVisible,
    deviceInfo,
    errortext,
    errortext2,
    handleDeviceRegistration,
  } = useContext(AppContext);

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      <div className="login-card">
        <div className="login-card-content">
          <img
            src={logo}
            alt="logo"
            className="logo"
            style={{ width: isTabletOrLaptop ? "18rem" : "14rem" }}
          />
          <div className="logo-title">
            <h1>Flow State</h1>
          </div>

          <div className="login-form" >
            <h1 className="login-card-title">Select Devices </h1>
            <input
              type="test"
              placeholder="Device 1 Brand"
                onChange={(e)=>{
                    deviceInfo.device_1.brand = e.target.value;
                }}
              className="login-input"
              style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
            />
            <input
              type="text"
              name="text"
              placeholder="Device 1 Variant/Alias"
              onChange={(e)=>{
                deviceInfo.device_1.alias = e.target.value;
            }}
              className="login-input"
              style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
            />
           
            {/* Device 2 details */}
            <input
              type="test"
              placeholder="Device 2 Brand"
              onChange={(e)=>{
                deviceInfo.device_2.brand = e.target.value;
            }}
              className="login-input"
              style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
            />
            <input
              type="text"
              name="text"
              placeholder="Device 2 Variant/Alias"
              onChange={(e)=>{
                deviceInfo.device_2.alias = e.target.value;
            }}
              className="login-input"
              style={{ width: isTabletOrLaptop ? "30rem" : "80%" }}
            />
            <h1 className="login-card-title">Or Select already registered devices</h1>
            <select
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                width: "75%",
              }}
              name=""
              id=""
            >
              <option value="">Device 1</option>
            </select>
            <br />
            <select
              style={{
                border: "1px solid black",
                borderRadius: "5px",
                width: "75%",
              }}
              name=""
              id=""
            >
              <option value="">Device 2</option>
            </select>
            <br />
            <button
            onClick={()=>handleDeviceRegistration()}
              className="login-button"
              style={{ width: isTabletOrLaptop ? "15rem" : "50%" }}
              disabled={isLoading}
            >
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Continue"}
            </button>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default React.memo(Devices);
