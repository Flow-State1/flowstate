import { createContext, useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";

//Export the context instance

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const { socket } = useContext(AppContext);

  const [payload, setPayload] = useState([]);
  const [data, setData] = useState([]);
  const [voltage, setVoltage] = useState();
  const [apower, setPower] = useState();
  const [current, setCurrent] = useState();
  const [consumption, setConsumption] = useState([]);
  const time = new Date();
  const hour = time.getHours();
  const minutes =
    time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
  const [labels, setLabels] = useState([`${hour}:${minutes}`]);

  useEffect(() => {
    return () => {
      //Instance of the WebSocket

      let saved_time = `${hour}:${minutes}`;
      setInterval(() => {
        const c_time = new Date();
        const c_hour = c_time.getHours();
        const c_minutes =
          c_time.getMinutes() < 10
            ? `0${c_time.getMinutes()}`
            : c_time.getMinutes();

        if (saved_time != `${c_hour}:${c_minutes}`) {
          saved_time = `${c_hour}:${c_minutes}`;
          setLabels((prevLabel) => {
            if (prevLabel !== `${c_hour}:${c_minutes}`) {
              return [...prevLabel, `${c_hour}:${c_minutes}`];
            } else {
              return prevLabel;
            }
          });
        }
        setData((prevData) => [
          ...prevData,
          Math.floor(Math.random() * 100) + 1,
        ]);

        socket.send("Send me messages");
      }, 30000);

      //Listen for messages from web socket
      socket.addEventListener("message", (event) => {
        const json = JSON.parse(event.data);
        const result = json.result["switch:0"];
        const aenergy = result["aenergy"];
        const _consumption = aenergy["total"];
        console.log(_consumption);
        //Currently loggin out mutliple time, issue is with the websocket send ing messages and stuff need to fix that out later
        console.log(result);
        setPayload((prevLoad) => [...prevLoad, result]);
        setConsumption((prevConsumption) => [...prevConsumption, _consumption]);
        setCurrent(result["current"]);
        setPower(result["apower"]);
        setVoltage(result["voltage"]);
      });
    };
  }, []);

  const dataObject = {
    labels,
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: consumption,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <DashboardContext.Provider
        value={{
            payload,
            setPayload,
            data,
            setData,
            voltage,
            setVoltage,
            apower,
            setPower,
            current,
            setCurrent,
            consumption,
            setConsumption,
            labels,
            setLabels,
            dataObject,
        }}
    >
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
