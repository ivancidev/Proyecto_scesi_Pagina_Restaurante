import { useState, useEffect } from "react";
import {
  RiUser3Line,
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
import ViewError from "../components/Window/ViewError";
import ChangePassword from "../components/changePassword/ChangePassword";
import { FaShoppingCart } from "react-icons/fa";

function Products() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [changeBackground, setChangeBackground] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [food, setFood] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishes, setDishes] = useState([]);
  const location = useLocation();
  const propClient = location.state?.prop;
  const propUser = location.state?.prop;
  const [dish, setDish] = useState("friedmenu");
  const [products, setProducts] = useState([]);
  const [showError, setShowError] = useState(false)
  const [window, setWindow] = useState(false)

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
    setFood(c);
  };

  const handlePrecio = (p) => {
    setTotalPrice(parseInt(totalPrice) + parseInt(p));
  };

  const handleButtonErrorClick = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/menus/${dish}`);
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Error al obtener los platos:", error);
      }
    };

    fetchDishes();
  }, [dish]);

  const addProduct = (dish) => {
    // Buscar si el producto ya está en el array
    const index = products.findIndex(
      (product) => product.idMenu === dish.idMenu
    );

    if (index !== -1) {
      // Si el producto ya está en el array, actualizar su cantidad y precio total
      const productsActualizados = [...products];
      productsActualizados[index].cantidad += 1;
      productsActualizados[index].precioTotal =
        productsActualizados[index].cantidad *
        productsActualizados[index].precioMenu;
      handlePrecio(productsActualizados[index].precioMenu);
      setProducts(productsActualizados);
    } else {
      // Si el producto no está en el array, agregarlo con cantidad 1 y precio total
      const nuevoProducto = {
        ...dish,
        cantidad: 1,
        precioTotal: dish.precioMenu,
      };
      setProducts([...products, nuevoProducto]);
      handlePrecio(dish.precioMenu);
    }
  };

  const listFoods = dishes.map((dish) => {
    return (
      <div
        className="hover:cursor-pointer hover:scale-[1.02] transition-all bg-[#1F1D2B] p-7 rounded-xl flex flex-col items-center gap-5 text-center text-gray-300 h-full"
        key={dish.idMenu}
      >
        <Card
          image={dish.imagen}
          description={dish.descripcionMenu}
          price={dish.precioMenu}
          availability={dish.disponibilidad}
          nameDish={dish.nombreMenu}
        />    
        <div className="flex flex-col h-[100%] gap-4 justify-end">
          <button
            className={`${dish.disponibilidad == "Disponible" ? "flex gap-2 pt-2 pb-2 pr-12 pl-12 bg-orange-400 rounded-[10px] text-[14px] text-white":"hidden"} `}
            onClick={() => addProduct(dish)}
          >
            Agregar< FaShoppingCart className="mr-3 text-[20px]"/>
          </button>
          <button
            className={`${dish.disponibilidad == "No disponible" ? "block pt-2 pb-2 pr-12 pl-12 bg-red-600 rounded-[10px] text-[14px] text-white":"hidden"} `}
            onClick={handleButtonErrorClick}
          >
            No disponible
          </button>
          <button
            className="pt-2 pb-2 bg-orange-400 rounded-[10px] text-[14px] text-white"
            onClick={() => handleOpenClick(dish)}
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
        changeBackground ? "bg-stone-800" : "bg-white"
      } w-full min-h-screen`}
    >
      <ChangePassword propUser = {propUser} window = {window} setWindow = {setWindow}/>
      <ViewError showError = {showError} content = {"Producto no disponible por el momento"}/>
      <div
        className={` ${
          modalOpen ? "flex fixed inset-0 z-50 bg-gray-500 bg-transparent p-4" : "hidden"
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
                    src={logo}
                    alt="no disponible"
                    className="w-44 h-44 rounded-full"
                  />
                </div>
                <p className="text-left">{food.descripcionServicio}</p>
              </div>
            </div>
          </div>
        </div>
      </div><div
        className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 ${
          modalOpen ? "flex" : "hidden"
        }`}
      >
        <div className="items-center justify-center flex w-full h-full overflow-auto">
          <div className="bg-red-100 p-9 rounded-[12px] md:rounded-[20px] md:mt-[-2px] mt-24 md:w-[75%] w-[95%] relative">
            <BsXCircleFill
              className="text-[30px] text-orange-500 transition-all absolute md:top-5 top-56 right-4 cursor-pointer"
              onClick={()=>setModalOpen(false)}
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
                    src={logo}
                    alt="no disponible"
                    className="w-44 h-44 rounded-full"
                  />
                </div>
                <p className="text-left">{food.descripcionServicio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block ">
        <p
          onClick={toggleMenu}
          className={`${changeBackground? "text-white":"text-[#262837]"} m-10 text-[40px] absolute  hover:cursor-pointer transition-all`}
        >
          {<BsPersonCircle />}
        </p>
      </div>
      <div className={`${showMenu ? "block" : "hidden"}  transition-all`}>
        <Sidebar
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          propUser={propUser}
          propClient={propClient}
          changeBackground={changeBackground}
          setChangeBackground={setChangeBackground}
          window = {window} setWindow = {setWindow}
        />
      </div>

      <Car
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        changeBackground={changeBackground}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        propUser={propUser}
        propClient={propClient}
        products={products}
        setProducts={setProducts}
      />
      {/* Menu movil */}
      <nav className={`${changeBackground? "bg-slate-600":"bg-orange-500"}  lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl z-50`}>
        <button onClick={toggleOrders} className="text-white p-2">
          <FaShoppingCart/>
        </button>
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiUser3Line />}
        </button>
      </nav>
      <main className="lg:pl-20 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* El Header */}
          <Header dish={dish} setDish={setDish} changeBackground = {changeBackground} />
          <div className="flex items-center justify-center mb-16">
            <h2 className="text-[35px] text-orange-600 p1 ml-5 text-center">
              🧑‍🍳El Bocado Perfecto🍲
            </h2>
          </div>
          {/* platos*/}
          <div
            className={`p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16`}
          >
            {listFoods}
          </div>
        </div>
      </main>
    </header>
  );
}

export default Products;
