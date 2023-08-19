import React, { useState } from "react";
import { getPostDeleteFavorite, getPostFavorites } from "../api/posts";
import { useLocation } from "react-router-dom";
import useApiRequest from "../components/hooks/useApiRequest";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const OrdersFavorites = () => {
  const location = useLocation();
  const propClient = location.state?.prop;
  const { data: products } = useApiRequest(
    getPostFavorites(propClient.idCliente)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteFavorite = async (nameMenu) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await axios.post(getPostDeleteFavorite(nameMenu),
        {
          idClient: propClient.idClient,
        }
      );
      setSuccessMessage(response.data);
      window.location.reload();
    } catch (error) {
      setError("Error al eliminar el favorito");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex flex-col md:flex-row  items-center justify-center min-h-screen bg-[url(./assets/imagenes/fondoHistorial.jpg)] bg-cover bg-center w-full p-10 gap-6">
      <div className="container mx-auto p-8 flex flex-col items-center bg-white rounded-[12px] bg-opacity-60">
        <h1 className="text-2xl font-bold mb-4 ">👩‍🍳Mis Favoritos Menus🍲</h1>
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

        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <>
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products && products.length > 0 ? (
                products.map((order, index) => (
                  <div
                    key={index}
                    className="hover:cursor-pointer hover:scale-[1.02] transition-all bg-[#1F1D2B] p-7 rounded-xl text-center text-gray-300"
                  >
                    <img
                      src={order.imagen}
                      alt={order.nombreMenu}
                      className="mx-auto mb-3"
                    />
                    <h3 className="text-lg font-semibold">
                      {order.nombreMenu}
                    </h3>
                    <p className="text-gray-500">{order.descripcionMenu}</p>
                    <div className="flex-grow flex flex-col justify-center">
                      <button
                        className={`flex items-center justify-center pt-2 pb-2 mt-3 rounded-md text-white text-sm bg-red-600`}
                        onClick={() => handleDeleteFavorite(order.nombreMenu)}
                      >
                        Quitar Favorito <FaStar/>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-[25px] text-slate-700 font-serif text-center">
                    Lista de favoritos está vacío
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default OrdersFavorites;
