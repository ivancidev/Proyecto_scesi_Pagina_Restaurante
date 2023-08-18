import React from "react";

const PaymentOptions = ({ oneCheck, handleOneCheck, secondCheck, hanleSecondCheck, thirdCheck, open,}) => {
    
  return (
    <header>
      <div className="text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3">
        <p className="mb-3">Elige una de las opciones:</p>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={oneCheck}
              onChange={handleOneCheck}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            {open ? (
              <span>
                ¿Se encuentra en nuestro restaurante y desea comer aquí?
              </span>
            ) : (
              <span>¿Desea hacer el pago con tarjeta de crédito?</span>
            )}
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={secondCheck}
              onChange={hanleSecondCheck}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            {open ? (
              <span>¿Va a recoger su pedido solamente?</span>
            ) : (
              <span>¿Desea hacer el pago en caja?</span>
            )}
          </label>
        </div>
      </div>
      {open ? (
        ""
      ) : (
        <p
          className={`${
            thirdCheck ? "block" : "hidden"
          } mt4 mb-4 font-semibold`}
        >
          "El pago lo realizara en caja"
        </p>
      )}
    </header>
  );
};

export default PaymentOptions;
