import React from "react";

const OpcionBoton = (props) => {
  const { mostrarBotones } = props;
  const { abrirModal, setAbrirModal } = props;
  const {setSeleccionOpcion} = props

  const handleOpcionClick = (opcion) => {
    setSeleccionOpcion(opcion);
    setAbrirModal(true);
  };

  return (
    <div className="mt-4 flex space-x-4">
      {mostrarBotones && !abrirModal && (
        <div className="mt-4 flex space-x-4">
          <button
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md"
            onClick={() => handleOpcionClick("Delivery")}
          >
            Entrega por Delivery
          </button>
          <button
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
            onClick={() => handleOpcionClick("Restaurante")}
          >
            Entrega en el Restaurante
          </button>
        </div>
      )}
    </div>
  );
};

export default OpcionBoton;
