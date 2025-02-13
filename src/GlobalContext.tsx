import { createContext, useState } from "react";
import {
  GlobalContextType,
  initialGlobalState,
} from "./types/globalContextTypes";
import { ReactNode } from "react";

const GlobalContext = createContext<GlobalContextType>(initialGlobalState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<
    "Landing" | "Home" | "Transfer" | "Statement"
  >("Landing");

  const context = {
    isLoggedIn,
    setIsLoggedIn,
    activeTab,
    setActiveTab,
    isMenuOpen,
    setIsMenuOpen,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
