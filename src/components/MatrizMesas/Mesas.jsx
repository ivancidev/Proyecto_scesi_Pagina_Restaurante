import React from "react";
import { useState } from "react";

const Mesas = (props) => {
  const { numeroMesa, setNumeroMesa } = props;
  const { setMostrarMesa } = props;

  // Genera una matriz de 20 números
  const arrayMesas = Array.from({ length: 25 }, (_, index) => index + 1);

  // Función para manejar el clic en un número
  const handleNumeroMesaClick = (numero) => {
    setNumeroMesa(numero);
    setMostrarMesa(false);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 h-[500px] overflow-y-auto  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {arrayMesas.map((numero) => (
        <div
          key={numero}
          onClick={() => handleNumeroMesaClick(numero)}
          className={`cursor-pointer border rounded-lg p-4 text-center ${
            numeroMesa === numero
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          {numero}
        </div>
      ))}
    </div>
  );
};

export default Mesas;
