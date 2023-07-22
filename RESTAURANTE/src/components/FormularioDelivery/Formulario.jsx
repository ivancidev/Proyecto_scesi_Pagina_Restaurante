import React from 'react'

const Formulario = (props) => {

    const {nombre, setNombre} = props
    const {direccion, setDireccion} = props
    const {telefono, setTelefono} = props
    const {tarjeta, setTarjeta} = props

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
    </div>
  )
}

export default Formulario