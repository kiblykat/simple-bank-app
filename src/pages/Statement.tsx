import { useContext } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Statement = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn } = globalContext;
  return <>{isLoggedIn ? <div>"Statement"</div> : navigate("/")}</>;
};

export default Statement;
