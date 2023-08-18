import React from "react";
import { BsXCircleFill } from "react-icons/bs";

const PurchaseSuccesModal = ({ closeSucces, client, date, time, valueCombox, totalPrice, numberTable, oneCheck, secondCheck, duration, deliveryBuy, addres }) => {
  return (
    <header className="transition-all fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-end">
          <BsXCircleFill
            className="text-3xl text-orange-500 cursor-pointer"
            onClick={closeSucces}
          />
        </div>

        {deliveryBuy ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">
              ¡Compra Exitosa!
            </h2>
            <p>Usuario: {client[0].nombre}</p>
            <p>Dirección de entrega: {addres}</p>
            <p>
              Fecha y hora compra: {date}: {time}
            </p>
            <p className={`${valueCombox != "" ? "block" : "hidden"}`}></p>
            <p>Total Precio: {totalPrice}</p>
            <p>Nuestro Email: elBocadoPerfecto@gmail.com</p>
            <p>Nuestro telefono: 71779843 </p>
          </div>
        ) : (
          <div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-orange-500">
                ¡Compra Exitosa!
              </h2>
              <p>Usuario: {client[0].nombre}</p>
              <p>
                Fecha y hora compra: {date}: {time}
              </p>
              <p className={`${valueCombox != "" ? "block" : "hidden"}`}></p>
              <p>Total Precio: {totalPrice}</p>
              <p>Nuestro Email: elBocadoPerfecto@gmail.com</p>
              <p>Nuestro telefono: 71779843 </p>
            </div>
            <p className={`${numberTable != null ? "block" : "hidden"}`}>
              Numero de mesa: {numberTable}
            </p>
            <p
              className={`${oneCheck ? "block font-bold mt-2 mb-2" : "hidden"}`}
            >
              Por favor, tenga en cuenta que el tiempo estimado para recibir su
              pedido es de 10 a 15 minutos.
            </p>
            <p
              className={`${
                secondCheck ? "block font-bold mt-2 mb-2" : "hidden"
              }`}
            >
              Por favor, tenga en cuenta que el tiempo estimado para recibir su
              pedido es {duration} minutos, debido a que usted demorará{" "}
              {valueCombox} minutos.
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default PurchaseSuccesModal;
