import { createContext, useState, useContext } from "react";
import SnakBar from "../components/SnakBar";

export const SnakBarContext = createContext({});

export const SnakBarProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const showHideAlert = (msg) => {
    setAlert(true);
    setMsg(msg);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <SnakBarContext.Provider value={{ showHideAlert }}>
      <SnakBar alert={alert} msg={msg} />
      {children}
    </SnakBarContext.Provider>
  );
};
export const useSnakBar = () => {
  return useContext(SnakBarContext);
};
