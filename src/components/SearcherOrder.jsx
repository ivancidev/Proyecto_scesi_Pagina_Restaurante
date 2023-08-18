import React, { useState } from "react";
import useApiRequest from "./hooks/useApiRequest";
import { getAllMenu } from "../api/posts";
import { RiSearch2Line } from "react-icons/ri";

const SearcherOrder = ({setDish, setModalOpen, setFood, changeBackground }) => {
  
  const [searchValue, setSearchValue] = useState("");
  const { data: foods } = useApiRequest(getAllMenu());

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    setDish(event.target.value);
  };

  const filteredCards = foods
    ? foods.filter((card) =>
        card.nombreMenu.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const handleOpenClick = (c) => {
    setModalOpen(true);
    setSearchValue("");
    setFood(c);
  };

  return (
    <form className="transition-all">
      <div className="w-full relative">
        <RiSearch2Line
          className={`${
            changeBackground ? "text-black" : "text-white"
          } absolute left-3 top-1/2 -translate-y-1/2 `}
        />
        <input
          type="text"
          className={`${
            changeBackground
              ? "text-black  bg-white"
              : "text-gray-300 bg-[#262837]"
          }  w-full py-2 pl-10 pr-4 rounded-lg  outline-none`}
          placeholder="Buscar orden"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="w-full relative z-20">
        <div
          className={`w-full absolute ${searchValue ? "flex" : "hidden"}`}
          style={{ overflow: "auto", minHeight: "450px" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
            {filteredCards.map((card) => (
              <div
                className={`p-3 w-full flex bg-[#1F1D2B] text-white  hover:bg-slate-500 hover:cursor-pointer hover:text-white hover:rounded `}
                key={card.idMenu}
                onClick={() => handleOpenClick(card)}
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
  );
};

export default SearcherOrder;
