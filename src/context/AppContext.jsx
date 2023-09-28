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
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
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
  const [brands, setBrands] = useState([]);
  const [variants, setVariants] = useState([]);
  const [c_cost, setc_Cost] = useState(0);
  const [isdevicesRegistered, setIsDeviceRegistered] = useState(false);
  const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
  };
  const [devicesRegistered, setDevicesRegisters] = useState({
      device_1: false,
      device_2: false,
  });
  const [deviceInfo, setDeviceInfo] = useState({
      device_1: {
          brand: "",
          alias: "",
      },
      device_2: {
          brand: "",
          alias: "",
      },
  });

  const [errortext, setErrorText] = useState();
  const [errortext2, setErrorText2] = useState();

  const SignUpOnChange = (e) => {
      const { name, value } = e.target;
      setInputValue({
          ...inputValue,
          [name]: value,
      });
  };

  const handleDeviceRegistration = () => {
      if (
          deviceInfo.device_1.brand != "" &&
          deviceInfo.device_2.brand != "" &&
          deviceInfo.device_1.alias != "" &&
          deviceInfo.device_2.alias != ""
      ) {
          console.log("Devices Registered");
          devicesRegistered.device_1 = true;
          devicesRegistered.device_2 = true;
          // Device1: shellyplus1pm-a8032ab11964 Device2: shellyplus1pm-7c87ce719ccc
          const data = {
              device: 1,
              id: "shellyplus1pm-a8032ab11964",
              applience_brand: deviceInfo.device_1.brand,
              applience_variant: deviceInfo.device_1.alias,
              data: {
                  apower: 0,
                  voltage: 0,
                  current: 0,
                  aenergy: 0,
              },
          };
          const data2 = {
              device: 2,
              id: "shellyplus1pm-7c87ce719ccc",
              applience_brand: deviceInfo.device_2.brand,
              applience_variant: deviceInfo.device_2.alias,
              data: {
                  apower: 0,
                  voltage: 0,
                  current: 0,
                  aenergy: 0,
              },
          };
          fetch("http://localhost:3001/payload/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
          }).then((response) => {
              if (!response.ok) {
                  response.json().then((data) => {
                      devicesRegistered.device_1 = true;
                      devicesRegistered.device_2 = true;
                      // console.log(data.message);
                      setErrorText(data.message);
                  });
              }
          });
          fetch("http://localhost:3001/payload/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data2),
          }).then((response) => {
              if (!response.ok) {
                  response.json().then((data) => {
                      // console.log(data.message);
                      setErrorText(data.message);
                  });
              } else {
                  console.log("Second Fetch is running");
              }
          })
          fetch(`http://localhost:3001/users/${user.id}`,{
              method:"POST",
              headers:{
                  "Content-Type": "application/json",
              }
          }).then((response) => {
              if (!response.ok) {
                  response.json().then((data) => {
                      // console.log(data.message);
                      setErrorText(data.message);
                  });
              } else {
                  console.log("Third Fetch is running");
                  setIsDeviceRegistered(true);
                  navigate("/dashboard/dashboard/dashboard");
              }
          })
      } else {
          setErrorText2("Please make sure all fields have values");
      }
  };

  const handleDevicePick = () => {
      console.log("pressed");
      if (
          deviceInfo.device_1.brand != "" &&
          deviceInfo.device_2.brand != "" &&
          deviceInfo.device_1.alias != "" &&
          deviceInfo.device_2.alias != ""
      ) {
          console.log("Devices picked");
          devicesRegistered.device_1 = true;
          devicesRegistered.device_2 = true;
          navigate("/dashboard/dashboard/dashboard");
      } else {
          console.log("Pressed and has error");
          setErrorText2("Please make sure all fields are selected");
      }
    };

const SignUpSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          fetch("http://localhost:3001/users/signup", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(inputValue),
          }).then((response) => {
              if (!response.ok) {
                  response.json().then((data) => {
                      console.log(data.message);
                      setErrorMessage(data.message);
                      setIsErrorVisible(true);
                  });
              } else {
                  console.log("User created and directed to dashboard");
                  setUser(inputValue);
                  navigate("/devices");
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

const [UserId, setUserId] = useState(null);

const LoginSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputValue),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      setErrorMessage(errorData.message);
      setIsErrorVisible(true);
    } else {
      console.log("User logged in successfully");
      const responseData = await response.json();
      console.log(responseData.data.user);
      const user = responseData.data.user;
      console.log(user);
      const UserId = user.id;
      setUserId(UserId);
      const token = responseData.token;
      localStorage.setItem("authToken", token);
      setAuthenticated(true);
      setUser(responseData.data.user);
      navigate("/devices");
    }
  } catch (error) {
    console.log(error);
  }
  setAuthenticated(true);
  setInputValue({
    ...inputValue,
    email: "",
    password: "",
  });
  console.log(isLoading);
  setIsLoading(false);
};

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const ResetOnChange = (e) => {
  const { name, value } = e.target;
  setInputValue({
    ...inputValue,
    [name]: value,
  });
};

//Contains of a bug, only returns a 404 respond
const HandleResetPassword = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    fetch("http://localhost:3001/users/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
    }).then((response) => {
      if (!response.ok) {
        response.json().then((data) => {
          console.log(data.message);
          setErrorMessage(data.message);
        });
      } else {
        console.log("Email exists");
        navigate("/newpassword");
      }
    });
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

const [updateInput, setUpdateInput] = useState({
  name: "",
  email: "",
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setUpdateInput((prevInput) => ({
    ...prevInput,
    [name]: value,
  }));
};

const [selectedFile, setSelectedFile] = useState(null);
const [profilePictureURL, setProfilePictureURL] = useState(null);

const handleFileChange = (e) => {
  const file = e.target.files[0];
  setSelectedFile(file);
};

const handlePictureSubmit = async (e) => {
  e.preventDefault();
  const token = getAuthToken();
  console.log('function called: picture uploaded');
  if (!selectedFile) {
    console.log('Please select a file to upload.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    const response = await fetch('http://localhost:3001/users/upload-profile-picture', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('Profile picture uploaded successfully.');
      const responseData = await response.json();
      const uploadedImageURL = responseData.imageURL;
      setProfilePictureURL(uploadedImageURL);
    } else {
      console.log('Error uploading profile picture.');
    }
  } catch (error) {
    console.error('Error uploading profile picture:', error);
  }
}

const HandleSaveChanges = async (e) => {
  e.preventDefault();
  handlePictureSubmit(e);
  setIsLoading(true);
  const token = getAuthToken();
  try {
    console.log(updateInput);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await fetch("http://localhost:3001/users/updateMe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({updateInput}),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Update failed:", errorData.message);
      setErrorMessage(errorData.message);
    } else {
      console.log("Details updated successfully");
    }
  } catch (error) {
    console.log(error);
  }
  setUpdateInput({
    ...updateInput,
    name: "",
    email: "",
  });
  console.log(isLoading);
  setIsLoading(false);
};

const [passwordInput, setPasswordInput] = useState({
  currentPassword: "",
  password: "",
  confirmPassword: "",
});

const updateOnChange = (e) => {
  const { name, value } = e.target;
  setPasswordInput((prevInput) => ({
    ...prevInput,
    [name]: value,
  }));
};

const HandlePasswordChange = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const token = getAuthToken();
  try {
    console.log(passwordInput);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const response = await fetch("http://localhost:3001/users/updateMyPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization : `Bearer ${token}`,
      },
      body: JSON.stringify(passwordInput),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      setErrorMessage(errorData.message);
      setIsErrorVisible(true);
    } else {
      console.log("Password updated successfully");
    }
  }catch(error) {
    console.log(error);
  }
  setPasswordInput({
    ...passwordInput,
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
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
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
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

let labels = [
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
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const retrieveAll = () => {
  fetch("http://localhost:3001/consumptions").then((response) =>
    response.json()
  );
};

    const generateReport = useCallback(async () => {
      const link = document.createElement("a");
      // link.download = "chart.png";
      link.href = chart_ref.current.toBase64Image();
      link.click();
      setChart_image(chart_ref.current.toBase64Image());
      fetch("http://localhost:3001/consumptions/device1")
          .then((response) => response.json())
          .then((results) => {
              results.forEach((result) => {
                  let payload = JSON.parse(result["payload"]);
                  let rslt = payload["result"];
                  let switch_0 = rslt["switch:0"];
                  let aenergy = switch_0["aenergy"];
                  let total_consumption = aenergy["total"];
                  setChartData((prevData) => [...prevData, total_consumption]);
              });
          });
      fetch("http://localhost:3001/consumptions/device2")
          .then((response) => response.json())
          .then((results) => {
              results.forEach((result) => {
                  let payload = JSON.parse(result["payload"]);
                  let rslt = payload["result"];
                  let switch_0 = rslt["switch:0"];
                  let aenergy = switch_0["aenergy"];
                  let total_consumption = aenergy["total"];
                  setChartData2((prevData) => [...prevData, total_consumption]);
              });
          });
  }, []);

  const [obj, setObj] = useState();
  const [obj2, setObj2] = useState();

  // For calculating costs of devices it returns the total current and voltage of the devices
  const costFunction = () => {
      fetch("http://localhost:3001/consumptions/1")
          .then((response) => response.json())
          .then((results) => {
              // console.log(results);
              let resultArray = [];

              for (let out = 0; out < results.length; out++) {
                  let totalCurrent = 0;
                  let totalVoltage = 0;

                  for (let i = 0; i < results[out].length; i++) {
                      // console.log(results[out][i]["current"]);
                      totalCurrent += results[out][i]["current"];
                      totalVoltage += results[out][i]["voltage"];
                  }
                  resultArray.push({ totalCurrent, totalVoltage });
              }
              // console.log(resultArray[0]);
              setObj(resultArray);
              // console.log(resultArray);
          });
      fetch("http://localhost:3001/consumptions/2")
          .then((response) => response.json())
          .then((results) => {
              // console.log(results);
              let resultArray = [];

              for (let out = 0; out < results.length; out++) {
                  let totalCurrent = 0;
                  let totalVoltage = 0;

                  for (let i = 0; i < results[out].length; i++) {
                      // console.log(results[out][i]["current"]);
                      totalCurrent += results[out][i]["current"];
                      totalVoltage += results[out][i]["voltage"];
                  }
                  resultArray.push({ totalCurrent, totalVoltage });
              }
              setObj2(resultArray);
              // console.log(resultArray);
          });
  };

  // Analytics page
  const [aenergy1, setAenergy1] = useState([]);
  const [aenergy2, setAenergy2] = useState([]);
  const [apower1, setApower1] = useState([]);
  const [apower2, setApower2] = useState([]);
  const [acurrent1, setAcurrent1] = useState([]);
  const [acurrent2, setAcurrent2] = useState([]);
  const [avoltage1, setAvoltage1] = useState([]);
  const [avoltage2, setAvoltage2] = useState([]);
  const generateReadings = () => {
      fetch("http://localhost:3001/consumptions/device1")
          .then((response) => response.json())
          .then((result) => {
              //   console.log(result[0]);
              for (let i = 0; i < result[0].length; i++) {
                  // console.log(result[i].length);
                  for (let j = 0; j < result[i].length; j++) {
                      // console.log(result[i][j]);
                      let energy = result[i][j]["aenergy"]["total"];
                      setAenergy1((prevEnergy) => [...prevEnergy, energy]);
                      setApower1((prevEnergy) => [...prevEnergy, result[i][j]["apower"]]);
                      setAcurrent1((prevEnergy) => [
                          ...prevEnergy,
                          result[i][j]["current"],
                      ]);
                      setAvoltage1((prevEnergy) => [
                          ...prevEnergy,
                          result[i][j]["voltage"],
                      ]);
                  }
              }
          });
      fetch("http://localhost:3001/consumptions/device2")
          .then((response) => response.json())
          .then((result) => {
              //   console.log(result[0]);
              for (let i = 0; i < result[0].length; i++) {
                  // console.log(result[i].length);
                  for (let j = 0; j < result[i].length; j++) {
                      // console.log(result[i][j]);
                      let energy = result[i][j]["aenergy"]["total"];
                      setAenergy2((prevEnergy) => [...prevEnergy, energy]);
                      setApower2((prevEnergy) => [...prevEnergy, result[i][j]["apower"]]);
                      setAcurrent2((prevEnergy) => [
                          ...prevEnergy,
                          result[i][j]["current"],
                      ]);
                      setAvoltage2((prevEnergy) => [
                          ...prevEnergy,
                          result[i][j]["voltage"],
                      ]);
                  }
              }
          });
  };

//Chat-bot context, functions and api-key
  const API_KEY = "";

  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
      {
          message:
              "Hi there I am Flow-Bot, let me help you learn more about electricity!",
          sender: "Flow-Bot",
      },
  ]);

  const handleSend = async (message) => {
      const newMessage = {
          message: message,
          sender: "user",
          direction: "outgoing",
      };

      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setTyping(true);
      await processMessagetoChatGPT(newMessages);
  };

  let lastApiRequestTimestamp = 0;
  const MINIMUM_TIME_BETWEEN_REQUESTS = 1000 / 3;

  const processMessagetoChatGPT = async (chatMessages) => {
      const now = Date.now();
      const timeSinceLastRequest = now - lastApiRequestTimestamp;

      if (timeSinceLastRequest < MINIMUM_TIME_BETWEEN_REQUESTS) {
          await new Promise((resolve) =>
              setTimeout(
                  resolve,
                  MINIMUM_TIME_BETWEEN_REQUESTS - timeSinceLastRequest
              )
          );
      }

      lastApiRequestTimestamp = Date.now();
      let apiMessages = chatMessages.map((messageObject) => {
          let role = "";
          if (messageObject.sender === "Flow-Bot") {
              role = "assistant";
          } else {
              role = "user";
          }
          return { role: role, content: messageObject.message };
      });

      const systemMessage = {
          role: "system",
          content: "Explain all concepts like I am 10 years old",
      };

      const apiRequestBody = {
          model: "gpt-3.5-turbo",
          messages: [systemMessage, ...apiMessages],
      };

      await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
              Authorization: "Bearer " + API_KEY,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
      })
          .then((data) => data.json())
          .then((data) => {
              console.log(data);
              console.log(data.choices[0].message.content);
              setMessages([
                  ...chatMessages,
                  {
                      message: data.choices[0].message.content,
                      sender: "Flow-Bot",
                  },
              ]);
              setTyping(false);
          });
  };


const [logoutSuccess, setLogoutSuccess] = useState(false);

const handleLogout = async (e) => {
  e.preventDefault();
  //const token = getAuthToken();
  try {
    const response = await fetch('http://localhost:3001/users/logout', {
      method: 'GET',
      credentials: 'include',
    })

    if(response.status == 200) {
      setLogoutSuccess(true);
      console.log("Logged out successfully");
      navigate('/');
    }
    else {
      setLogoutSuccess(false);
    }
  }catch(error) {
    console.error('Error logging out:', error);
  }
};

  const [isCon, setCon] = useState(true);
  const [labels_, setLabels] = useState([]);


  return (
      <AppContext.Provider
          value={{
              // dataObject,
              // dashRoutes,setDashroutes,
              labels_,
              isCon, setCon,
              setLabels,
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
              authenticated,
              chartData,
              isLoading,
              isErrorVisible,
              errorMessage,
              obj,
              obj2,
              aenergy1,
              acurrent1,
              apower1,
              avoltage1,
              aenergy2,
              apower2,
              acurrent2,
              avoltage2,
              labels,
              devicesRegistered,
              deviceInfo,
              errortext,
              errortext2,
              brands,
              setBrands,
              variants,
              navigate,
              isdevicesRegistered,
              setIsDeviceRegistered,
              setVariants,
              handleDevicePick,
              setErrorText,
              handleDeviceRegistration,
              setDeviceInfo,
              setDevicesRegisters,
              setAenergy1,
              generateReadings,
              togglePasswordVisibility,
              costFunction,
              setErrorMessage,
              setIsErrorVisible,
              SignUpOnChange,
              SignUpSubmit,
              LoginOnChange,
              LoginSubmit,
              HandleResetPassword,
              ResetOnChange,
              HandleSaveChanges,
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
              typing,
              messages,
              handleSend,
              c_cost,
              setc_Cost,
          }}
      >
          {props.children}
      </AppContext.Provider>
  );
};