import React, { useEffect } from "react";
import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import axios from "axios";

const DetalleCompra = (props) => {
  const { setAbrirModal } = props;
  const { propCliente } = props;
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

  const concatenarNombresPlatos = () => {
    const nombres = productos.map((plato) => plato.nombrePlato).join(", ");
    setNombresPlatos(nombres);
  };

  const handleInputChangeNombre = (e) => {
    const { value } = e.target;
    setNombre(value);
  };

  const handleInputChangeDireccion = (e) => {
    const { value } = e.target;
    setDireccion(value);
  };

  const handleInputChangeTelefono = (e) => {
    const { value } = e.target;
    setTelefono(value);
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
    setVentanaConfirmacion(true);
    setFechaEntrega(fechaEntrega);
    setHoraEnvio(horaEnvio);
  };
  const cerrarCompraExistosa = () => {
    setCompraExistosa(false);
    setAbrirModal(false);
    setMostrarBotones(false);
  };
  const abrirConfirmacion = () => {
    setVentanaConfirmacion(false);
    setCompraExistosa(true);
  };

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div
        className={`${
          compraExistosa
            ? "hidden"
            : "bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 overflow-y-auto h-[600px]"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">
          ¿Desea confirmar la compra?
        </h2>
        <p>Cliente: {propCliente.nombre}</p>
        <p>Productos Seleccionados:</p>
        <div className="overflow-x-auto overflow-y-auto h-56">
          <table className="w-full mt-2 mb-3">
            <thead>
              <tr>
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
                <td className="text-left text-[17px]">{totalPrecio}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-3">Llena los campos para la entrega:</p>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChangeNombre}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Dirección de entrega:</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={handleInputChangeDireccion}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={telefono}
            onChange={handleInputChangeTelefono}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Codigo tarjeta credito:</label>
          <input
            type="text"
            name="tarjeta"
            value={tarjeta}
            onChange={handleInputChangeTarjeta}
            className="border px-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center md:flex-row md:justify-center">
          <button
            onClick={mostrarCompraExitosa}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md mb-2 md:mb-0 md:mr-2"
          >
            Confirmar
          </button>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md"
            onClick={() => setAbrirModal(false)}
          >
            Cancelar
          </button>
        </div>
      </div>
      {compraExistosa && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-end">
              <BsXCircleFill
                className="text-3xl text-gray-500 cursor-pointer"
                onClick={cerrarCompraExistosa}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4">¡Compra Exitosa!</h2>
            <p>Dirección de entrega: {direccion}</p>
            <p>Fecha de entrega: {fechaEntrega}</p>
            <p>Hora de envío: {horaEnvio}</p>
          </div>
        </div>
      )}
      {ventanaConfirmacion && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-end">
              <button
                className="text-blue-500 font-semibold"
                onClick={handleSubmit}
              >
                Confirmar
              </button>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="text-red-500 font-semibold"
                onClick={handleSubmit}
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
