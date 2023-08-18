import React from 'react'

const Form = ({ name, setName, addres, setAddres, setPhone, phone, numberCard, setNumberCard, errors}) => {

    const handleInputChangeNombre = (e) => {
        const { value } = e.target;
        setName(value);
      };
    
      const handleInputChangeDireccion = (e) => {
        const { value } = e.target;
        setAddres(value);
      };
    
      const handleInputChangeTelefono = (e) => {
        const { value } = e.target;
        setPhone(value);
      };
    
      const handleInputChangeTarjeta = (e) => {
        const { value } = e.target;
        setNumberCard(value);
      };


  return (
    <div>
        <div className="mb-4">
          <label className="block mb-2">Nombre:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChangeNombre}
            placeholder='Ingrese su nombre'
            className="border-2 border-orange-400 px-4 py-2 w-full rounded-md"
          />
          {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Dirección de entrega:</label>
          <input
            type="text"
            name="addres"
            value={addres}
            onChange={handleInputChangeDireccion}
            placeholder='Ingrese su direccion'
            className="border-2 border-orange-400 b px-4 py-2 w-full rounded-md"
          />
          {errors.addres && (
                <span className="text-red-500">{errors.addres}</span>
              )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Telefono:</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleInputChangeTelefono}
            placeholder='Ingrese su telefono'
            className="border-2 border-orange-400 px-4 py-2 w-full rounded-md"
          />
          {errors.phone && (
                <span className="text-red-500">{errors.phone}</span>
              )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Codigo tarjeta credito:</label>
          <input
            type="text"
            name="numberCard"
            value={numberCard}
            onChange={handleInputChangeTarjeta}
            placeholder='Ingrese su codigo de tarjeta'
            className="border-2 border-orange-400 px-4 py-2 w-full rounded-md"
          />
          {errors.numberCard && (
                <span className="text-red-500">{errors.numberCard}</span>
              )}
        </div>
    </div>
  )
}

export default Form