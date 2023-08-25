import { useState, createContext, useRef, useCallback } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useNavigate, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  // Context for signing up user and keeping them in state
  const isTabletOrLaptop = useMediaQuery({ query: "(min-width: 768px)" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const SignUpOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const SignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        fetch("http://localhost:3001/users/signup",{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(inputValue)
        }).then((response) => {
            if(!response.ok) {
                response.json().then(data => {
                    console.log(data.message);
                    setErrorMessage(data.message);
                    setIsErrorVisible(true);
                });
            }
            else {
                console.log("User created and directed to dashboard");
                setUser(inputValue);
                navigate('/dashboard/dashboard/dashboard');
            }
        });
    }
    catch(error) {
        console.log(error);
    }

    setInputValue({
        ...inputValue,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    console.log(isLoading);
    setIsLoading(false);
  };

  // Context for when user login

  const LoginOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      fetch("http://localhost:3001/users/login", {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(inputValue),
      }).then((response) => {

        if(!response.ok) {
          response.json().then(data => {
            console.log(data.message);
            setErrorMessage(data.message);
            setIsErrorVisible(true);
          });
        }
        else {
          console.log("User logged in successfully");
          setUser(inputValue);
          navigate('/dashboard/dashboard/dashboard');
        }

      })

    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
    console.log(isLoading);
    setIsLoading(false);
  };

  // Context for the live charts
  const [payload, setPayload] = useState([]);
  const [payload_, setPayload_] = useState([]);
  //State variable for device shellyplus1pm-a8032ab1196
  const [data, setData] = useState([]);
  const [voltage, setVoltage] = useState();
  const [apower, setPower] = useState();
  const [current, setCurrent] = useState();
  const [consumption, setConsumption] = useState([]);
  const [minutes_ts, setMinutes_ts] = useState();
  const [cost, setCost] = useState(0);
  //State variable for device  shellyplus1pm-7c87ce719ccc
  const [data_, setData_] = useState([]);
  const [voltage_, setVoltage_] = useState();
  const [apower_, setPower_] = useState();
  const [current_, setCurrent_] = useState();
  const [consumption_, setConsumption_] = useState([]);

  // Context for the report page
  let chart_ref = useRef(null);
  let [chart_image, setChart_image] = useState("");
  const chart_data_object = {
    labels: ["2011", "2012", "2013"],
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: [10, 20, 35],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: [5, 15, 45],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const generateReport = useCallback(() => {
    const link = document.createElement("a");
    // link.download = "chart.png";
    link.href = chart_ref.current.toBase64Image();
    link.click();
    setChart_image(chart_ref.current.toBase64Image());
  }, []);

  return (
    <AppContext.Provider
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
        chart_data_object,
        chart_image,
        chart_ref,
        isTabletOrLaptop,
        passwordVisible,
        inputValue,
        user,
        name,
        email,
        password,
        confirmPassword,
        isErrorVisible,
        errorMessage,
        isLoading,
        setIsErrorVisible,
        togglePasswordVisibility,
        isLoading,
        isErrorVisible,
        errorMessage, 
        setErrorMessage,
        setIsErrorVisible,
        SignUpOnChange,
        SignUpSubmit,
        LoginOnChange,
        LoginSubmit,
        generateReport,
        setIsLoading,
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
        setCost,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
