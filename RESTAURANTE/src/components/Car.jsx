import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Order from "../components/Orden/Order";
import Comentarios from "../components/Comentarios/Comentarios";
import ViewCompra from "../Views/ViewCompra";
import ViewError from "../Views/ViewError";
import { FaShoppingCart } from "react-icons/fa";

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
  const [cliente, setCliente] = useState([]);
  const [mostrarError, setMostrarError] = useState(false)


  const handleClickComentarios = () => {
    setComentarios(true);
  };

  useEffect(() => {
    
    const fetchCliente = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/cliente/correo/${propCliente.correo}`);
          if(!response.ok){
            throw new Error('Error al obtener los datos del cliente');
          }
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error("Error al obtener el correo del cliente:", error);
      }
    };

    fetchCliente();
  }, []);

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
    if(productos.length == 0){
      setMostrarError(true)
      setTimeout(() => {
        setMostrarError(false);
      }, 3000);
    }else{
      setMostrarBotones(true);
    }
    
  };

  return (
    <div
      className={` lg:col-span-2 fixed top-0 ${
        cambioFondo ? "bg-stone-800" : "bg-orange-500"
      } w-full lg:w-96 lg:right-0 h-full transition-all z-20 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      <ViewError mostrar = {mostrarError} contenido={"Agrega productos al carrito de compra"}/>
      <div className="relative pt-16 lg:pt-3 text-gray-300 p-8 h-full">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-black bg-slate-100 rounded-full text-xl cursor-pointer"
        />
        {/* Botones */}
        <div className={`flex items-center gap-4 flex-wrap mb-5`}>
          <button
            className={`${
              comentarios ? "bg-none border border-white" : "bg-[#1F1D2B]"
            } text-white p-3 py-2 px-4 rounded-xl`}
            onClick={() => setComentarios(false)}
          >
            
            <p className="mr-6 flex justify-center gap-4 items-center">Carrito< FaShoppingCart className="mr-3 text-[20px]"/></p>
            
          </button>
          <p></p>
          <button
            className={`${
              comentarios ? "bg-[#1F1D2B] " : "bg-none border border-white"
            } text-white p-3 py-2 px-4 rounded-xl `}
            onClick={handleClickComentarios}
          >
            Comentarios
          </button>
        </div>
        <div>
          <div className={`${comentarios? "hidden":"grid grid-cols-5 mb-2 p-4"} `}>
            <h5 className="col-span-4 text-white">Comida</h5>
            <h5 className="text-white">SubTotal</h5>
          </div>
          <div className={`${comentarios? "flex justify-center p-3 ":"hidden"}`}>
            <h2 className="text-[18px] text-white">Comentarios de las personas</h2>
          </div>
          {/* Productos seleccionados */}
          <div
            className={`${
              comentarios ? "hidden" : "block"
            } h-[350px] md:h-[700px] lg:h-[490px] sm:h-[350px] overflow-auto`}
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
            } h-[470px] md:h-[700px] lg:h-[645px] overflow-y-scroll`}
          >
            <Comentarios propCliente={propCliente} />
          </div>
        </div>
        {/* Comprar */}
        <div
          className={`${cambioFondo ? "bg-stone-800" : "bg-[#1F1D2B]"} ${
            comentarios ? "hidden" : "block relative w-full bottom-0 left-0 p-4 rounded-[10px]"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-white pt-2 pb-2 text-[17px]">Total Pago</p>
            <span className="text-white text-[17px]">{Math.abs(totalPrecio)}Bs</span>
          </div>
          <div>
            <button
              onClick={handleCompraClick}
              className="bg-sky-100 w-full py-2 px-4 rounded-lg text-black hover:bg-slate-500 hover:text-white text-[17px]"
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
          cliente = {cliente}
          productos = {productos}
          totalPrecio = {totalPrecio}

        />
      </div>
    </div>
  );
};

export default Card;
