const Tr_Withdraw = () => {
  return (
    <div className="bg-stone-100 h-screen">
      <div className="flex flex-row justify-center">
        <div className="flex flex-col justify-center items-center px-20 bg-white shadow-lg m-8 rounded-lg border-l-8 border-solid border-blue-300">
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
  );
};

export default Tr_Withdraw;
