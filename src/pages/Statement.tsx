import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Statement = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn, setActiveTab } = globalContext;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    setActiveTab("Statement");
  }, [isLoggedIn, navigate, setActiveTab]);

  return (
    <>
      <div>"Statement"</div>
    </>
  );
};

export default Statement;
