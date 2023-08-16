import React, { useState, useEffect } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiArrowLeft } from "react-icons/fi";
import { BsPersonSquare, BsMoonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaIdCard } from "react-icons/fa";
import { useApiRequest } from "./hooks/useApiRequest";

const Sidebar = (props) => {
  const { showMenu, setShowMenu } = props;
  const { window, setWindow } = props;
  const { changeBackground, setChangeBackground } = props;
  const navigate = useNavigate();
  const user_global = JSON.parse(sessionStorage.getItem("user_logged"));

  const { data: client } = useApiRequest(
    `http://localhost:4000/email/${user_global.email}`
  );

  const handlClickWindow = () => {
    setWindow(!window);
  };

  const closePreviousPage = () => {
    navigate("/login");
  };

  const handleHistory = () => {
    navigate("/historyClient", { state: { prop: client } });
  };

  return (
    <div
      className={`${
        changeBackground ? "bg-stone-800" : "bg-orange-600"
      } fixed lg:left-0 top-0 w-60 h-full flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-20 transition-all ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      <div>
        <div className="flex justify-end">
          <button onClick={() => setShowMenu(false)}>
            {
              <FiArrowLeft
                className={`${
                  changeBackground
                    ? "hover:text-slate-400"
                    : "hover:text-[#262837]"
                } text-[30px] text-white mr-5 `}
              />
            }
          </button>
        </div>
        <ul className="pl-4">
          <li>
            {client !== null ? (
              <div className="flex justify-center">
                <img
                  className="w-[100px]"
                  src={client[0].avatar}
                  alt="Avatar"
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <p>El objeto client es nulo.</p>
              </div>
            )}
            <p className="text-center mb-3 text-[18px] text-white">
              {client !== null ? client[0].nombre : "Nombre no disponible"}
            </p>
          </li>
          <li
            className="p-4 rounded-tl-xl rounded-bl-xl flex hover:bg-[#262837] hover:cursor-pointer mt-28"
            onClick={handlClickWindow}
          >
            <BsPersonSquare className="text-2xl text-white" />
            <p className="ml-3 text-white">Cambiar contraseña</p>
          </li>
          <li
            className="p-4 rounded-tl-xl rounded-bl-xl flex hover:bg-[#262837] hover:cursor-pointer mt-2"
            onClick={handleHistory}
          >
            <FaIdCard className="text-2xl text-white" />
            <p className="ml-3 text-white">Ver historial</p>
          </li>
          <li
            className="p-4 rounded-tl-xl rounded-bl-xl flex hover:bg-[#262837] hover:cursor-pointer mt-2"
            onClick={() => setChangeBackground(!changeBackground)}
          >
            <BsMoonFill className="text-2xl text-white" />
            <p className="ml-3 text-white">Cambiar aspecto</p>
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-4 md:mt-60 mt-44">
          <li
            className="hover:bg-[#272936] p-4 rounded-tl-xl rounded-bl-xl group transition-colors flex hover:cursor-pointer"
            onClick={closePreviousPage}
          >
            <RiLogoutCircleRLine className="text-2xl text-white" />
            <p className="ml-3 text-white">Salir</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
