import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Order = (props) => {
  const { productos } = props;
  const { idPlato, setIdPlato } = props;

  return (
    <div className={`block bg-[#262837] p-4 rounded-xl mb-4`}>
      <div className="grid grid-cols-5 mb-4 justify-between">
        {/* Product description */}
        <div className="col-span-4 flex items-center gap-3">
          <img
            src={productos.imagen}
            className="w-11 h-11 object-cover rounded-[50%]"
          />
          <div>
            <h5 className="text-[16px] text-orange-400">
              {productos.nombrePlato}
            </h5>
            <p className="text-[15px] text-white">
              Cantidad: {productos.cantidad} platos
            </p>
          </div>
        </div>

        {/* Price */}
        <div>
          <span className="text-[18px] text-white">
            {productos.precioTotal}Bs
          </span>
        </div>
      </div>
      {/* Note */}
      <div className="grid grid-cols-6 items-center">
        <form className="col-span-5">
          <input
            type="text"
            className="bg-[#1F1D2B] py-2 px-4 rounded-lg outline-none"
            placeholder="Describe la orden..."
          />
        </form>
        <div>
          <button
            onClick={() => setIdPlato(productos.idPlato)}
            className="border border-red-500 p-2 rounded-lg"
          >
            <RiDeleteBin6Line className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
