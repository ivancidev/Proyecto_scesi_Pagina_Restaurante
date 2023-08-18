import React from "react";
import { useNavigate } from "react-router-dom";
import { BsXCircleFill } from "react-icons/bs";
import { useApiRequest } from "../hooks/useApiRequest";
import { useForm } from "../hooks/useForm";
import useKeepBd from "../hooks/useKeepBd";
import useDeleteKey from "../hooks/useDeleteKey";
import { deletePostKey, getPostEmail, getUserFromLocalStorage } from "../../api/posts";

const ChangePassword = ({ window, setWindow }) => {
  const { user: userChange, handleChange } = useForm({
    name: "",
    newName: "",
    password: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const user_global = getUserFromLocalStorage()
  const { data: client } = useApiRequest(getPostEmail(user_global.email));
  const { handleSubmit } = useKeepBd(userChange, navigate)
  const { deleteKey } = useDeleteKey(deletePostKey(user_global.email))

  const handleSubmitForm = (e) =>{
    e.preventDefault()
    handleSubmit()
    deleteKey()
  }

  return (
    <header
      className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 ${
        window ? "flex transition-all" : "hidden transition-all"
      }`}
    >
      <div className="absolute flex items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all">
        <form className=" transition-all bg-cyan-500 p-8 rounded-lg shadow-lg w-[300px] md:w-[450px] lg:w-[550px] overflow-y-auto h-[650px]">
          <div className="w-full">
            <div
              className="flex justify-end hover:cursor-pointer"
              onClick={() => setWindow(false)}
            >
              <BsXCircleFill className="text-[26px] text-white" />
            </div>
            {client !== null ? (
              <div className="flex justify-center">
                <img
                  src={client[0].avatar}
                  alt="logo"
                  className="rounded-[50%] w-[100px] mb-5"
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <p>El objeto client es nulo.</p>
              </div>
            )}
          </div>

          <label className=" block text-white mb-2"> Usuario: </label>

          <input
            type="text"
            className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50"
            name="name"
            aria-labelledby="nom"
            placeholder="Ingresa tu nombre"
            value={userChange.name}
            onChange={handleChange}
          />

          <label className=" block text-white mb-2 mt-4">
            {" "}
            Nuevo Usuario:{" "}
          </label>

          <input
            type="text"
            className="border-b-[4px] 
          border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50"
            name="newName"
            placeholder="Ingresa un nuevo usuario"
            value={userChange.newName}
            onChange={handleChange}
          />

          <label className=" block text-white mb-2 mt-5">Contraseña:</label>

          <input
            type="password"
            autoComplete="on"
            className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50"
            name="password"
            aria-labelledby="cont"
            placeholder="Ingresa tu contraseña"
            value={userChange.password}
            onChange={handleChange}
          />

          <label className=" block text-white mb-2 mt-5">
            Nueva Constraseña:
          </label>

          <input
            type="password"
            autoComplete="on"
            className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50"
            name="newPassword"
            aria-labelledby="cont"
            placeholder="Ingresa una nueva contraseña"
            value={userChange.newPassword}
            onChange={handleChange}
          />

          <div className="font2 flex justify-center">
            <button
              onClick={handleSubmitForm}
              className="bg-orange-600 text-white px-16 py-2 rounded-lg mt-[30px] hover:bg-orange-500"
            >
              Cambiar
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default ChangePassword;
