import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const Sidebar = () => {
  const globalContext = useContext(GlobalContext);
  const { isMenuOpen } = globalContext;
  return (
    <>
      <div
        className={`fixed top-24 left-0 h-screen w-64 bg-blue-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex flex-col p-4 space-y-6">
          <div className="flex flex-col space-y-4">
            {["Home", "Transfer", "Statement"].map((tab) => (
              <button
                key={tab}
                className={`text-left font-semibold text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-colors duration-200 `}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
