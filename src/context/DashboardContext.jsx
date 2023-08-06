import { createContext, useState, useEffect, useContext } from "react";

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const [payload, setPayload] = useState([]);
  const [payload_, setPayload_] = useState([]);
  //State variable for device shellyplus1pm-a8032ab1196
  const [data, setData] = useState([]);
  const [voltage, setVoltage] = useState();
  const [apower, setPower] = useState();
  const [current, setCurrent] = useState();
  const [consumption, setConsumption] = useState([]);
  const [minutes_ts,setMinutes_ts] = useState();
  const [cost,setCost] = useState(0);
  //State variable for device  shellyplus1pm-7c87ce719ccc
  const [data_, setData_] = useState([]);
  const [voltage_, setVoltage_] = useState();
  const [apower_, setPower_] = useState();
  const [current_, setCurrent_] = useState();
  const [consumption_, setConsumption_] = useState([]);
//   const socket = new WebSocket("ws://localhost:3001");
  
  

  return (
    <DashboardContext.Provider
      value={{
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
        minutes_ts,
        cost,
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
        setMinutes_ts,
        setCost
        
      }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
