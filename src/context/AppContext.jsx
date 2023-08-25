import {
  useState,
  createContext,
  useRef,
  useCallback,
  useContext,
  useEffect,
} from "react";
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
  const [error, setError] = useState("");
  let storage = sessionStorage;
  // let authenticated = storage.getItem("authenticated");
  const [authenticated, setAuthenticated] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const { name, email, password, confirmPassword } = inputValue;
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [chartData_, setChartData_] = useState([]);
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

  const SignUpSubmit = (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      }).then((response) => {
        if (!response.ok) {
          console.log(response.status);
        } else {
          console.log("User created and directed to dashboard");
          // authenticated.current = true;
          setAuthenticated(true);
          setUser(inputValue);
          navigate("/dashboard/dashboard/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Context for when user login
  const LoginOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const LoginSubmit = (e) => {
    e.preventDefault();
    try {
      fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValue),
      }).then((response) => {
        if (!response.ok) {
          console.log(response.status);
        } else {
          console.log("User logged in successfully");
          setAuthenticated(true);
          setUser(inputValue);
          navigate("/dashboard/dashboard/dashboard");
        }
      });
    } catch (error) {
      console.log(error);
    }
    setAuthenticated(true);
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
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
    labels: [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
    ],
    datasets: [
      {
        label: "Device1 (Consumption)",
        data: chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Device2 (Consumption)",
        data: chartData2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const generateReport = useCallback(async () => {
    const link = document.createElement("a");
    // link.download = "chart.png";
    link.href = chart_ref.current.toBase64Image();
    link.click();
    setChart_image(chart_ref.current.toBase64Image());
    fetch("http://localhost:3001/consumptions")
      .then((response) => response.json())
      .then((results) => {
        results.forEach((result) => {
          let payload = JSON.parse(result["payload"]);
          let rslt = payload["result"];
          let switch_0 = rslt["switch:0"];
          let aenergy = switch_0["aenergy"];
          let total_consumption = aenergy["total"];
          setChartData_((prevData) => [...prevData, total_consumption]);
        });
      });
  }, []);

  useEffect(() => {
    let even = chartData_.filter((data, index) => index % 2 == 0);
    let odd = chartData_.filter((data, index) => index % 2 != 0);
    setChartData(even);
    setChartData2(odd);
  },[chartData_]);

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
        error,
        inputValue,
        user,
        name,
        email,
        password,
        confirmPassword,
        isErrorVisible,
        errorMessage,
        isLoading,
        authenticated,
        chartData,
        setIsErrorVisible,
        togglePasswordVisibility,
        SignUpOnChange,
        SignUpSubmit,
        LoginOnChange,
        LoginSubmit,
        generateReport,
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
