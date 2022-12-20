import React, { createContext } from "react";
export const MainContext = createContext();

const MainContextComponent = ({ children }) => {

  return <MainContext.Provider value={{obj:"asdsad"}}>
    {children}
    </MainContext.Provider>;
};

export default MainContextComponent;
