import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/imagenes/logo.png";
import login1 from "../assets/imagenes/login1.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [cliente, setCliente] = useState({
    correo: "",
    contraseña: "",
  });
  const navigate = useNavigate();

  const inputChange = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/restaurante/cliente", cliente)
      .then(({ data }) => {
        navigate("/productos", { state: { prop: cliente } });
        console.log(data);
      })
      .catch(({ response }) => {
        e.preventDefault();
        console.log(response.data);
      });
  };

  //seleccionar una imagen
  {
    /*const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageName) => {
      setSelectedImage(imageName);
      cliente.avatar = imageName
    };*/
  }

  return (
    <section className="flex items-center justify-center h-[100vh] bg-[url(./assets/imagenes/fondologin2.jpg)] bg-cover  bg-center w-[100%]">
      <form className="ml-[20px] w-[450px] p-4 h-[640px] rounded-[20px] bg-red-800">
        <div className="w-full">
          <h1 className="font2 text-center mb-5 text-[40px] text-white font-bold">
            Iniciar Sesión
          </h1>
          <div className="flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="rounded-[50%] w-[160px] mb-5"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[310px]">
            <label className="font2 block text-white mb-2 text-[18px]" id="nom">
              Correo:
            </label>

            <input
              type="email"
              className="border-b-[4px] 
             border-green-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50"
              value={cliente.correo}
              onChange={inputChange}
              name="correo"
              aria-labelledby="correo"
              placeholder="Ingresa tu correo"
            />

            <label
              className="font2 text-[18px] block text-white mb-2 mt-7"
              id="cont"
            >
              Contraseña:
            </label>

            <input
              type="password"
              autoComplete="on"
              className="border-b-[4px] 
             border-green-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50"
              value={cliente.contraseña}
              onChange={inputChange}
              name="contraseña"
              aria-labelledby="cont"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        </div>
        <div className="font2 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-20 py-2 rounded-lg mt-[40px] hover:bg-green-500"
          >
            Enviar
          </button>
        </div>
      </form>
      <div className="ml-[100px] h-[100vh]">
        <img src={login1} alt="login1" className="w-[600px] h-[100vh]" />
      </div>
    </section>
  );
};

export default Login;
