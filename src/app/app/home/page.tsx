import React from "react";

const HomePage = () => {
  return (
    <div className="w-[100%] flex gap-2">
      <div className="w-[34%] flex-col gap-1">
        <div className="w-[100%] flex justify-between p-2 bg-white rounded-md shadow-md font-semibold">
          <div className="flex justify-between align-middle gap-2">
            <p>Queue</p>
            <div className="rounded border-r-pink-600">
              <p>20</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Queue</p>
          </div>
        </div>
      </div>
      <div className="w-[34%] flex-col">
        <div className="w-[100%] flex justify-between p-2 bg-white rounded-md shadow-md font-semibold">
          <div className="flex justify-between align-middle gap-2">
            <p>Queue</p>
            <div className="rounded border-r-pink-600">
              <p>20</p>
            </div>
          </div>
          <div className="flex justify-between">
            <p>Queue</p>
          </div>
        </div>
        <div className="w-[100%] flex gap-2 p-2 bg-white mt-2 rounded-md shadow-md">
          <div className="p-4 rounded-md bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
