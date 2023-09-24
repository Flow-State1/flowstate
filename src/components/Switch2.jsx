import React, { useContext, useState } from "react";
import "./ToggleSwitch.css"; // Import your CSS file
import { AppContext } from "../context/AppContext";

function ToggleSwitch2({ deviceId }) {
 

  const {isOn,setIsOn} = useContext(AppContext);

  const handleToggle = () => {
    setIsOn((prevIsOn) => !prevIsOn);
    
    // Send a POST request to the server to toggle the device
    fetch(`http://localhost:3001/publish/switch/${deviceId}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(`id:Switch_End_Point,${error}`);
      });
  };

  return (
    <div className="toggle-container">
        <label className="toggle-label">Device {deviceId}</label>
        <label className="toggle-switch">
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider"></span>
    </label>
    </div>
  );
}

export default ToggleSwitch2;

