import { useNavigate } from "react-router-dom";

const Tr_Withdraw = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-stone-100 h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col bg-white shadow-lg m-8 rounded-lg border-l-8 border-solid border-blue-300">
          <div className="flex flex-row justify-between">
            <i
              onClick={() => navigate("/transfer")}
              className="m-3 p-3 fa-solid fa-arrow-left text-xl rounded-full hover:bg-gray-100"
            ></i>
            <img src="/gic3.png" className="rounded-full w-8 h-8 m-4" />
          </div>
          <div className="flex flex-col justify-center items-center mx-20">
            <div className="flex flex-row items-center justify-center m-5 mb-2">
              <p className="text-center text-2xl font-bold">Withdraw Amount</p>
              <i className="text-3xl text-blue-800 fa-solid fa-circle-arrow-left p-2"></i>
            </div>
            <div className="flex flex-row items-center justify-center m-8">
              <p className="text-center font-bold mx-2">$</p>
              <input
                placeholder="0"
                className="py-10 input border border-gray-300 rounded-xl text-4xl w-48"
              />
              <p className="text-center font-bold mx-2">SGD</p>
            </div>
            <button className="btn rounded-full w-52 mb-16 bg-blue-900 text-white">
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tr_Withdraw;
