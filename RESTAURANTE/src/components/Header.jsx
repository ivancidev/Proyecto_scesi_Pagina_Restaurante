import React, { useState, useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [platos, setPlatos] = useState([]);
  const navigate = useNavigate();
  const { plato, setPlato } = props;

  
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setPlato(event.target.value)
  };
  

  const filteredCards = platos.filter((card) =>
    card.nombrePlato.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/platos`);
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchPlatos();
  }, []);

  return (
    <header>
      <div className="absolute ml-7 hidden md:block">
        <p className="text-orange-600 text-[35px] p1"> ¡Bienvenido!</p>
      </div>
      {/* Title and search */}
      <div className="flex flex-col md:flex-row md:justify-end md:items-center gap-4 mb-6">
        <form>
          <div className="w-full relative">
            <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              className="bg-[#262837] w-full py-2 pl-10 pr-4 rounded-lg text-gray-300 outline-none"
              placeholder="Buscar"
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
                    key={card.idPlato}
                    onClick={() => navigate(`/${card.nombrePlato}`)}
                  >
                    <ul className="flex items-center">
                      <img
                        src={card.imagen}
                        alt="imagen"
                        className="w-[30px] h-[30px] rounded-[50%] ml-[7px]"
                      />
                      <li className="mb-4 mt-1 ml-[10px] text-[17px] ">
                        {card.nombrePlato}
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
      <nav className="text-gray-300 flex items-center justify-between md:justify-start md:gap-8 border-b-4 border-orange-700 mb-6">
        <button
          onClick={() => setPlato("fritos")}
          className={`${
            plato == "fritos" ? "text-red-600" : "text-black py-2 pr-4 "
          }`}
        >
          Platos fritos
        </button>
        <button
          onClick={() => setPlato("Sopa")}
          className={`${
            plato == "Sopa" ? "text-red-600" : "text-black py-2 pr-4 "
          }`}
        >
          Sopas
        </button>
        <button
          onClick={() => setPlato("Desayuno")}
          className={`${
            plato == "Desayuno" ? "text-red-600" : "text-black py-2 pr-4 "
          }`}
        >
          Desayunos
        </button>
        <button
          onClick={() => setPlato("Postre")}
          className={`${
            plato == "Postre" ? "text-red-600" : "text-black py-2 pr-4 "
          }`}
        >
          Postres
        </button>
        <button
          onClick={() => setPlato("Jugo")}
          className={`${
            plato == "Jugo" ? "text-red-600" : "text-black py-2 pr-4 "
          }`}
        >
          Jugos
        </button>
      </nav>
    </header>
  );
};

export default Header;
