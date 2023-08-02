import React from "react";
import { useState } from "react";
import OpcionBoton from "../components/OpcionesCompra/OpcionBoton";
import DetalleCompra from "../components/DetalleCompra/DetalleCompra";
import {BsXCircleFill} from "react-icons/bs"

const ViewCompra = (props) => {
  const { mostrarBotones, setMostrarBotones } = props;
  const [seleccionOpcion, setSeleccionOpcion] = useState(null);
  const [abrirModal, setAbrirModal] = useState(false);
  const {cliente} = props
  const{productos} = props
  const {totalPrecio} = props

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
        <div className="absolute top-0 right-0 m-4">
        <BsXCircleFill onClick={()=>setMostrarBotones(false)} className="text-3xl text-white hover:text-slate-300 cursor-pointer" />
      </div>
      <div className="container mx-auto px-4 z-50 transition-all">
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
              className={`flex justify-center`}
            >
              <DetalleCompra seleccionOpcion = {seleccionOpcion} setAbrirModal={setAbrirModal} cliente = {cliente} productos = {productos} totalPrecio={totalPrecio} setMostrarBotones = {setMostrarBotones}/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ViewCompra;
