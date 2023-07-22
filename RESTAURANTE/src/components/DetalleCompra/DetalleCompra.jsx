import React, { useEffect } from "react";
import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import axios from "axios";
import Formulario from "../FormularioDelivery/Formulario";
import Mesas from "../MatrizMesas/Mesas";

const DetalleCompra = (props) => {
  const { setAbrirModal } = props;
  const { cliente } = props;
  const { productos } = props;
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const { totalPrecio } = props;
  const [compraExistosa, setCompraExistosa] = useState(false);
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [horaEnvio, setHoraEnvio] = useState("");
  const { setMostrarBotones } = props;
  const [nombresPlatos, setNombresPlatos] = useState("");
  const [ventanaConfirmacion, setVentanaConfirmacion] = useState(false);
  const { seleccionOpcion } = props;
  const [primerCheck, setPrimerCheck] = useState(false);
  const [segundoCheck, setSegundoCheck] = useState(false);
  const [numeroMesa, setNumeroMesa] = useState(null)
  const [mostrarMesa, setMostrarMesa] = useState(false)
  const [tercerCheck, setTercerCheck] = useState(false);
  const [cuartoCheck, setCuartoCheck] = useState(false);
  const opcionesCombox = [10, 15, 30, 45, 60, 120]
  const [valorCombox, setValorCombox] = useState('')
  const [ventanaConfirmacionResturante, setVentanaConfirmacionResturante] = useState(false)
  const [compraExistosaResturante, setCompraExistosaResturante] = useState(false)
  const [tiempoEntrega, setTiempoEntrega] = useState(0)

  const concatenarNombresPlatos = () => {
    const nombres = productos.map((plato) => plato.nombrePlato).join(", ");
    setNombresPlatos(nombres);
  };

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

  const handleSubmit = () => {
    const clienteDetalle = {
      nombre,
      direccion,
      telefono,
      tarjeta,
      nombresPlatos,
      totalPrecio,
      fechaEntrega,
      horaEnvio,
    };
    axios
      .post("http://localhost:4000/detalleCompra", clienteDetalle)
      .then(({ data }) => {
        setVentanaConfirmacion(false);
        setCompraExistosa(true);
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  const handleSubmitRestaurante = () => {
    const clienteDetalle = {
      numeroMesa,
      tarjeta,
      nombresPlatos,
      valorCombox,
      fechaEntrega,
      horaEnvio,
      telefono,
      nombre,
      totalPrecio,
    };
    axios
      .post("http://localhost:4000/detalleCompraRestaurante", clienteDetalle)
      .then(({ data }) => {
        setVentanaConfirmacionResturante(false);
        tiempoEntregar()
        setCompraExistosaResturante(true);
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  

  const mostrarCompraExitosa = () => {
    // Obtenemos la fecha y hora actual
    const fechaActual = new Date();
    const fechaEntrega = fechaActual.toLocaleDateString("es-ES");
    const horaEnvio = fechaActual.toLocaleTimeString("es-ES", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    concatenarNombresPlatos();
    console.log({ nombresPlatos });

    // Actualizamos el estado para mostrar la ventana de compra exitosa y la fecha y hora
    if(seleccionOpcion == "Restaurante"){
      setVentanaConfirmacionResturante(true);
      setNombre(cliente.nombre)
      setTelefono(cliente.telefono)
    }else{
      setVentanaConfirmacion(true);
    }
    
    setFechaEntrega(fechaEntrega);
    setHoraEnvio(horaEnvio);
  };
  const cerrarCompraExistosa = () => {
    setCompraExistosa(false);
    setAbrirModal(false);
    setMostrarBotones(false);
    window.location.reload(); //recarga la pagina
  };

  const cerrarCompraExistosaRestaurante = () => {
    setCompraExistosaResturante(false);
    setAbrirModal(false);
    setMostrarBotones(false);
    window.location.reload(); //recarga la pagina
  };

  const tiempoEntregar = () => {
    var tiempoDemoraCliente = parseInt(valorCombox)
    setTiempoEntrega(tiempoDemoraCliente+(tiempoDemoraCliente/2))
  }
  

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div
        className={`${
          compraExistosa
            ? "hidden transition-all"
            : "transition-all bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-[750px] overflow-y-auto h-[650px]"
        }`}
      >
        {/*Formulario de delivery */}
        <div
          className={`${seleccionOpcion == "Delivery" ? "block" : "hidden"}`}
        >
          <h2 className="text-2xl font-semibold mb-4 text-orange-500">
            Por favor llene los campos para la entrega:
          </h2>
          <p className="mb-4 text-[17px]">Cliente: {cliente.nombre}</p>
          <Formulario
            nombre={nombre}
            setNombre={setNombre}
            direccion={direccion}
            setDireccion={setDireccion}
            setTelefono={setTelefono}
            telefono={telefono}
            tarjeta={tarjeta}
            setTarjeta={setTarjeta}
          />
        </div>
        <div
          className={`${seleccionOpcion == "Restaurante" ? "block" : "hidden"}`}
        >
          <h2 className="text-[18px] text-orange-500 mb-4">
          Por favor, complete los campos para la entrega en el restaurante:
          </h2>
          <p>Usuario: {cliente.nombre}</p>
          <p>Telefono: {cliente.telefono}</p>
        </div>
        <div className={`${seleccionOpcion == "Delivery"? "hidden":"block text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3"}`}>
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
        <div className={`${primerCheck? "block":"hidden"}`}>
          <span className="mt-3 mb-3">
            <label>Seleccione en que mesa se encuentra:</label>
            <button onClick={()=> setMostrarMesa(true)} className="bg-blue-500 pt-2 pb-2 pr-4 pl-4 ml-4 rounded-[10px] text-white">Seleccionar</button>
            <div
        className={`${
          mostrarMesa
            ? 'fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75'
            : 'hidden'
        }`}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <p className="text-xl font-bold mb-4">
            Selecciona en qué asientos usted se encuentra:
          </p>
          <Mesas
            numeroMesa={numeroMesa}
            setNumeroMesa={setNumeroMesa}
            setMostrarMesa={setMostrarMesa}
          />
        </div>
      </div>
          </span>
          <p className={`${numeroMesa != null ? "blocl mt-4":"hidden"}`}>Numero de mesa seleccionado: {numeroMesa}</p>
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
              <span>
              ¿Desea hacer el pago con tarjeta de crédito?
              </span>
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
        <div className={`${tercerCheck? "block mb-4 mt-4":"hidden"}`}>
        <label className="block mb-2">Codigo tarjeta credito:</label>
          <input
            type="text"
            name="tarjeta"
            value={tarjeta}
            onChange={handleInputChangeTarjeta}
            className="border border-orange-600 px-4 py-2 w-full rounded-md"
          />
        </div>
        <p className={`${cuartoCheck? "block":"hidden"} mt4 mb-4`}>"El pago lo realizara en caja"</p>
          {/* <p className="mt-2 mb-2">"Por favor, tenga en cuenta que el tiempo estimado para recibir su pedido es de 10 a 15 minutos."</p> */}
        </div>
        <div className={`${segundoCheck? "block overflow-hidden":"hidden"}`}>
          <div>
          <div className="text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3">
          <p className="mb-3">¿Qué tiempo estima para llegar al restaurante y recoger su pedido?</p>
          <label htmlFor="comboBox">Seleccione una opción:</label>
      <select
        id="comboBox"
        value={valorCombox}
        onChange={handleCombox}
        className="ml-4 text-black mt-1 mb-4 p-2 border border-gray-300 rounded-md"
      >
        <option value="">Seleccione...</option>
        {opcionesCombox.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}min
          </option>
        ))}
      </select>
        </div>
          </div>
          <div className={`${valorCombox != ''? "block":"hidden"} text-white container mx-auto px-4 py-5 bg-blue-500 rounded-[12px] mt-3 mb-3`}>
          <p className="mb-3">Elige una de las opciones:</p>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={tercerCheck}
                onChange={handleTercerCheck}
                className="form-checkbox h-5 w-5 text-blue-500"
              />
              <span>
              ¿Desea hacer el pago con tarjeta de crédito?
              </span>
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
        <p className={`${cuartoCheck? "block":"hidden"} mt4 mb-4`}>"El pago lo realizara en caja"</p>
          <div className={`${valorCombox != '' && tercerCheck? "block mb-4 mt-4":"hidden"}`}>
        <label className="block mb-2">Codigo tarjeta credito:</label>
          <input
            type="text"
            name="tarjeta"
            value={tarjeta}
            onChange={handleInputChangeTarjeta}
            className="border border-orange-600 px-4 py-2 w-full rounded-md"
          />
        </div>
          
        </div>
        <h2>Productos Seleccionados:</h2>
        <div className="overflow-x-auto overflow-y-auto h-56">
          <table className="w-full mt-2 mb-3">
            <thead>
              <tr className="text-orange-500">
                <th className="px-4 py-2 text-left">Nombre del Producto</th>
                <th className="px-4 py-2 text-center">Cantidad</th>
                <th className="px-4 py-2 text-right">Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-left">
                    {producto.nombrePlato}
                  </td>
                  <td className="border px-4 py-2 text-center">
                    {producto.cantidad}
                  </td>
                  <td className="border px-4 py-2 text-right">
                    {producto.precioTotal}Bs
                  </td>
                </tr>
              ))}
              <tr>
                <td className="text-[17px] px-4">Total Pagar:</td>
                <td className="text-left text-[17px]">{totalPrecio}Bs</td>
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
            className={` ${seleccionOpcion == 'Delivery'? " block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md mb-2 md:mb-0 md:mr-16":"hidden"} `}
          >
            Comprar
          </button>
          <button className={`${seleccionOpcion == 'Restaurante'? "block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md mb-2 md:mb-0 md:mr-16":"hidden"}`} onClick={mostrarCompraExitosa}>
              Comprar
          </button>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md"
            onClick={() => setAbrirModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
      {compraExistosa && (
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
            <p>Usuario: {cliente.nombre}</p>
            <p>Dirección de entrega: {direccion}</p>
            <p>Fecha de entrega: {fechaEntrega}</p>
            <p>Hora de envío: {horaEnvio}</p>
            <p>Total Precio: {totalPrecio}</p>
            <p>Nuestro Email: elBocadoPerfecto@gmail.com</p>
            <p>Nuestro telefono: 71779843 </p>
          </div>
        </div>
      )}
      {compraExistosaResturante && (
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
            <p>Usuario: {cliente.nombre}</p>
            <p>Fecha y hora compra: {fechaEntrega}: {horaEnvio}</p>
            <p className={`${numeroMesa != null? "block":"hidden"}`}>Numero de mesa: {numeroMesa}</p>
            <p className={`${valorCombox != ''? "block":"hidden"}`}></p>
            <p>Total Precio: {totalPrecio}</p>
            <p>Nuestro Email: elBocadoPerfecto@gmail.com</p>
            <p>Nuestro telefono: 71779843 </p>
            <p className={`${primerCheck? "block font-bold mt-2 mb-2":"hidden"}`}>Por favor, tenga en cuenta que el tiempo estimado para recibir su pedido es de 10 a 15 minutos.</p>
            <p className={`${segundoCheck? "block font-bold mt-2 mb-2":"hidden"}`}>Por favor, tenga en cuenta que el tiempo estimado para recibir su pedido es {tiempoEntrega} minutos, debido a que usted demorará {valorCombox} minutos.</p>
          </div>
        </div>
      )}

      {ventanaConfirmacion && (
        <div className="transition-all fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center items-center">
            <p className="mb-4">¿Desea confirmar la compra?</p>
            <div className="flex">
              <button
                className="text-white py-2 px-5 rounded-[8px] bg-blue-500 font-semibold mr-7"
                onClick={handleSubmit}
              >
                Confirmar
              </button>
              <button
                className="text-white py-2 px-5 rounded-[8px] bg-red-500 font-semibold"
                onClick={() => setVentanaConfirmacion(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {ventanaConfirmacionResturante && (
        <div className="transition-all fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col justify-center items-center">
            <p className="mb-4">¿Desea confirmar la compra?</p>
            <div className="flex">
              <button
                className="text-white py-2 px-5 rounded-[8px] bg-blue-500 font-semibold mr-7"
                onClick={handleSubmitRestaurante}
              >
                Confirmar
              </button>
              <button
                className="text-white py-2 px-5 rounded-[8px] bg-red-500 font-semibold"
                onClick={() => setVentanaConfirmacionResturante(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DetalleCompra;
