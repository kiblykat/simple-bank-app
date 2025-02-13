export interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
}

export const initialState = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
};
