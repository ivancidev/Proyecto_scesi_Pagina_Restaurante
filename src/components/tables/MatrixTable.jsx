import React from "react";

const MatrixTable = ({ numberTable, setNumberTable, setShowTable}) => {

  const tableNumbersArray = Array.from({ length: 25 }, (_, index) => index + 1);

  const handleTableNumberClick = (number) => {
    setNumberTable(number);
    setShowTable(false);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 h-[500px] overflow-y-auto md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tableNumbersArray.map((number) => (
        <div
          key={number}
          onClick={() => handleTableNumberClick(number)}
          className={`cursor-pointer border rounded-lg p-4 text-center ${
            numberTable === number
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

export default MatrixTable;

