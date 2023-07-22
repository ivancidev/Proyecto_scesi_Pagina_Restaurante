import React from "react";

const Card = (props) => {
  const { name, img, description, price, inventory } = props;

  return (
    <div className="flex flex-col items-center">
      <img
        src={img}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full mb-4"
      />
      <p className="text-center font-bold text-white">{name}</p>
      <p className="mt-5 text-center">{description}</p>
      <div className="flex justify-end ">
        <span className="text-white mt-5 text-[19px]">Costo: {price}Bs</span>
      </div>
      <p className="text-gray-400 mb-5">{inventory}</p>
    </div>
  );
};

export default Card;
