import React from "react";
import { useLocation } from "react-router-dom";
import TableDelivery from "../components/tables/TableDelivery";
import TableRestaurant from "../components/tables/TableRestaurant";
import useApiRequest from "../components/hooks/useApiRequest";
import { getPostRecord } from "../api/posts";

const ClientHistory = () => {
  const location = useLocation();
  const propClient = location.state?.prop;
  const { data: historyTable } = useApiRequest(
    getPostRecord(propClient.idCliente)
  );

  return (
    <header className="flex flex-col md:flex-row  items-center justify-center min-h-screen bg-[url(./assets/imagenes/fondoHistorial.jpg)] bg-cover bg-center w-full p-10 gap-6">
      <div className="container mx-auto p-8 flex flex-col items-center bg-slate-300 rounded-[12px] bg-opacity-60">
        <h1 className="text-2xl font-bold p1 mb-4 ">Historial de Compras</h1>
        <div className="m-auto w-full text-center">
          <img
            src={propClient.avatar}
            alt="miavatar"
            className="w-[120px] mx-auto mb-2 rounded-full"
          />
          <h2 className="mb-6 font-semibold text-[19px]">
            Usuario: {propClient.nombre}
          </h2>
        </div>
        {historyTable ? (
          <div className="w-full lg:w-[120vh]">
            {Object.keys(historyTable).map((key) => (
              <div
                key={key}
                className="w-full overflow-hidden rounded-lg shadow-lg mb-4"
              >
                <div
                  className={`${
                    key === "compraRestaurante"
                      ? "block  overflow-x-auto"
                      : "hidden"
                  }`}
                >
                  <h2 className="text-center text-[22px] font-semibold mb-4 p1">
                    Compra en el restaurante
                  </h2>
                  <TableRestaurant recordRestaurant={historyTable[key]} />
                </div>
                <div
                  className={`${
                    key === "compraDelivery"
                      ? "block  overflow-x-auto"
                      : "hidden"
                  }`}
                >
                  <h2 className="text-center text-[22px] font-semibold mb-4 mt-4 p1">
                    Compra por delivery
                  </h2>
                  <TableDelivery recordDelivery={historyTable[key]} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Cargando historial...</div>
        )}
      </div>
    </header>
  );
};

export default ClientHistory;
