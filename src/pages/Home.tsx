const Home = () => {
  return (
    <>
      <div className=" bg-stone-100 h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-4 mx-12 mt-12 border border-gray-300">
            <div className="card-body">
              <div className="card-title m-auto">GIC Balance</div>
              <hr></hr>
              <div className="m-auto">
                <h1 className=" text-4xl font-semibold">$60.00</h1>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-4 mx-12 mt-4 border border-gray-300">
            <div className="card-body">
              <div className="card-title m-auto">Recent Activity</div>
              <hr></hr>
              <div className="m-auto">
                <h1 className=" text-4xl font-semibold"></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
