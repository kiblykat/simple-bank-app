import { useContext, useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useNavigate } from "react-router-dom";

const Statement = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setActiveTab, transactions } = useContext(GlobalContext);

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
    setActiveTab("Statement");
  }, [isLoggedIn, navigate, setActiveTab]);

  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="overflow-y-hidden w-full m-10 border-2 rounded-xl shadow-lg">
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
    </>
  );
};

export default Statement;
