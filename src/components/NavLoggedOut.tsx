import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const NavLoggedOut = () => {
  const globalContext = useContext(GlobalContext);
  const { setIsLoggedIn } = globalContext;

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setIsLoggedIn(true)}>
        log in
      </button>
    </div>
  );
};

export default NavLoggedOut;
