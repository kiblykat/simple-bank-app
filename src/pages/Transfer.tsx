import { useContext } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn } = globalContext;
  return <>{isLoggedIn ? <div>"Transfer"</div> : navigate("/")}</>;
};

export default Transfer;
