import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import TablaDelivery from "../components/HistorialTabla/TablaDelivery";
import TablaRestaurante from "../components/HistorialTabla/TablaRestaurante";

const ClientHistory = (prop) => {
  const location = useLocation();
  const propCliente = location.state?.prop;
  const [historyTable, setHistoryTabla] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/historial/${propCliente.nombre}`
        );
        const data = await response.json();
        setHistoryTabla(data);
      } catch (error) {
        console.error("Error al obtener el historial:", error);
      }
    };
    fetchHistorial();
  }, []);

  return (
    <header className="flex flex-col md:flex-row  items-center justify-center min-h-screen bg-[url(./assets/imagenes/fondoHistorial.jpg)] bg-cover bg-center w-full p-10 gap-6">
      <div className="container mx-auto p-8 flex flex-col items-center bg-slate-200 rounded-[12px] opacity-80">
        <h1 className="text-2xl font-bold p1 mb-4 ">Historial de Compras</h1>
        <div className="m-auto w-full text-center">
          <img src={propCliente.avatar} alt="miavatar" className="w-[120px] mx-auto mb-2 rounded-full" />
          <h2 className="mb-6 p1">{propCliente.nombre}</h2>
        </div>
        <div className="w-full lg:w-[120vh]">
          {Object.keys(historyTable).map((key) => (
            <div
              key={key}
              className="w-full overflow-hidden rounded-lg shadow-lg mb-4"
            >
              <div className={`${key === "compraRestaurante" ? "block overflow-x-auto" : "hidden"}`}>
                <TablaRestaurante historialRestaurante={historyTable[key]} />
              </div>
              <div className={`${key === "compraDelivery" ? "block  overflow-x-auto" : "hidden"}`}>
                <TablaDelivery historialDelivery={historyTable[key]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default ClientHistory;
