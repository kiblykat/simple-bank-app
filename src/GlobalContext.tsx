import { createContext, useState } from "react";
import { GlobalContextType, initialState } from "./types/globalContextTypes";
import { ReactNode } from "react";

const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "Landing" | "Home" | "Transfer" | "Statement"
  >("Landing");

  const context = {
    isLoggedIn,
    setIsLoggedIn,
    activeTab,
    setActiveTab,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
