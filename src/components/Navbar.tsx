function Navbar() {
  return (
    <>
      <div className="bg-blue-900 h-24">
        <div className="flex flex-row justify-center items-center h-full">
          <div className="w-4/5 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src="gic3.png" className="min-w-16 w-16 "></img>
              <p className="font-semibold text-white opacity-70 hover:opacity-100 transition-opacity duration-200 text-xl px-2 mx-4  hidden sm:block ">
                Home
              </p>
              <p className="font-semibold text-white opacity-70 hover:opacity-100 transition-opacity duration-200 text-xl px-2 mx-4  hidden sm:block">
                Transfer
              </p>
              <p className="font-semibold text-white opacity-70 hover:opacity-100 transition-opacity duration-200 text-xl px-2 mx-4  hidden sm:block">
                Statement
              </p>
            </div>
            <div className="flex flex-row justify-center items-center">
              <i className="text-gray-300 fa-solid fa-gear fa-lg text-3xl px-2 mx-4 hover:cursor-pointer hover:text-white-400 "></i>{" "}
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
