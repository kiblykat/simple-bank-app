import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const Statement = () => {
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn } = globalContext;
  return <>{isLoggedIn ? <div>"Statement"</div> : "Please log in"}</>;
};

export default Statement;
