import React from 'react';
import Card from '../Card';
import { FaShoppingCart } from "react-icons/fa";


const OrderCard = ({ dish, addProduct, handleButtonErrorClick, handleOpenClick }) => {
  const isAvailable = dish.disponibilidad === "Disponible";
  const isNotAvailable = dish.disponibilidad === "No disponible";

  return (
    <div
      className={`hover:cursor-pointer hover:scale-[1.02] transition-all bg-[#1F1D2B] p-7 rounded-xl flex flex-col items-center gap-5 text-center text-gray-300 h-full`}
      key={dish.idMenu}
    >
      <Card
        image={dish.imagen}
        description={dish.descripcionMenu}
        price={dish.precioMenu}
        availability={dish.disponibilidad}
        nameDish={dish.nombreMenu}
      />
      <div className="flex flex-col h-[100%] gap-4 justify-end">
        {isAvailable && (
          <button
            className={`flex gap-2 pt-2 pb-2 pr-12 pl-12 bg-orange-400 rounded-[10px] text-[14px] text-white`}
            onClick={() => addProduct(dish)}
          >
            Agregar
            <FaShoppingCart className="mr-3 text-[20px]" />
          </button>
        )}
        {isNotAvailable && (
          <button
            className={`block pt-2 pb-2 pr-12 pl-12 bg-red-600 rounded-[10px] text-[14px] text-white`}
            onClick={handleButtonErrorClick}
          >
            No disponible
          </button>
        )}
        <button
          className={`pt-2 pb-2 bg-orange-400 rounded-[10px] text-[14px] text-white`}
          onClick={() => handleOpenClick(dish)}
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
