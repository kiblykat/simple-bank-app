import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Home" | "Transfer" | "Statement">(
    "Home"
  );

  function handleTabChange(tab: "Home" | "Transfer" | "Statement") {
    setActiveTab(tab);
    navigate(`/${tab.toLowerCase()}`);
  }

  return (
    <>
      <div className="bg-blue-900 h-24">
        <div className="flex flex-row justify-center items-center h-full">
          <div className="w-4/5 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src="gic3.png" className="min-w-16 w-16 "></img>
              <button
                className={`font-semibold text-white opacity-70 hover:opacity-100 transition-opacity duration-200 text-xl px-2 mx-4 hidden sm:block ${
                  activeTab == "Home" ? "bg-white/20 rounded-full p-3" : ""
                }`}
                onClick={() => handleTabChange("Home")}
              >
                Home
              </button>
              <button
                className={`font-semibold text-white opacity-70 hover:opacity-100 transition-opacity duration-200 text-xl px-2 mx-4 hidden sm:block ${
                  activeTab == "Transfer" ? "bg-white/20 rounded-full p-3" : ""
                }`}
                onClick={() => handleTabChange("Transfer")}
              >
                Transfer
              </button>
              <button
                className={`font-semibold text-white opacity-70 hover:opacity-100 transition-opacity duration-200 text-xl px-2 mx-4 hidden sm:block ${
                  activeTab == "Statement" ? "bg-white/20 rounded-full p-3" : ""
                }`}
                onClick={() => handleTabChange("Statement")}
              >
                Statement
              </button>
            </div>
            <div className="flex flex-row justify-center items-center">
              <i className="text-gray-300 fa-solid fa-gear fa-lg text-3xl px-2 mx-4 hover:cursor-pointer hover:text-white-400 "></i>
              <p className="font-semibold text-gray-300 text-l px-2 mx-4">
                LOG OUT
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
