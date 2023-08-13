import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Order from "../components/Orden/Order";
import Comentarios from "../components/Comentarios/Comentarios";
import ViewCompra from "../components/Ventanas/ViewCompra";
import ViewError from "../components/Ventanas/ViewError";
import { FaShoppingCart } from "react-icons/fa";

const Card = (props) => {
  const { showOrder, setShowOrder } = props;
  const { changeBackground } = props;
  const { totalPrice, setTotalPrice } = props;
  const [order, setOrder] = useState(0);
  const [comments, setComments] = useState(false);
  const { propClient } = props;
  const { products, setProducts } = props;
  const [idMenu, setIdMenu] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [client, setClient] = useState([]);
  const [showError, setShowError] = useState(false)


  const handleClickComments = () => {
    setComments(true);
  };

  useEffect(() => {
    
    const fetchClient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/correo/${propClient.email}`);
          if(!response.ok){
            throw new Error('Error al obtener los datos del cliente');
          }
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error("Error al obtener el correo del cliente:", error);
      }
    };

    fetchClient();
  }, []);

  const quitarCantidad = (productoId) => {
    // Buscar el producto por su ID en el array
    const index = products.findIndex(
      (producto) => producto.idMenu === productoId
    );

    if (index !== -1) {
      // Obtener el producto actual y su cantidad
      const productoActual = products[index];
      const nuevaCantidad = productoActual.cantidad - 1;
      setTotalPrice(totalPrice - productoActual.precioMenu);

      // Actualizar la cantidad y el precio total del producto
      if (nuevaCantidad > 0) {
        const productsActualizados = [...products];
        productsActualizados[index] = {
          ...productoActual,
          cantidad: nuevaCantidad,
          precioTotal: nuevaCantidad * productoActual.precioMenu,
        };
        setProducts(productsActualizados);
      } else {
        // Si la cantidad llega a cero, eliminar el producto del array
        const productsActualizados = products.filter(
          (producto) => producto.idMenu !== productoId
        );
        setProducts(productsActualizados);
      }
    }
  };
  useEffect(() => {
    quitarCantidad(idMenu);
    setIdMenu(0);
  });

  const handleCompraClick = () => {
    if(products.length == 0){
      setShowError(true)
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }else{
      setShowButtons(true);
    }
    
  };

  return (
    <div
      className={` lg:col-span-2 fixed top-0 ${
        changeBackground ? "bg-stone-800" : "bg-orange-500"
      } w-full lg:w-96 lg:right-0 h-full transition-all z-20 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      <ViewError mostrar = {showError} contenido={"Agrega productos al carrito de compra"}/>
      <div className="relative pt-16 lg:pt-3 text-gray-300 p-8 h-full">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-black bg-slate-100 rounded-full text-xl cursor-pointer"
        />
        {/* Botones */}
        <div className={`flex items-center gap-4 flex-wrap mb-5`}>
          <button
            className={`${
              comments ? "bg-none border border-white" : "bg-[#1F1D2B]"
            } text-white p-3 py-2 px-4 rounded-xl`}
            onClick={() => setComments(false)}
          >
            
            <p className="mr-6 flex justify-center gap-4 items-center">Carrito< FaShoppingCart className="mr-3 text-[20px]"/></p>
            
          </button>
          <p></p>
          <button
            className={`${
              comments ? "bg-[#1F1D2B] " : "bg-none border border-white"
            } text-white p-3 py-2 px-4 rounded-xl `}
            onClick={handleClickComments}
          >
            Comentarios
          </button>
        </div>
        <div>
          <div className={`${comments? "hidden":"grid grid-cols-5 mb-2 p-4"} `}>
            <h5 className="col-span-4 text-white">Comida</h5>
            <h5 className="text-white">SubTotal</h5>
          </div>
          <div className={`${comments? "flex justify-center p-3 ":"hidden"}`}>
            <h2 className="text-[18px] text-white">Comentarios de las personas</h2>
          </div>
          {/* Productos seleccionados */}
          <div
            className={`${
              comments ? "hidden" : "block"
            } h-[350px] md:h-[700px] lg:h-[490px] sm:h-[350px] overflow-auto`}
          >
            {products.map((arreglo, index) => (
              <Order
                key={index}
                products={arreglo}
                order={order}
                setOrder={setOrder}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                idMenu={idMenu}
                setIdMenu={setIdMenu}
                changeBackground = {changeBackground}
              />
            ))}
          </div>
          <div
            className={`${
              comments ? "flex flex-col-reverse " : "hidden"
            } h-[470px] md:h-[700px] lg:h-[645px] overflow-y-scroll`}
          >
            <Comentarios propClient={propClient} />
          </div>
        </div>
        {/* Comprar */}
        <div
          className={`${changeBackground ? "bg-slate-600" : "bg-[#1F1D2B]"} ${
            comments ? "hidden" : "block relative w-full bottom-0 left-0 p-4 rounded-[10px]"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-white pt-2 pb-2 text-[17px]">Total Pago</p>
            <span className="text-white text-[17px]">{Math.abs(totalPrice)}Bs</span>
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
          showButtons
            ? "fixed inset-0 flex items-center justify-center z-50"
            : "hidden"
        }`}
      >
        <ViewCompra
          showButtons={showButtons}
          setShowButtons={setShowButtons}
          client = {client}
          products = {products}
          totalPrice = {totalPrice}

        />
      </div>
    </div>
  );
};

export default Card;
