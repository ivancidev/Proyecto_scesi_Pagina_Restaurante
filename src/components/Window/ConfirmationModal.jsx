import React from "react";

const ConfirmationModal = ({ setConfirmation, handleSubmit }) => {
  return (
    <header className="transition-all fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center items-center">
        <p className="mb-4">¿Desea confirmar la compra?</p>
        <div className="flex">
          <button
            className="text-white py-2 px-5 rounded-[8px] bg-blue-500 font-semibold mr-7"
            onClick={handleSubmit}
          >
            Confirmar
          </button>
          <button
            className="text-white py-2 px-5 rounded-[8px] bg-red-500 font-semibold"
            onClick={() => setConfirmation(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
    </header>
  );
};

export default ConfirmationModal;
