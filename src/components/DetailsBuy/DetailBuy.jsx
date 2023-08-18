import React from "react";
import { useState } from "react";
import Form from "../Form/Form";
import MatrixTable from "../tables/MatrixTable";
import usePost from "../hooks/usePost";
import { concatenateNamesDishes, validateForm, validateCard } from "../helpers/detailHelper";
import ConfirmationModal from "../Window/ConfirmationModal";
import PurchaseSuccesModal from "../Window/PurchaseSuccesModal";
import ProductsTable from "../tables/ProductsTable";
import PaymentOptions from "../PaymentOptions";
import { createNewPostDelivery, createNewPostRestaurant, getDeleteProductsStorage, getProductsStorage } from "../../api/posts";

const DetailBuy = ({ setOpenModal, client, totalPrice, setShowButtons, selectionOption }) => {
  
  const [name, setName] = useState("");
  const [addres, setAddres] = useState("");
  const [phone, setPhone] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [orderNames, setOrderNames] = useState("");
  const [oneCheck, setOneCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [numberTable, setNumberTable] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const [thirdCheck, setThirdCheck] = useState(false);
  const [fourthCheck, setFourthCheck] = useState(false);
  const comboOptions = [10, 15, 30, 45, 60, 120];
  const [valueCombox, setValueCombox] = useState("");
  const [duration, setDuration] = useState(0);
  const [errors, setErrors] = useState({});
  const products = getProductsStorage()
  const clientDelivery = { name, addres, phone, numberCard, orderNames, totalPrice, date, hour };
  const clientRestaurant = { numberTable, numberCard, orderNames, valueCombox, date, hour, phone, name, totalPrice };

  const {
    confirmation: deliveryConfirmation,
    setConfirmation: setDeliveryConfirmation,
    buy: deliveryBuy,
    setBuy: setDeliveryBuy,
    handleSubmit: handleDelivery,
  } = usePost(createNewPostDelivery(), clientDelivery);

  const {
    confirmation: restaurantConfirmation,
    setConfirmation: setRestaurantConfirmation,
    buy: restaurantBuy,
    setBuy: setRestaurantBuy,
    handleSubmit: handleRestaurant,
  } = usePost(createNewPostRestaurant(), clientRestaurant);

  const handleDeliverySubmit = () => {
    handleDelivery();
    setDeliveryConfirmation(false);
    setDeliveryBuy(true);
  };

  const handleRestaurantSubmit = () => {
    handleRestaurant();
    setRestaurantConfirmation(false);
    timeDelivery();
    setRestaurantBuy(true);
  };

  const handleOneCheck = (e) => {
    setOneCheck(e.target.checked);
    setSecondCheck(false);
  };

  const handleSecondCheck = (e) => {
    setSecondCheck(e.target.checked);
    setOneCheck(false);
  };

  const handleThirdCheck = (e) => {
    setThirdCheck(e.target.checked);
    setFourthCheck(false);
  };

  const handleFourthCheck = (e) => {
    setFourthCheck(e.target.checked);
    setThirdCheck(false);
  };

  const handleCombox = (event) => {
    setValueCombox(event.target.value);
  };

  const handleInputChangeCard = (e) => {
    const { value } = e.target;
    setNumberCard(value);
  };

  const showBuySuccess = () => {
    let newErrors = {};

    if (selectionOption == "Restaurante") {
      newErrors = validateCard(fourthCheck, numberCard);
      setErrors(newErrors);
    } else {
      newErrors = validateForm(name, addres, phone, numberCard);
      setErrors(newErrors);
    }

    if (Object.keys(newErrors).length === 0) {
      // Obtenemos la fecha y hora actual
      const dateAct = new Date();
      const dateDelivery = dateAct.toLocaleDateString("es-ES");
      const hourDelivery = dateAct.toLocaleTimeString("es-ES", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      concatenateNamesDishes(products, setOrderNames);
      // Actualizamos el estado para mostrar la ventana de compra exitosa y la fecha y hora
      if (selectionOption == "Restaurante") {
        setRestaurantConfirmation(true);
        setName(client[0].nombre);
        setPhone(client[0].telefono);
      } else {
        setDeliveryConfirmation(true);
      }

      setDate(dateDelivery);
      setHour(hourDelivery);
    }
  };

  const closeBuyDelivery = () => {
    setDeliveryBuy(false);
    setOpenModal(false);
    setShowButtons(false);
    getDeleteProductsStorage()
    window.location.reload();
  };

  const closeBuySuccess = () => {
    setRestaurantBuy(false);
    setOpenModal(false);
    setShowButtons(false);
    getDeleteProductsStorage()
    window.location.reload();
  };

  const timeDelivery = () => {
    var timeDelayClient = parseInt(valueCombox);
    setDuration(parseInt(timeDelayClient + timeDelayClient / 2));
  };

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div
        className={`${
          deliveryBuy
            ? "hidden transition-all"
            : "transition-all bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-[750px] overflow-y-auto h-[650px]"
        }`}
      >
        {/*Formulario de delivery */}
        <div
          className={`${selectionOption == "Delivery" ? "block" : "hidden"}`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">
            Por favor llene los campos para la entrega:
          </h2>
          <p className="mb-4 text-[17px]">Cliente: {client[0].nombre}</p>
          <Form
            name={name}
            setName={setName}
            addres={addres}
            setAddres={setAddres}
            setPhone={setPhone}
            phone={phone}
            numberCard={numberCard}
            setNumberCard={setNumberCard}
            errors={errors}
          />
        </div>
        <div
          className={`${selectionOption == "Restaurante" ? "block" : "hidden"}`}
        >
          <h2 className="text-[18px] text-orange-500 mb-4">
            Por favor, complete los campos para la entrega en el restaurante:
          </h2>
          <p>Usuario: {client[0].nombre}</p>
          <p>Telefono: {client[0].telefono}</p>
        </div>
        <div
          className={`${
            selectionOption == "Delivery"
              ? "hidden"
              : "block text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3"
          }`}
        >
          <PaymentOptions
            oneCheck={oneCheck}
            handleOneCheck={handleOneCheck}
            secondCheck={secondCheck}
            hanleSecondCheck={handleSecondCheck}
            thirdCheck={false}
            open={true}
          />
        </div>
        <div className={`${oneCheck ? "block" : "hidden"}`}>
          <span className="mt-4 mb-4">
            <label>Seleccione en que mesa se encuentra:</label>
            <button
              onClick={() => setShowTable(true)}
              className="bg-blue-500 pt-2 pb-2 pr-4 pl-4 ml-4 rounded-[10px] text-white"
            >
              Seleccionar
            </button>
            <div
              className={`${
                showTable
                  ? "fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75"
                  : "hidden"
              }`}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <p className="text-xl font-bold mb-4">
                  Selecciona en qué mesa usted se encuentra:
                </p>
                <MatrixTable
                  numberTable={numberTable}
                  setNumberTable={setNumberTable}
                  setShowTable={setShowTable}
                />
              </div>
            </div>
          </span>

          <p className={`${numberTable != null ? "block mt-4" : "hidden"}`}>
            Numero de mesa seleccionado: {numberTable}
          </p>
          <PaymentOptions
            oneCheck={thirdCheck}
            handleOneCheck={handleThirdCheck}
            secondCheck={fourthCheck}
            hanleSecondCheck={handleFourthCheck}
            thirdCheck={fourthCheck}
            open={false}
          />
          <div className={`${thirdCheck ? "block mb-4 mt-4" : "hidden"}`}>
            <label className="block mb-2">Codigo tarjeta credito:</label>
            <input
              type="text"
              name="numberCard"
              value={numberCard}
              onChange={handleInputChangeCard}
              placeholder="Ingresa el numero de tu tarjeta de credito"
              className="border border-orange-600 px-4 py-2 w-full rounded-md"
            />
            {errors.numberCard && (
              <span className="text-red-500">{errors.numberCard}</span>
            )}
          </div>
        </div>
        <div className={`${secondCheck ? "block overflow-hidden" : "hidden"}`}>
          <div>
            <div className="text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3">
              <p className="mb-3">
                ¿Qué tiempo estima para llegar al restaurante y recoger su
                pedido?
              </p>
              <label htmlFor="comboBox">Seleccione una opción:</label>
              <select
                id="comboBox"
                value={valueCombox}
                onChange={handleCombox}
                className="ml-4 text-black mt-1 mb-4 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccionar:</option>
                {comboOptions.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}min
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`${valueCombox != "" ? "block" : "hidden"}`}>
            <PaymentOptions
              oneCheck={thirdCheck}
              handleOneCheck={handleThirdCheck}
              secondCheck={fourthCheck}
              hanleSecondCheck={handleFourthCheck}
              thirdCheck={fourthCheck}
              open={false}
            />
          </div>
          <div
            className={`${
              valueCombox != "" && thirdCheck ? "block mb-4 mt-4" : "hidden"
            }`}
          >
            <label className="block mb-2">Codigo tarjeta credito:</label>
            <input
              type="text"
              name="numberCard"
              value={numberCard}
              onChange={handleInputChangeCard}
              placeholder="Ingresa el numero de tu tarjeta de credito"
              className="border border-orange-600 px-4 py-2 w-full rounded-md"
            />
            {errors.numberCard && (
              <span className="text-red-500">{errors.numberCard}</span>
            )}
          </div>
        </div>
        <ProductsTable products={products} totalPrice={totalPrice} />
        <p>Direccion del restaurante:</p>
        <div className="flex justify-center mb-6 mt-4">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30461.81505356121!2d-66.30604799999999!3d-17.3768704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1689888959806!5m2!1ses-419!2sbo"></iframe>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:justify-center">
          <button
            onClick={showBuySuccess}
            className={`block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md mb-2 md:mb-0 md:mr-16`}
          >
            Comprar
          </button>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
            onClick={() => setOpenModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>

      {deliveryBuy && (
        <PurchaseSuccesModal
          closeSucces={closeBuyDelivery}
          client={client}
          addres={addres}
          date={date}
          time={hour}
          totalPrice={totalPrice}
        />
      )}

      {restaurantBuy && (
        <PurchaseSuccesModal
          closeSucces={closeBuySuccess}
          client={client}
          date={date}
          time={hour}
          numberTable={numberTable}
          valueCombox={valueCombox}
          totalPrice={totalPrice}
          oneCheck={oneCheck}
          secondCheck={secondCheck}
          deliveryBuy={deliveryBuy}
          duration={duration}
        />
      )}

      {deliveryConfirmation && (
        <ConfirmationModal
          setConfirmation={setDeliveryConfirmation}
          handleSubmit={handleDeliverySubmit}
        />
      )}
      {restaurantConfirmation && (
        <ConfirmationModal
          setConfirmation={setRestaurantConfirmation}
          handleSubmit={handleRestaurantSubmit}
        />
      )}
    </header>
  );
};

export default DetailBuy;
