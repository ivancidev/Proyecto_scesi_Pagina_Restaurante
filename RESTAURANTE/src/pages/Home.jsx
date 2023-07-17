import React from "react";
import logo from "../assets/imagenes/logo.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => navigate("/login");
  const handClickProducto = () => navigate("/productos");
  const handleClickRegistro = () => navigate("/registro");

  return (
    <header className="bg-[url(./assets/imagenes/fondo.png)] bg-cover bg-center md:h-[100vh]">
      <div className="flex justify-end">
        <div>
          <nav className="mr-5">
            <ul className="flex m-7">
              <button
                className="w-[130px] h-[40px] bg-orange-500 mr-3 rounded-[30px] justify-center text-center text-white"
                onClick={handleClick}
              >
                <li className="text-center">Iniciar sesion</li>
              </button>

              <button
                className="w-[130px] h-[40px] bg-orange-500 rounded-[30px] text-white"
                onClick={handleClickRegistro}
              >
                <li className="text-center">Registrarse</li>
              </button>
            </ul>
          </nav>
        </div>
      </div>
      <div className=" flex items-center justify-center">
        <div className="p-28 rounded-lg shadow-md pt-12 w-[800px]">
          <h1 className="myh1 text-[55px]  font-medium text-center text-white">
            El bocado perfecto
          </h1>
          <div className="flex justify-center">
            <img
              src={logo}
              alt="logo"
              className="rounded-[50%] w-[150px] m-5"
            />
          </div>

          <div className="bg-white p-10 rounded-3xl">
            <span className=" font-thin text-[17px] text-center">
              Ven y únete a nosotros en "El Bocado Perfecto" para descubrir un
              mundo de sabores sofisticados, una atención impecable y una
              experiencia culinaria que te dejará deseando regresar una y otra
              vez. ¡Ve Registrate!{" "}
              <p className="p1 text-orange-500 m-3">
                ¡Te invitamos a disfrutar el bocado perfecto en cada visita a
                nuestro restaurante!
              </p>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Home;
