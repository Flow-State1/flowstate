import { useContext, useEffect, useState } from "react";
import "./Registration.css";
import { AppContext } from "../context/AppContext";

const Registration = () => {
  const {
    deviceInfo,
    errortext,
    errortext2,
    handleDeviceRegistration,
    handleDevicePick,
    brands,setBrands,
    variants,setVariants,
    
  } = useContext(AppContext);

  return (
    <div className="reg-container">
      <div className="registration">
        <h3>
          Please Register your device/ Select from already registered devices
        </h3>
        <div>
          <h3 style={{ textAlign: "center", marginTop: "25px" }}>
            Register Devices
          </h3>
          <div className="devices-registration">
            <div className="device-1">
              <h3>Device 1</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="">Device Brand</label>
                    </td>
                    <td>
                      <input
                        required
                        className="input-registration"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => {
                          deviceInfo.device_1.brand = e.target.value;
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Device Variant/Alias</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        required
                        className="input-registration"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => {
                          deviceInfo.device_1.alias = e.target.value;
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="device-2">
              <h3>Device 2</h3>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="">Device Brand</label>
                    </td>
                    <td>
                      <input
                        required
                        className="input-registration"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => {
                          deviceInfo.device_2.brand = e.target.value;
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="">Device Variant/Alias</label>
                    </td>
                    <td>
                      {" "}
                      <input
                        required
                        className="input-registration"
                        type="text"
                        name=""
                        id=""
                        onChange={(e) => {
                          deviceInfo.device_2.alias = e.target.value;
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h3 style={{ textAlign: "center", color: "red" }}>{errortext}</h3>
          <div className="btn-container">
            {/* <button
              onClick={() => handleDeviceRegistration()}
              className="btn-register"
            >
              Register Devices
            </button> */}
                      <h3 style={{ textAlign: "center", marginTop: "25px" }}>
            Or
          </h3>
          </div>
          <h3 style={{ textAlign: "center", marginTop: "25px" }}>
            Pick from already registerd devices
          </h3>
          {/* <div className="devices-list">
            <div className="device-1">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="">Device 1</label>
                    </td>
                    <td>
                      {" "}
                      <select
                        className="input-registration"
                        name=""
                        id=""
                        onChange={(e) => {
                          deviceInfo.device_1.brand = e.target.value;
                        }}
                      >
                        <option value="">Device 1</option>
                        {brands.map((brands,index)=>(
                          <option key={index} value={brands}>
                              {brands}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="device-2">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="">Device 2</label>
                    </td>
                    <td>
                      {" "}
                      <select
                        className="input-registration"
                        name=""
                        id=""
                        onChange={(e) => {
                          deviceInfo.device_2.brand = e.target.value;
                        }}
                      >
                        <option value="">Device 2</option>
                        {brands.map((brand,index)=>(
                          <option key={index} value={brand}>
                              {brand}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div> */}
          <h3 style={{ textAlign: "center", color: "red" }}>{errortext2}</h3>
          <div className="btn-container">
            <button onClick={() => handleDeviceRegistration()} className="btn-register">
              Use Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
