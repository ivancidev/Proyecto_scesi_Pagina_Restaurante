import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Order from "../components/Orden/Order";
import Comentarios from "../components/Comentarios/Comentarios";
import ViewCompra from "../Views/ViewCompra";

const Card = (props) => {
  const { showOrder, setShowOrder } = props;
  const { cambioFondo } = props;
  const { totalPrecio, setTotalPrecio } = props;
  const [orden, setOrden] = useState(0);
  const [comentarios, setComentarios] = useState(false);
  const { propCliente } = props;
  const { productos, setProductos } = props;
  const [idPlato, setIdPlato] = useState(0);
  const [mostrarBotones, setMostrarBotones] = useState(false);

  useEffect(() => {
    setTotalPrecio(Math.abs(orden - totalPrecio));
    setOrden(0);
  });

  const handleClickComentarios = () => {
    setComentarios(true);
  };

  const quitarCantidad = (productoId) => {
    // Buscar el producto por su ID en el array
    const index = productos.findIndex(
      (producto) => producto.idPlato === productoId
    );

    if (index !== -1) {
      // Obtener el producto actual y su cantidad
      const productoActual = productos[index];
      const nuevaCantidad = productoActual.cantidad - 1;
      setTotalPrecio(totalPrecio - productoActual.precio);

      // Actualizar la cantidad y el precio total del producto
      if (nuevaCantidad > 0) {
        const productosActualizados = [...productos];
        productosActualizados[index] = {
          ...productoActual,
          cantidad: nuevaCantidad,
          precioTotal: nuevaCantidad * productoActual.precio,
        };
        setProductos(productosActualizados);
      } else {
        // Si la cantidad llega a cero, eliminar el producto del array
        const productosActualizados = productos.filter(
          (producto) => producto.idPlato !== productoId
        );
        setProductos(productosActualizados);
      }
    }
  };
  useEffect(() => {
    quitarCantidad(idPlato);
    setIdPlato(0);
  });

  const handleCompraClick = () => {
    setMostrarBotones(true);
  };

  return (
    <div
      className={` lg:col-span-2 fixed top-0 ${
        cambioFondo ? "bg-stone-800" : "bg-orange-600"
      } w-full lg:w-96 lg:right-0 h-full transition-all z-20 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      <div className="relative pt-16 lg:pt-3 text-gray-300 p-8 h-full">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-black bg-slate-100 rounded-full text-xl cursor-pointer"
        />
        {/* Botones */}
        <div className="flex items-center gap-4 flex-wrap mb-5">
          <button
            className={`${
              comentarios ? "bg-none border border-white" : "bg-[#d60e0e]"
            } text-white p-3 py-2 px-4 rounded-xl`}
            onClick={() => setComentarios(false)}
          >
            Orden Cliente
          </button>
          <button
            className={`${
              comentarios ? "bg-[#d60e0e] " : "bg-none border border-white"
            } text-white p-3 py-2 px-4 rounded-xl `}
            onClick={handleClickComentarios}
          >
            Comentarios
          </button>
        </div>
        {/* Car */}
        <div>
          <div className="grid grid-cols-5 mb-2 p-4">
            <h5 className="col-span-4 text-white">Comida</h5>
            <h5 className="text-white">SubTotal</h5>
          </div>
          {/* Productos */}
          <div
            className={`${
              comentarios ? "hidden" : "block"
            } h-[400px] md:h-[700px] lg:h-[460px] overflow-auto`}
          >
            {productos.map((arreglo, index) => (
              <Order
                key={index}
                productos={arreglo}
                orden={orden}
                setOrden={setOrden}
                totalPrecio={totalPrecio}
                setTotalPrecio={setTotalPrecio}
                idPlato={idPlato}
                setIdPlato={setIdPlato}
              />
            ))}
          </div>
          <div
            className={`${
              comentarios ? "flex flex-col-reverse " : "hidden"
            } h-[400px] md:h-[700px] lg:h-[645px] overflow-y-scroll`}
          >
            <Comentarios propCliente={propCliente} />
          </div>
        </div>
        {/* Comprar */}
        <div
          className={`${cambioFondo ? "bg-stone-800" : "bg-[#d60e0e]"} ${
            comentarios ? "hidden" : "block"
          } relative w-full bottom-0 left-0 p-4`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Descuento</span>
            <span>{totalPrecio > 100 ? "10%" : "0"}</span>
          </div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 pt-2 pb-2 text-[14px]">Total</p>
            <span>{Math.abs(totalPrecio)}</span>
          </div>
          <div>
            <button
              onClick={handleCompraClick}
              className="bg-[#ec7c6a] w-full py-2 px-4 rounded-lg"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${
          mostrarBotones
            ? "fixed inset-0 flex items-center justify-center z-50"
            : "hidden"
        }`}
      >
        <ViewCompra
          mostrarBotones={mostrarBotones}
          setMostrarBotones={setMostrarBotones}
          propCliente = {propCliente}
          productos = {productos}
          totalPrecio = {totalPrecio}

        />
      </div>
    </div>
  );
};

export default Card;
