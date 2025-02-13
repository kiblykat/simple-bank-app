import { createContext, useState } from "react";
import { GlobalContextType, initialState } from "./types/globalContextTypes";
import { ReactNode } from "react";

const GlobalContext = createContext<GlobalContextType>(initialState);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const context = {
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
