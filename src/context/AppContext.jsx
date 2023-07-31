import { createContext, useState, useEffect, useContext } from "react";

//Export the context instance

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const [socket, setSocket] = useState('');
  const socket = new WebSocket("ws://localhost:3001");
  // useEffect(() => {

  //   return () => {
  //     setSocket(new WebSocket("ws://localhost:3001"));
  //   };
  // },[]);

  return (
    <AppContext.Provider
      value={{
        socket,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
