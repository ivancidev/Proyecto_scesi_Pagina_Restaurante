import React from "react";
import Card from "../Card";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { createNewPostFavorite, getPostEmail, getUserFromLocalStorage } from "../../api/posts";
import useApiRequest from "../hooks/useApiRequest";
import axios from "axios";

const OrderCard = ({
  dish,
  addProduct,
  handleButtonErrorClick,
  handleOpenClick, 
  setShowSucces
}) => {
  const isAvailable = dish.disponibilidad === "Disponible";
  const isNotAvailable = dish.disponibilidad === "No disponible";
  const user_global = getUserFromLocalStorage()
  const {data: user} = useApiRequest(getPostEmail(user_global.email))

  const onSubmit = (favo) => {
    const idMenu = favo.idMenu
    const idCliente = user[0].idCliente
    const favorite = {idMenu, idCliente}
    axios
      .post(createNewPostFavorite(), favorite)
      .then(({ data }) => {
        handleSucces()
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  const handleSucces = () => {
    setShowSucces(true);
    setTimeout(() => {
      setShowSucces(false);
    }, 3000);
  };

  return (
    <div
      className={`hover:cursor-pointer hover:scale-[1.02] transition-all bg-[#1F1D2B] p-7 rounded-xl flex flex-col gap-5 text-center text-gray-300 h-full`}
      key={dish.idMenu}
    >
      <Card
        image={dish.imagen}
        description={dish.descripcionMenu}
        price={dish.precioMenu}
        availability={dish.disponibilidad}
        nameDish={dish.nombreMenu}
      />

      <div className="flex flex-col gap-4 flex-grow justify-center items-center">
        {isAvailable && (
          <button
            className={`flex items-center justify-center w-full bg-orange-400 rounded-md text-white text-sm py-2`}
            onClick={() => addProduct(dish)}
          >
            <FaShoppingCart className="mr-2 text-[20px]" />
            Agregar
          </button>
        )}
        {isNotAvailable && (
          <button
            className={`block w-full bg-red-600 rounded-md text-white text-sm py-2`}
            onClick={handleButtonErrorClick}
          >
            No disponible
          </button>
        )}
        <button
          className={`w-full bg-orange-400 rounded-md text-white text-sm py-2`}
          onClick={() => handleOpenClick(dish)}
        >
          Ver detalle
        </button>
        <button
          className={`flex items-center justify-center pt-2 pb-2 rounded-md text-white text-sm`}
          onClick={() => onSubmit(dish)}
        >
          <FaHeart className="mr-2 text-[20px]" />
          Agregar Favoritos
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
