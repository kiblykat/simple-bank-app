function App() {
  return (
    <>
      <div className="bg-blue-900 h-24">
        <div className="flex flex-row justify-center items-center h-full">
          <div className="w-4/5 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src="gic3.png" className="w-16"></img>
              <p className="font-semibold text-gray-300 text-xl text-center mx-5">
                Home
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <i className="text-gray-300 fa-solid fa-gear fa-lg text-3xl mx-5 hover:cursor-pointer hover:text-white-400 "></i>{" "}
              <p className="font-semibold text-gray-300">LOG OUT</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
