import React from "react";
import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import Form from "../Form/Form";
import Tables from "../MatrixTables/Tables";
import usePost from "../hooks/usePost";
import { concatenarNombresPlatos, validarForm, validarTarjeta } from "../helpers/detailHelper";
import ConfirmationModal from "../Window/ConfirmationModal";

const DetailBuy = ({ setOpenModal, client, totalPrice, setShowButtons, selectionOption }) => {

  const products = JSON.parse(sessionStorage.getItem("add_products"));
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [horaEnvio, setHoraEnvio] = useState("");
  const [nombresOrden, setNombresOrden] = useState("");
  const [primerCheck, setPrimerCheck] = useState(false);
  const [segundoCheck, setSegundoCheck] = useState(false);
  const [numeroMesa, setNumeroMesa] = useState(null);
  const [mostrarMesa, setMostrarMesa] = useState(false);
  const [tercerCheck, setTercerCheck] = useState(false);
  const [cuartoCheck, setCuartoCheck] = useState(false);
  const opcionesCombox = [10, 15, 30, 45, 60, 120];
  const [valorCombox, setValorCombox] = useState("");
  const [tiempoEntrega, setTiempoEntrega] = useState(0);
  const [errores, setErrores] = useState({});
  const clientDelivery = {
    nombre,
    direccion,
    telefono,
    tarjeta,
    nombresOrden,
    totalPrice,
    fechaEntrega,
    horaEnvio,
  };
  const clientRestaurant = {
    numeroMesa,
    tarjeta,
    nombresOrden,
    valorCombox,
    fechaEntrega,
    horaEnvio,
    telefono,
    nombre,
    totalPrice,
  };

  const {
    confirmation: deliveryConfirmation,
    setConfirmation: setDeliveryConfirmation,
    buy: deliveryBuy,
    setBuy: setDeliveryBuy,
    handleSubmit: handleDelivery,
  } = usePost("http://localhost:4000/detailBuyDelivery", clientDelivery);

  const {
    confirmation: restaurantConfirmation,
    setConfirmation: setRestaurantConfirmation,
    buy: restaurantBuy,
    setBuy: setRestaurantBuy,
    handleSubmit: handleRestaurant,
  } = usePost(
    "http://localhost:4000/detailPurchaseRestaurant",
    clientRestaurant
  );

  const handleDeliverySubmit = () =>{
    handleDelivery()
    setDeliveryConfirmation(false);
    setDeliveryBuy(true);
  }

  const handleRestaurantSubmit = () =>{
    handleRestaurant()
    setRestaurantConfirmation(false);
    tiempoEntregar();
    setRestaurantBuy(true);
  }

  const handlePrimerCheck = (e) => {
    setPrimerCheck(e.target.checked);
    setSegundoCheck(false);
  };

  const handleSegundoCheck = (e) => {
    setSegundoCheck(e.target.checked);
    setPrimerCheck(false);
  };

  const handleTercerCheck = (e) => {
    setTercerCheck(e.target.checked);
    setCuartoCheck(false);
  };

  const handleCuartoCheck = (e) => {
    setCuartoCheck(e.target.checked);
    setTercerCheck(false);
  };

  const handleCombox = (event) => {
    setValorCombox(event.target.value);
  };

  const handleInputChangeTarjeta = (e) => {
    const { value } = e.target;
    setTarjeta(value);
  };

  const mostrarCompraExitosa = () => {
    let nuevosErrores = {};

    if (selectionOption == "Restaurante") {
      nuevosErrores = validarTarjeta(cuartoCheck, tarjeta);
      setErrores(nuevosErrores);
    } else {
      nuevosErrores = validarForm(nombre, direccion, telefono, tarjeta );
      setErrores(nuevosErrores);
    }

    if (Object.keys(nuevosErrores).length === 0) {
      // Obtenemos la fecha y hora actual
      const fechaActual = new Date();
      const fechaEntrega = fechaActual.toLocaleDateString("es-ES");
      const horaEnvio = fechaActual.toLocaleTimeString("es-ES", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      concatenarNombresPlatos(products, setNombresOrden);
      // Actualizamos el estado para mostrar la ventana de compra exitosa y la fecha y hora
      if (selectionOption == "Restaurante") {
        setRestaurantConfirmation(true);
        setNombre(client[0].nombre);
        setTelefono(client[0].telefono);
      } else {
        setDeliveryConfirmation(true);
      }

      setFechaEntrega(fechaEntrega);
      setHoraEnvio(horaEnvio);
    }
  };

  const cerrarCompraExistosa = () => {
    setDeliveryBuy(false);
    setOpenModal(false);
    setShowButtons(false);
    sessionStorage.removeItem("add_products");
    sessionStorage.setItem("add_products", null);
    window.location.reload(); 
  };

  const cerrarCompraExistosaRestaurante = () => {
    setRestaurantBuy(false);
    setOpenModal(false);
    setShowButtons(false);
    sessionStorage.removeItem("add_products");
    sessionStorage.setItem("add_products", null);
    window.location.reload(); 
  };

  const tiempoEntregar = () => {
    var tiempoDemoraClient = parseInt(valorCombox);
    setTiempoEntrega(parseInt(tiempoDemoraClient + tiempoDemoraClient / 2));
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
            nombre={nombre}
            setNombre={setNombre}
            direccion={direccion}
            setDireccion={setDireccion}
            setTelefono={setTelefono}
            telefono={telefono}
            tarjeta={tarjeta}
            setTarjeta={setTarjeta}
            errores={errores}
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
          <p className="mb-3">Elige una de las opciones</p>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={primerCheck}
                onChange={handlePrimerCheck}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>
                ¿Se encuentra en nuestro restaurante y desea comer aquí?
              </span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={segundoCheck}
                onChange={handleSegundoCheck}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>¿Va a recoger su pedido solamente?</span>
            </label>
          </div>
        </div>
        <div className={`${primerCheck ? "block" : "hidden"}`}>
          <span className="mt-4 mb-4">
            <label>Seleccione en que mesa se encuentra:</label>
            <button
              onClick={() => setMostrarMesa(true)}
              className="bg-blue-500 pt-2 pb-2 pr-4 pl-4 ml-4 rounded-[10px] text-white"
            >
              Seleccionar
            </button>
            <div
              className={`${
                mostrarMesa
                  ? "fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75"
                  : "hidden"
              }`}
            >
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <p className="text-xl font-bold mb-4">
                  Selecciona en qué mesa usted se encuentra:
                </p>
                <Tables
                  numeroMesa={numeroMesa}
                  setNumeroMesa={setNumeroMesa}
                  setMostrarMesa={setMostrarMesa}
                />
              </div>
            </div>
          </span>

          <p className={`${numeroMesa != null ? "block mt-4" : "hidden"}`}>
            Numero de mesa seleccionado: {numeroMesa}
          </p>
          <div className="text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3">
            <p className="mb-3">Elige una de las opciones:</p>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={tercerCheck}
                  onChange={handleTercerCheck}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span>¿Desea hacer el pago con tarjeta de crédito?</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={cuartoCheck}
                  onChange={handleCuartoCheck}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span>¿Desea hacer el pago en caja?</span>
              </label>
            </div>
          </div>
          <div className={`${tercerCheck ? "block mb-4 mt-4" : "hidden"}`}>
            <label className="block mb-2">Codigo tarjeta credito:</label>
            <input
              type="text"
              name="tarjeta"
              value={tarjeta}
              onChange={handleInputChangeTarjeta}
              placeholder="Ingresa el numero de tu tarjeta de credito"
              className="border border-orange-600 px-4 py-2 w-full rounded-md"
            />
            {errores.tarjeta && (
              <span className="text-red-500">{errores.tarjeta}</span>
            )}
          </div>
          <p className={`${cuartoCheck ? "block" : "hidden"} mt4 mb-4`}>
            "El pago lo realizara en caja"
          </p>
        </div>
        <div className={`${segundoCheck ? "block overflow-hidden" : "hidden"}`}>
          <div>
            <div className="text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3">
              <p className="mb-3">
                ¿Qué tiempo estima para llegar al restaurante y recoger su
                pedido?
              </p>
              <label htmlFor="comboBox">Seleccione una opción:</label>
              <select
                id="comboBox"
                value={valorCombox}
                onChange={handleCombox}
                className="ml-4 text-black mt-1 mb-4 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Seleccionar:</option>
                {opcionesCombox.map((opcion, index) => (
                  <option key={index} value={opcion}>
                    {opcion}min
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div
            className={`${
              valorCombox != "" ? "block" : "hidden"
            } text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3`}
          >
            <p className="mb-3">Elige una de las opciones:</p>
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={tercerCheck}
                  onChange={handleTercerCheck}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span>¿Desea hacer el pago con tarjeta de crédito?</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={cuartoCheck}
                  onChange={handleCuartoCheck}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
                <span>¿Desea hacer el pago en caja?</span>
              </label>
            </div>
          </div>
          <p className={`${cuartoCheck ? "block" : "hidden"} mt4 mb-4`}>
            "El pago lo realizara en caja"
          </p>
          <div
            className={`${
              valorCombox != "" && tercerCheck ? "block mb-4 mt-4" : "hidden"
            }`}
          >
            <label className="block mb-2">Codigo tarjeta credito:</label>
            <input
              type="text"
              name="tarjeta"
              value={tarjeta}
              onChange={handleInputChangeTarjeta}
              placeholder="Ingresa el numero de tu tarjeta de credito"
              className="border border-orange-600 px-4 py-2 w-full rounded-md"
            />
            {errores.tarjeta && (
              <span className="text-red-500">{errores.tarjeta}</span>
            )}
          </div>
        </div>
        <h2>Productos Seleccionados:</h2>
        <div className="overflow-x-auto overflow-y-auto h-56">
          <table className="w-full mt-2 mb-3 ">
            <thead>
              <tr className="text-orange-500 ">
                <th className="px-4 py-2 text-left border-orange-500 border-2">
                  Nombre del Producto
                </th>
                <th className="px-4 py-2 text-center border-orange-500 border-2">
                  Cantidad
                </th>
                <th className="px-4 py-2 text-right border-orange-500 border-2">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0
                ? products.map((producto, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 text-left border-orange-500 border-2">
                        {producto.nombreMenu}
                      </td>
                      <td className="border-orange-500 border-2 px-4 py-2 text-center">
                        {producto.cantidad}
                      </td>
                      <td className="border-orange-500 border-2 px-4 py-2 text-right">
                        {producto.precioTotal}Bs
                      </td>
                    </tr>
                  ))
                : ""}

              <tr>
                <td className="text-[17px] px-4 font-semibold border-orange-500 border-2">
                  Total Pagar:
                </td>
                <td className="text-left text-[17px] font-semibold border-orange-500 border-2"></td>
                <td className="text-right px-4 py-2 text-[17px] font-semibold border-orange-500 border-2">
                  {totalPrice}Bs
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Direccion del restaurante:</p>
        <div className="flex justify-center mb-6 mt-4">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30461.81505356121!2d-66.30604799999999!3d-17.3768704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2sbo!4v1689888959806!5m2!1ses-419!2sbo"></iframe>
        </div>
        <div className="flex flex-col justify-center md:flex-row md:justify-center">
          <button
            onClick={mostrarCompraExitosa}
            className={` ${
              selectionOption == "Delivery"
                ? " block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md mb-2 md:mb-0 md:mr-16"
                : "hidden"
            } `}
          >
            Comprar
          </button>
          <button
            className={`${
              selectionOption == "Restaurante"
                ? "block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md mb-2 md:mb-0 md:mr-16"
                : "hidden"
            }`}
            onClick={mostrarCompraExitosa}
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
        <div className="transition-all fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-end">
              <BsXCircleFill
                className="text-3xl text-orange-500 cursor-pointer"
                onClick={cerrarCompraExistosa}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">
              ¡Compra Exitosa!
            </h2>
            <p>Usuario: {client[0].nombre}</p>
            <p>Dirección de entrega: {direccion}</p>
            <p>Fecha de entrega: {fechaEntrega}</p>
            <p>Hora de envío: {horaEnvio}</p>
            <p>Total Precio: {totalPrice}</p>
            <p>Nuestro Email: elBocadoPerfecto@gmail.com</p>
            <p>Nuestro telefono: 71779843 </p>
          </div>
        </div>
      )}
      {restaurantBuy && (
        <div className="transition-all fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-end">
              <BsXCircleFill
                className="text-3xl text-orange-500 cursor-pointer"
                onClick={cerrarCompraExistosaRestaurante}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4 text-orange-500">
              ¡Compra Exitosa!
            </h2>
            <p>Usuario: {client[0].nombre}</p>
            <p>
              Fecha y hora compra: {fechaEntrega}: {horaEnvio}
            </p>
            <p className={`${numeroMesa != null ? "block" : "hidden"}`}>
              Numero de mesa: {numeroMesa}
            </p>
            <p className={`${valorCombox != "" ? "block" : "hidden"}`}></p>
            <p>Total Precio: {totalPrice}</p>
            <p>Nuestro Email: elBocadoPerfecto@gmail.com</p>
            <p>Nuestro telefono: 71779843 </p>
            <p
              className={`${
                primerCheck ? "block font-bold mt-2 mb-2" : "hidden"
              }`}
            >
              Por favor, tenga en cuenta que el tiempo estimado para recibir su
              pedido es de 10 a 15 minutos.
            </p>
            <p
              className={`${
                segundoCheck ? "block font-bold mt-2 mb-2" : "hidden"
              }`}
            >
              Por favor, tenga en cuenta que el tiempo estimado para recibir su
              pedido es {tiempoEntrega} minutos, debido a que usted demorará{" "}
              {valorCombox} minutos.
            </p>
          </div>
        </div>
      )}

      {deliveryConfirmation && (
        <ConfirmationModal setConfirmation={setDeliveryConfirmation} handleSubmit={handleDeliverySubmit}/>
      )}
      {restaurantConfirmation && (
        <ConfirmationModal setConfirmation={setRestaurantConfirmation} handleSubmit={handleRestaurantSubmit}/>
      )}
    </header>
  );
};

export default DetailBuy;
