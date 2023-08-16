import React from "react";
import { BsXCircleFill } from "react-icons/bs";


const ModalWindow = ({modalOpen, setModalOpen, food}) => {
  return (
    <header
      className={` ${
        modalOpen
          ? "fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 p-4"
          : "hidden"
      } transition-all`}
    >
      <div className="items-center justify-center flex w-full h-full overflow-auto">
        <div className="bg-red-100 p-9 rounded-[12px] md:rounded-[20px] md:mt-[-2px] mt-24 md:w-[75%] w-[95%] relative">
          <BsXCircleFill
            className="text-[30px] text-orange-500 transition-all absolute md:top-5 top-56 right-4 cursor-pointer"
            onClick={() => setModalOpen(false)}
          />
          <div className="md:flex md:mt-10 mt-52 md:justify-center">
            <div className="md:w-[400px] md:mr-6 md:mt-[-2px] mt-4">
              <h1 className="p1 p-1 text-center text-2xl text-orange-500 whitespace-nowrap">
                {food.nombreMenu}
              </h1>
              <div className="mt-4 mb-4 flex justify-center">
                <img
                  src={food.imagen}
                  alt="no existe imagen"
                  className="rounded-lg w-full h-auto md:w-[400px]"
                />
              </div>
              <p className="p1 text-center text-orange-500 p-1 text-lg text-[25px]">
                {food.precioMenu}Bs
              </p>
              <p className="p1 text-[20px] text-center text-orange-500 p-1">
                {food.disponibilidad}
              </p>
              <p className="mt-5">{food.descripcionMenu}</p>
            </div>
            <div className="md:w-[500px] mt-4 md:mt-0">
              <div className="flex justify-center p-4">
                <img
                  src="/logo.png"
                  alt="no disponible"
                  className="w-44 h-44 rounded-full"
                />
              </div>
              <p className="text-left">{food.descripcionServicio}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModalWindow;
