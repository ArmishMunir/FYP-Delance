import { createContext, useState } from "react";
import React from "react";

export default function ContextProvider({ children }) {
  const [userState, setUserState] = useState({
    email: "",
    metaAccount: "",
    isLoggedin: false,
  });

  const updateEmail = (email) => {
    setUserState((prevState) => ({
      ...prevState,
      email: email,
      isLoggedin: true,
    }));
  };

  return (
    <Context.Provider value={{ userState, updateEmail }}>
      {children}
    </Context.Provider>
  );
}

export const Context = createContext();
