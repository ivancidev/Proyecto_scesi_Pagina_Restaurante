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
    <div className="mt-4 flex space-x-4 transition-all">
      {mostrarBotones && !abrirModal && (
        <div className="mt-4 flex space-x-4">
          <button
            className="flex-1 px-4 py-2 bg-orange-400 text-white rounded-lg shadow-md"
            onClick={() => handleOpcionClick("Delivery")}
          >
            Entrega por Delivery
          </button>
          <button
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md"
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
