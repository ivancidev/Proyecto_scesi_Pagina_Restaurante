import React from "react";

const Card = (props) => {
  const { nombrePlato, imagen, descripcion, precio, disponibilidad } = props;

  return (
    <div className="flex flex-col items-center">
      <img
        src={imagen}
        className="w-40 h-40 object-cover -mt-20 shadow-2xl rounded-full mb-4"
      />
      <p className="text-center font-bold text-[17px] text-white">{nombrePlato}</p>
      <p className="mt-5 text-center">{descripcion}</p>
      <div className="flex justify-end ">
        <span className="text-white mt-5 text-[18px]">Costo: {precio}Bs</span>
      </div>
      <p className="text-gray-400 mb-5">{disponibilidad}</p>
    </div>
  );
};

export default Card;
