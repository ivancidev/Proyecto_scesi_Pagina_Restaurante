import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const Order = (props) => {
  const { productos } = props;
  const { idMenu, setIdMenu } = props;
  const {cambioFondo} = props

  return (
    <div className={`${cambioFondo ? "bg-slate-600":"bg-[#262837]"} block  p-4 rounded-xl mb-4`}>
      <div className="grid grid-cols-5 mb-4 justify-between">
        {/* Product description */}
        <div className="col-span-4 flex items-center gap-3">
          <img
            src={productos.imagen}
            className="w-11 h-11 object-cover rounded-[50%]"
          />
          <div>
            <h5 className="text-[16px] text-orange-400">
              {productos.nombreMenu}
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
      <div className="flex justify-center">
        <div>
          <button
            onClick={() => setIdMenu(productos.idMenu)}
            className="border border-red-600 p-2 rounded-lg"
          >
            <RiDeleteBin6Line className="text-red-600 font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
