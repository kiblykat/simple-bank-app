import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn } = globalContext;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <div>"Statement"</div>
    </>
  );
};

export default Transfer;
