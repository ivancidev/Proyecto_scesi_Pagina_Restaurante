import React from "react";
import { useState } from "react";

const Tables = (props) => {
  const { tableNumber, setTableNumber } = props;
  const { setShowTable } = props;

  // Generates an array of 20 numbers
  const tableNumbersArray = Array.from({ length: 25 }, (_, index) => index + 1);

  // Function to handle click on a number
  const handleTableNumberClick = (number) => {
    setTableNumber(number);
    setShowTable(false);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 h-[500px] overflow-y-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tableNumbersArray.map((number) => (
        <div
          key={number}
          onClick={() => handleTableNumberClick(number)}
          className={`cursor-pointer border rounded-lg p-4 text-center ${
            tableNumber === number
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          {number}
        </div>
      ))}
    </div>
  );
};

export default Tables;

