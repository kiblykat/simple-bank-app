import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
      <div className="bg-stone-100 h-screen">
        <div className="grid grid-cols-4">
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">GIC Balance</div>
              <hr></hr>
              <div className="">
                <h1 className=" text-6xl font-semibold">$60.00</h1>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 mt-4 md:mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">Recent Activity</div>
              <hr></hr>
              <div className="">
                <h1 className=" text-6xl font-semibold"></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
