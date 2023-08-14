import { RiUser3Line,RiCloseLine } from "react-icons/ri";
// Components
import Sidebar from "../components/Sidebar";
import Car from "../components/Car";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/imagenes/logo.png";
import { BsXCircleFill } from "react-icons/bs";
import ViewError from "../components/Window/ViewError";
import ChangePassword from "../components/changePassword/ChangePassword";
import { FaShoppingCart } from "react-icons/fa";
import {useAddProduct} from "../components/hooks/useAddProduct"
import {useProductState} from "../components/hooks/useProductState"
import { useErrorHandling } from "../components/hooks/useErrorHandling";
import { useApiRequest } from "../components/hooks/useApiRequest";
import OrderCard from "../components/Orders/OrderCard";

function Products() {
  
  const location = useLocation();
  const { showMenu, setShowMenu, showOrder, setShowOrder, changeBackground,
    setChangeBackground, modalOpen, setModalOpen, food, setFood, totalPrice,
    setTotalPrice, dish, setDish, window, setWindow, toggleMenu, toggleOrders, } = useProductState()
  const { products, setProducts, addProduct } = useAddProduct(totalPrice, setTotalPrice);
  const { showError, handleButtonErrorClick } = useErrorHandling();
  const { data: dishes } = useApiRequest(
    `http://localhost:4000/menus/${dish}`
  );

  const propClient = location.state?.prop;
  const propUser = location.state?.prop;

  const handleOpenClick = (c) => {
    setModalOpen(true);
    setFood(c);
  };
  
  const listFoods = dishes && dishes.length > 0 ? (
    dishes.map((dish) => (
      <OrderCard
        key={dish.idMenu}
        dish={dish}
        addProduct={addProduct}
        handleButtonErrorClick={handleButtonErrorClick}
        handleOpenClick={handleOpenClick}
      />
    ))
  ) : (
    <div>Cargando ordenes...</div>
  );
  

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
          {showOrder ? <RiCloseLine />: <FaShoppingCart/>}
          
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
