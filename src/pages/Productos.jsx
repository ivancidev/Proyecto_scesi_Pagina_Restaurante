import { useState, useEffect } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
} from "react-icons/ri";
// Components
import Sidebar from "../components/Sidebar";
import Car from "../components/Car";
import Header from "../components/Header";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/imagenes/logo.png";
import { BsXCircleFill } from "react-icons/bs";
import ViewError from "../Views/ViewError";
import ChangePassword from "../components/changePassword/ChangePassword";
import { FaShoppingCart } from "react-icons/fa";

function Productos() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [cambioFondo, setFondo] = useState(false);
  const [valueComida, setValueComida] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [comida, setComida] = useState([]);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [platos, setPlatos] = useState([]);
  const location = useLocation();
  const propCliente = location.state?.prop;
  const propUser = location.state?.prop;
  const [plato, setPlato] = useState("fritos");
  const [productos, setProductos] = useState([]);
  const [mostrarError, setMostrarError] = useState(false)
  const [ventana, setVentana] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  const handleOpenClick = (c) => {
    setModalOpen(true);
    setComida(c);
  };

  const handlePrecio = (p) => {
    setTotalPrecio(parseInt(totalPrecio) + parseInt(p));
  };

  const handleButtonErrorClick = () => {
    setMostrarError(true);
    setTimeout(() => {
      setMostrarError(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch(`http://localhost:4000/platos/${plato}`);
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        console.error("Error al obtener los platos:", error);
      }
    };

    fetchPlatos();
  }, [plato]);

  const agregarProducto = (plato) => {
    // Buscar si el producto ya está en el array
    const index = productos.findIndex(
      (producto) => producto.idPlato === plato.idPlato
    );

    if (index !== -1) {
      // Si el producto ya está en el array, actualizar su cantidad y precio total
      const productosActualizados = [...productos];
      productosActualizados[index].cantidad += 1;
      productosActualizados[index].precioTotal =
        productosActualizados[index].cantidad *
        productosActualizados[index].precio;
      handlePrecio(productosActualizados[index].precio);
      setProductos(productosActualizados);
    } else {
      // Si el producto no está en el array, agregarlo con cantidad 1 y precio total
      const nuevoProducto = {
        ...plato,
        cantidad: 1,
        precioTotal: plato.precio,
      };
      setProductos([...productos, nuevoProducto]);
      handlePrecio(plato.precio);
    }
  };

  const listaComidas = platos.map((plato) => {
    return (
      <div
        className="hover:cursor-pointer hover:scale-[1.02] transition-all bg-[#1F1D2B] p-7 rounded-xl flex flex-col items-center gap-5 text-center text-gray-300 h-full"
        key={plato.idPlato}
      >
        <Card
          imagen={plato.imagen}
          descripcion={plato.descripcionPlato}
          precio={plato.precio}
          disponibilidad={plato.disponibilidad}
          nombrePlato={plato.nombrePlato}
        />    
        <div className="flex flex-col h-[100%] gap-4 justify-end">
          <button
            className={`${plato.disponibilidad == "Disponible" ? "flex gap-2 pt-2 pb-2 pr-12 pl-12 bg-orange-400 rounded-[10px] text-[14px] text-white":"hidden"} `}
            onClick={() => agregarProducto(plato)}
          >
            Agregar< FaShoppingCart className="mr-3 text-[20px]"/>
          </button>
          <button
            className={`${plato.disponibilidad == "No disponible" ? "block pt-2 pb-2 pr-12 pl-12 bg-red-600 rounded-[10px] text-[14px] text-white":"hidden"} `}
            onClick={handleButtonErrorClick}
          >
            No disponible
          </button>
          <button
            className="pt-2 pb-2 bg-orange-400 rounded-[10px] text-[14px] text-white"
            onClick={() => handleOpenClick(plato)}
          >
            Ver detalle
          </button>
        </div>
      </div>
      
    );
  });

  return (
    <header
      className={`${
        cambioFondo ? "bg-stone-800" : "bg-white"
      } w-full min-h-screen`}
    >
      <ChangePassword propUser = {propUser} ventana = {ventana} setVentana = {setVentana}/>
      <ViewError mostrar = {mostrarError} contenido = {"Producto no disponible por el momento"}/>
      <div
        className={`fixed inset-0 z-50 bg-white bg-transparent p-4 ${
          modalOpen ? "flex" : "hidden"
        }`}
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
                  {comida.nombrePlato}
                </h1>
                <div className="mt-4 mb-4 flex justify-center">
                  <img
                    src={comida.imagen}
                    alt="no existe imagen"
                    className="rounded-lg w-full h-auto md:w-[400px]"
                  />
                </div>
                <p className="p1 text-center text-orange-500 p-1 text-lg text-[25px]">
                  {comida.precio}Bs
                </p>
                <p className="p1 text-[20px] text-center text-orange-500 p-1">
                  {comida.disponibilidad}
                </p>
                <p className="mt-5">{comida.descripcionPlato}</p>
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

      <div className="hidden md:block ">
        <p
          onClick={toggleMenu}
          className={`${cambioFondo? "text-white":"text-[#262837]"} m-10 text-[40px] absolute  hover:cursor-pointer transition-all`}
        >
          {<BsPersonCircle />}
        </p>
      </div>
      <div className={`${showMenu ? "block" : "hidden"}  transition-all`}>
        <Sidebar
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          propUser={propUser}
          propCliente={propCliente}
          cambioFondo={cambioFondo}
          setFondo={setFondo}
          ventana = {ventana} setVentana = {setVentana}
        />
      </div>

      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        cambioFondo={cambioFondo}
        valueComida={valueComida}
        totalPrecio={totalPrecio}
        setTotalPrecio={setTotalPrecio}
        propUser={propUser}
        propCliente={propCliente}
        productos={productos}
        setProductos={setProductos}
      />
      {/* Menu movil */}
      <nav className={`${cambioFondo? "bg-slate-600":"bg-orange-600"}  lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl z-50`}>
        <button onClick={toggleOrders} className="p-2">
          <FaShoppingCart />
        </button>
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiUser3Line />}
        </button>
      </nav>
      <main className="lg:pl-20 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* El Header */}
          <Header plato={plato} setPlato={setPlato} cambioFondo = {cambioFondo} />
          <div className="flex items-center justify-center mb-16">
            <h2 className="text-[35px] text-orange-600 p1 ml-5 text-center">
              🧑‍🍳El Bocado Perfecto🍲
            </h2>
          </div>
          {/* platos*/}
          <div
            className={`p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16`}
          >
            {listaComidas}
          </div>
        </div>
      </main>
    </header>
  );
}

export default Productos;
