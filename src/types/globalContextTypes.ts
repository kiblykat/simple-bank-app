export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: "Landing" | "Home" | "Transfer" | "Statement") => void;
  menuOpen: boolean;
  setMenuOpen: (bool: boolean) => void;
}

export const initialGlobalState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  activeTab: "Landing",
  setActiveTab: () => {},
  menuOpen: false,
  setMenuOpen: () => {},
};

export interface SlideInTextProps {
  children: React.ReactNode;
  delay?: number;
}
