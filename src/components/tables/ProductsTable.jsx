import React from "react";

const ProductsTable = ({products, totalPrice}) => {
  return (
    <header>
      <h2 className="font-semibold">Productos Seleccionados:</h2>
      <div className="overflow-x-auto overflow-y-auto h-56">
        <table className="w-full mt-2 mb-3 ">
          <thead>
            <tr className="text-orange-500 ">
              <th className="px-4 py-2 text-left border-orange-500 border-2">
                Nombre del Producto
              </th>
              <th className="px-4 py-2 text-center border-orange-500 border-2">
                Cantidad
              </th>
              <th className="px-4 py-2 text-right border-orange-500 border-2">
                Precio
              </th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0
              ? products.map((producto, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 text-left border-orange-500 border-2">
                      {producto.nombreMenu}
                    </td>
                    <td className="border-orange-500 border-2 px-4 py-2 text-center">
                      {producto.cantidad}
                    </td>
                    <td className="border-orange-500 border-2 px-4 py-2 text-right">
                      {producto.precioTotal}Bs
                    </td>
                  </tr>
                ))
              : ""}

            <tr>
              <td className="text-[17px] px-4 font-semibold border-orange-500 border-2">
                Total Pagar:
              </td>
              <td className="text-left text-[17px] font-semibold border-orange-500 border-2"></td>
              <td className="text-right px-4 py-2 text-[17px] font-semibold border-orange-500 border-2">
                {totalPrice}Bs
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </header>
  );
};

export default ProductsTable;
