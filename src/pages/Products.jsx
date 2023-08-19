import { RiUser3Line, RiCloseLine } from "react-icons/ri";
import Sidebar from "../components/Sidebar";
import CardDetails from "../components/CardDetails";
import Header from "../components/Header";
import { BsPersonCircle } from "react-icons/bs";
import ModalError from "../components/Modals/ModalError";
import ChangePassword from "../components/changePassword/ChangePassword";
import { FaShoppingCart } from "react-icons/fa";
import { useAddProduct } from "../components/hooks/useAddProduct";
import { useProductState } from "../components/hooks/useProductState";
import { useErrorHandling } from "../components/hooks/useErrorHandling";
import { useApiRequest } from "../components/hooks/useApiRequest";
import OrderCard from "../components/Orders/OrderCard";
import ModalWindow from "../components/Modals/ModalWindow";
import { getPostMenus } from "../api/posts";

function Products() {
  const {
    showMenu,
    setShowMenu,
    showOrder,
    setShowOrder,
    changeBackground,
    setChangeBackground,
    modalOpen,
    setModalOpen,
    food,
    setFood,
    totalPrice,
    setTotalPrice,
    dish,
    setDish,
    window,
    setWindow,
    toggleMenu,
    toggleOrders,
  } = useProductState();
  const { showError, handleButtonErrorClick } = useErrorHandling();
  const { addProduct } = useAddProduct(totalPrice, setTotalPrice);
  const { data: dishes } = useApiRequest(getPostMenus(dish));

  const handleOpenClick = (foodSelecction) => {
    setModalOpen(true);
    setFood(foodSelecction);
  };

  return (
    <header
      className={`${
        changeBackground ? "bg-stone-800" : "bg-white"
      } w-full min-h-screen`}
    >
      <ChangePassword window={window} setWindow={setWindow} />
      <ModalError
        showError={showError}
        content={"Orden no disponible por el momento"}
      />
      <ModalWindow
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        food={food}
      />
      <div className="hidden md:block ">
        <p
          onClick={toggleMenu}
          className={`${
            changeBackground ? "text-white" : "text-[#262837]"
          } m-10 text-[40px] absolute  hover:cursor-pointer transition-all`}
        >
          {<BsPersonCircle />}
        </p>
      </div>
      <div className={`${showMenu ? "block" : "hidden"}  transition-all`}>
        <Sidebar
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          changeBackground={changeBackground}
          setChangeBackground={setChangeBackground}
          window={window}
          setWindow={setWindow}
        />
      </div>

      <CardDetails
        showOrder={showOrder}
        setShowOrder={setShowOrder}
        changeBackground={changeBackground}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
      {/* Menu movil */}
      <nav
        className={`${
          changeBackground ? "bg-slate-600" : "bg-orange-500"
        }  lg:hidden fixed w-full bottom-0 left-0 text-3xl text-gray-400 py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl z-50`}
      >
        <button onClick={toggleOrders} className="text-white p-2">
          {showOrder ? <RiCloseLine /> : <FaShoppingCart />}
        </button>
        <button onClick={toggleMenu} className="text-white p-2">
          {showMenu ? <RiCloseLine /> : <RiUser3Line />}
        </button>
      </nav>
      <main className="lg:pl-20 lg:pr-96 pb-20">
        <div className="md:p-8 p-4">
          {/* El Header */}
          <Header
            dish={dish}
            setDish={setDish}
            changeBackground={changeBackground}
          />
          <div className="flex items-center justify-center mb-16">
            <h2 className="text-[35px] text-orange-600 p1 ml-5 text-center">
              🧑‍🍳El Bocado Perfecto🍲
            </h2>
          </div>
          {/* platos*/}
          <div
            className={`p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16`}
          >
            {dishes && dishes.length > 0 ? (
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
              <div className="flex flex-col justify-center items-center h-full w-full">
                <p className="text-[25px] text-slate-700 font-serif">
                  Cargando ordenes...
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </header>
  );
}

export default Products;
