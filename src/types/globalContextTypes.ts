export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: "Landing" | "Home" | "Transfer" | "Statement") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (bool: boolean) => void;
}

export const initialGlobalState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  activeTab: "Landing",
  setActiveTab: () => {},
  isMenuOpen: false,
  setIsMenuOpen: () => {},
};

export interface SlideInTextProps {
  children: React.ReactNode;
  delay?: number;
}

export interface Transaction {
  date: Date;
  amount: number;
  balance: number;
}

export type Tabs = "Landing" | "Home" | "Transfer" | "Statement";
