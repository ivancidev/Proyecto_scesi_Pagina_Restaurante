import React from "react";

const Card = (props) => {
  const { nameDish, image, description, price, availability } = props;

  return (
    <div className="flex flex-col items-center">
      <img
        src={image}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full mb-4"
      />
      <p className="text-center font-bold text-[17px] text-white">{nameDish}</p>
      <p className="mt-5 text-center">{description}</p>
      <div className="flex justify-end ">
        <span className="text-white mt-5 text-[18px]">Costo: {price}Bs</span>
      </div>
      <p className="text-gray-400 mb-5">{availability}</p>
    </div>
  );
};

export default Card;
