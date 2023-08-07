import React from 'react'

const TablaDelivery = (props) => {
    const {historialDelivery} = props;
  return (
    <header>
        <h2 className='text-center text-[22px] font-semibold mb-4 mt-4 p1'>Compra por delivery</h2>
        <table>
              <thead>
                <tr className="text-left bg-orange-500 text-white">
                  <th className="px-4 py-2">Número de Orden</th>
                  <th className="px-4 py-2">Fecha Entrega</th>
                  <th className="px-4 py-2">Hora Envio</th>
                  <th className="px-4 py-2">Orden</th>
                  <th className="px-4 py-2">Direccion</th>
                  <th className="px-4 py-2">Total Precio</th>
                  <th className="px-4 py-2">Nombre Cliente</th>
                </tr>
              </thead>
              <tbody>
                {historialDelivery.map((compra) => (
                  <tr key={compra.idCompra} className="border-t bg-slate-200">
                    <td className="px-4 py-2">{compra.idCompra}</td>
                    <td className="px-4 py-2">{compra.fechaEntrega}</td>
                    <td className="px-4 py-2">{compra.horaEnvio}</td>
                    <td className="px-4 py-2">{compra.nombresPlatos}</td>
                    <td className="px-4 py-2">{compra.direccion}</td>
                    <td className="px-4 py-2">{compra.totalPrecio}</td>
                    <td className="px-4 py-2">{compra.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    </header>
  )
}

export default TablaDelivery