export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: "Landing" | "Home" | "Transfer" | "Statement") => void;
}

export const initialState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  activeTab: "Landing",
  setActiveTab: () => {},
};

export interface SlideInTextProps {
  children: React.ReactNode;
  delay?: number;
}
