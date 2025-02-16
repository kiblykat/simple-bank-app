import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/utils";

const Statement = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setActiveTab, transactions } = useContext(GlobalContext);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    setActiveTab("Statement");
  }, [isLoggedIn, navigate, setActiveTab]);

  return (
    <>
      <div className="bg-stone-100 h-full">
        <div className="flex flex-row justify-center">
          <div className="bg-white overflow-y-auto w-full h-screen m-10 p-8 rounded-xl shadow-lg border-solid border-l-8 border-blue-300">
            <div className="mb-4 flex flex-col justify-center items-center">
              <h1 className="text-xl font-semibold ">Past Statements</h1>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th className="text-sm">Date</th>
                  <th className="text-sm">Amount</th>
                  <th className="text-sm">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{formatDate(transaction.date)}</td>
                    <td
                      className={
                        transaction.amount > 0 ? "text-success" : "text-error"
                      }
                    >
                      {transaction.amount > 0 ? "+" : "-"}$
                      {Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td>${transaction.balance.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statement;
