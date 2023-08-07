import React, { useState, useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { BsXCircleFill } from "react-icons/bs";
import logo from "../assets/imagenes/logo.png";


const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [platos, setPlatos] = useState([]);
  const { plato, setPlato } = props;
  const [comida, setComida] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const {cambioFondo} = props

  
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPlato(event.target.value)
  };
  

  const filteredCards = platos.filter((card) =>
    card.nombreMenu.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/menu`);
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchPlatos();
  }, []);
  const handleOpenClick = (c) => {
    setModalOpen(true);
    setComida(c);
  };

  const cerrarModal = ()=>{
    setModalOpen(false)
    setSearchValue("")
  }

  return (
    <header>

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 ${
          modalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="items-center justify-center flex w-full h-full overflow-auto">
          <div className="bg-red-100 p-9 rounded-[12px] md:rounded-[20px] md:mt-[-2px] mt-24 md:w-[75%] w-[95%] relative">
            <BsXCircleFill
              className="text-[30px] text-orange-500 transition-all absolute md:top-5 top-56 right-4 cursor-pointer"
              onClick={cerrarModal}
            />
            <div className="md:flex md:mt-10 mt-52 md:justify-center">
              <div className="md:w-[400px] md:mr-6 md:mt-[-2px] mt-4">
                <h1 className="p1 p-1 text-center text-2xl text-orange-500 whitespace-nowrap">
                  {comida.nombreMenu}
                </h1>
                <div className="mt-4 mb-4 flex justify-center">
                  <img
                    src={comida.imagen}
                    alt="no existe imagen"
                    className="rounded-lg w-full h-auto md:w-[400px]"
                  />
                </div>
                <p className="p1 text-center text-orange-500 p-1 text-lg text-[25px]">
                  {comida.precioMenu}Bs
                </p>
                <p className="p1 text-[20px] text-center text-orange-500 p-1">
                  {comida.disponibilidad}
                </p>
                <p className="mt-5">{comida.descripcionMenu}</p>
              </div>
              <div className="md:w-[500px] mt-4 md:mt-0">
                <div className="flex justify-center p-4">
                  <img
                    src={logo}
                    alt="no disponible"
                    className="w-44 h-44 rounded-full"
                  />
                </div>
                <p className="text-left">{comida.descripcionServicio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute ml-7 hidden md:block">
        <p className="text-orange-600 text-[35px] p1"> ¡Bienvenido!</p>
      </div>
      {/* Title and search */}
      <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 mb-6">
        <form>
          <div className="w-full relative">
            <RiSearch2Line className={`${cambioFondo? "text-black":"text-white"} absolute left-3 top-1/2 -translate-y-1/2 `} />
            <input
              type="text"
              className={`${cambioFondo ? "text-black  bg-white":"text-gray-300 bg-[#262837]"}  w-full py-2 pl-10 pr-4 rounded-lg  outline-none`}
              placeholder="Buscar plato"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full relative z-20">
            <div
              className={`w-full absolute ${searchValue ? "flex" : "hidden"}`}
              style={{ overflow: "auto", minHeight: "450px" }}
            >
              <div
                style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
              >
                {filteredCards.map((card, index) => (
                  <div
                    className={`p-3 w-full flex text-gray-300 bg-orange-600  hover:bg-[#1F1D2B] hover:cursor-pointer hover:text-white hover:rounded `}
                    key={card.idMenu}
                    onClick={()=>handleOpenClick(card)}
                  >
                    <ul className="flex items-center">
                      <img
                        src={card.imagen}
                        alt="imagen"
                        className="w-[30px] h-[30px] rounded-[50%] ml-[7px]"
                      />
                      <li className="mb-4 mt-1 ml-[10px] text-[17px] ">
                        {card.nombreMenu}
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* Tabs */}
      <nav className={`flex items-center justify-between md:justify-start md:gap-8 border-b-4 border-orange-700 mb-6`}>
        <button
          onClick={() => setPlato("menufrito")}
          className={`${
            plato == "menufrito" ? "text-red-600" : "text-black py-2 pr-4 "
          } ${cambioFondo? "text-white":"text-black"}`}
        >
          Platos fritos
        </button>
        <button
          onClick={() => setPlato("Sopa")}
          className={`${
            plato == "Sopa" ? "text-red-600" : "text-black py-2 pr-4 "
          } ${cambioFondo? "text-white":"text-black"}`}
        >
          Sopas
        </button>
        <button
          onClick={() => setPlato("Desayuno")}
          className={`${
            plato == "Desayuno" ? "text-red-600" : "text-black py-2 pr-4 "
          } ${cambioFondo? "text-white":"text-black"}`}
        >
          Desayunos
        </button>
        <button
          onClick={() => setPlato("Postre")}
          className={`${
            plato == "Postre" ? "text-red-600" : "text-black py-2 pr-4 "
          } ${cambioFondo? "text-white":"text-black"}`}
        >
          Postres
        </button>
        <button
          onClick={() => setPlato("Jugo")}
          className={`${
            plato == "Jugo" ? "text-red-600" : "text-black py-2 pr-4 "
          } ${cambioFondo? "text-white":"text-black"}`}
        >
          Jugos
        </button>
      </nav>
    </header>
  );
};

export default Header;
