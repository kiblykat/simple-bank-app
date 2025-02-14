import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Home = () => {
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);
  const { isLoggedIn, setActiveTab, balance } = globalContext;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    setActiveTab("Home");
  }, [isLoggedIn, navigate, setActiveTab]);

  return (
    <>
      <div className="bg-stone-100 h-screen">
        <div className="grid grid-cols-4">
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 md:ml-12 md:mr-4 mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">GIC Balance</div>
              <hr></hr>
              <h1 className=" text-6xl font-semibold">${balance.toFixed(2)}</h1>
              <button
                onClick={() => navigate("/transfer")}
                className="btn rounded-full w-52 mt-16 bg-blue-900 text-white"
              >
                Transfer Funds
              </button>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-4 md:col-span-2 mx-12 md:mr-12 md:ml-4 mt-4 md:mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title">Recent Activity</div>
              <hr></hr>
              <div className="overflow-y-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {globalContext.transactions
                      .slice(0, 3)
                      .map((transaction, index) => (
                        <tr key={index}>
                          <td>{formatDate(transaction.date)}</td>
                          <td
                            className={
                              transaction.amount > 0
                                ? "text-success"
                                : "text-error"
                            }
                          >
                            {transaction.amount > 0 ? "+" : "-"}$
                            {Math.abs(transaction.amount).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
