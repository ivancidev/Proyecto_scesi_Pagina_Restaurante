import React, { useState } from "react";
import useApiRequest from "./hooks/useApiRequest";
import { getPostEmail,getUserFromLocalStorage, } from "../api/posts";
import ModalWindow from "./Modals/ModalWindow";
import SearcherOrder from "./SearcherOrder";

const Header = ({ dish, setDish, changeBackground }) => {
  const [food, setFood] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const userStorage = getUserFromLocalStorage();
  const { data: user } = useApiRequest(getPostEmail(userStorage.email));

  return (
    <header>
      <ModalWindow
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        food={food}
      />
      {user ? (
        <div className="absolute ml-7 hidden md:block">
          <p className="text-orange-600 text-[30px] p1">
            {" "}
            ¡Bienvenid@ <span>{user[0].nombre}!</span>
          </p>
        </div>
      ) : (
        <div>Cargando nombre...</div>
      )}

      {/* Title and search */}
      <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 mb-6">
        <SearcherOrder
          setDish={setDish}
          setModalOpen={setModalOpen}
          setFood={setFood}
          changeBackground={changeBackground}
        />
      </div>
      {/* Tabs */}
      <nav
        className={`flex items-center justify-between md:justify-start md:gap-8 border-b-4 border-orange-700 mb-6`}
      >
        <button
          onClick={() => setDish("menuFried")}
          className={`${
            dish == "menuFried" ? "text-red-500" : "text-black py-2 pr-4 "
          } ${changeBackground ? "text-gray-50" : "text-black"}`}
        >
          Platos fritos
        </button>
        <button
          onClick={() => setDish("Sopa")}
          className={`${
            dish == "Sopa" ? "text-red-500" : "text-black py-2 pr-4 "
          } ${changeBackground ? "text-gray-50" : "text-black"}`}
        >
          Sopas
        </button>
        <button
          onClick={() => setDish("Desayuno")}
          className={`${
            dish == "Desayuno" ? "text-red-500" : "text-black py-2 pr-4 "
          } ${changeBackground ? "text-gray-50" : "text-black"}`}
        >
          Desayunos
        </button>
        <button
          onClick={() => setDish("Postre")}
          className={`${
            dish == "Postre" ? "text-red-500" : "text-black py-2 pr-4 "
          } ${changeBackground ? "text-gray-50" : "text-black"}`}
        >
          Postres
        </button>
        <button
          onClick={() => setDish("Jugo")}
          className={`${
            dish == "Jugo" ? "text-red-500" : "text-black py-2 pr-4 "
          } ${changeBackground ? "text-gray-50" : "text-black"}`}
        >
          Jugos
        </button>
      </nav>
    </header>
  );
};

export default Header;
