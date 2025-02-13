export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
}

export const initialState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};

export interface SlideInTextProps {
  children: React.ReactNode;
  delay?: number;
}
