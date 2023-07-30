import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import imagen from "../assets/imagenes/tristeza.webp";

const NotFound = () => {
  return (
    <header className="flex justify-center items-center min-h-screen bg-white">
  <div className="flex md:flex-row   flex-col-reverse sm:flex-col-reverse items-center m-5 gap-6 md:gap-[200px]">
    <div className="w-[400px] h-[400px] mb-6">
      <img src={imagen} alt="Imagen tristeza" />
    </div>
    <div className="w-[600px]">
      <h2 className="text-[97px] text-center font-mono">
        <span className="text-blue-600">4</span>
        <span className="text-gray-600">0</span>
        <span className="text-blue-600">4</span>
      </h2>
      <p className="text-center text-blue-800 text-[27px] font-mono ">
        Página no encontrada
      </p>
      <p className="mt-1 text-[18px] text-center">
        Lo sentimos, la página que buscas no existe.
      </p>
      <p className="text-center mt-5 mb-5">
        <Link to="/login" className="underline text-blue-500 ">
          Ir a la página de inicio
        </Link>
      </p>
      <p className="mt-4 text-[18px] font-semibold">
        Aquí hay algunas cosas que puedes intentar:
      </p>
      <ul className="list-disc mt-2 ml-6 text-[18px]">
        <li>Verifica la URL en la barra de direcciones.</li>
        <li>Regresa a la página anterior y vuelve a intentarlo.</li>
        <li>Visita nuestra página de inicio para explorar más contenido.</li>
        <li>Si crees que esto es un error, contáctanos para que podamos ayudarte. <span className="underline text-blue-500 hover:cursor-pointer">elBocadoPerfecto@gmail.com</span></li>
      </ul>
    </div>
  </div>
</header>
  );
};

export default NotFound;
