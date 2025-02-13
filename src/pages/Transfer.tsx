import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const Transfer = () => {
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn } = globalContext;
  return <>{isLoggedIn ? <div>"Transfer"</div> : "Please log in"}</>;
};

export default Transfer;
