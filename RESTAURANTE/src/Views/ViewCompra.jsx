import React from "react";
import { useState } from "react";
import OpcionBoton from "../components/OpcionesCompra/OpcionBoton";
import DetalleCompra from "../components/DetalleCompra/DetalleCompra";
import {BsXCircleFill} from "react-icons/bs"

const ViewCompra = (props) => {
  const { mostrarBotones, setMostrarBotones } = props;
  const [seleccionOpcion, setSeleccionOpcion] = useState(null);
  const [abrirModal, setAbrirModal] = useState(false);
  const {propCliente} = props
  const{productos} = props
  const {totalPrecio} = props

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
        <div className="absolute top-0 right-0 m-4">
        <BsXCircleFill onClick={()=>setMostrarBotones(false)} className="text-3xl text-white cursor-pointer" />
      </div>
      <div className="container mx-auto px-4 z-50">
        <div className="flex justify-center">
          {/*OpcionBoton */}
          <OpcionBoton
            abrirModal={abrirModal}
            setAbrirModal = {setAbrirModal}
            mostrarBotones={mostrarBotones}
            setSeleccionOpcion = {setSeleccionOpcion}
          />
          <div className={`${abrirModal ? "flex justify-center" : "hidden"}`}>
            <div
              className={`${
                seleccionOpcion == "Delivery" ? "flex justify-center" : "hidden"
              }`}
            >
              <DetalleCompra setAbrirModal={setAbrirModal} propCliente = {propCliente} productos = {productos} totalPrecio={totalPrecio} setMostrarBotones = {setMostrarBotones}/>
            </div>
            <div
              className={`${
                seleccionOpcion == "Restaurante"
                  ? "flex justify-center"
                  : "hidden"
              }`}
            >
              <p>Restaurante</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ViewCompra;
