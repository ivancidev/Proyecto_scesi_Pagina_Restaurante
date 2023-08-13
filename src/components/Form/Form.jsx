import React from 'react'

const Form = (props) => {

    const {nombre, setNombre} = props
    const {direccion, setDireccion} = props
    const {telefono, setTelefono} = props
    const {tarjeta, setTarjeta} = props
    const {errores} = props

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


  return (
    <div>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChangeNombre}
            placeholder='Ingrese su nombre'
            className="border-2 border-orange-400 px-4 py-2 w-full rounded-md"
          />
          {errores.nombre && (
                <span className="text-red-500">{errores.nombre}</span>
              )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Dirección de entrega:</label>
          <input
            type="text"
            name="direccion"
            value={direccion}
            onChange={handleInputChangeDireccion}
            placeholder='Ingrese su direccion'
            className="border-2 border-orange-400 b px-4 py-2 w-full rounded-md"
          />
          {errores.direccion && (
                <span className="text-red-500">{errores.direccion}</span>
              )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={telefono}
            onChange={handleInputChangeTelefono}
            placeholder='Ingrese su telefono'
            className="border-2 border-orange-400 px-4 py-2 w-full rounded-md"
          />
          {errores.telefono && (
                <span className="text-red-500">{errores.telefono}</span>
              )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Codigo tarjeta credito:</label>
          <input
            type="text"
            name="tarjeta"
            value={tarjeta}
            onChange={handleInputChangeTarjeta}
            placeholder='Ingrese su codigo de tarejeta'
            className="border-2 border-orange-400 px-4 py-2 w-full rounded-md"
          />
          {errores.tarjeta && (
                <span className="text-red-500">{errores.tarjeta}</span>
              )}
        </div>
    </div>
  )
}

export default Form