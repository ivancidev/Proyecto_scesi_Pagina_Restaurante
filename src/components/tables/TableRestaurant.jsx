import React from 'react'

const TablaRestaurant = ({ recordRestaurant }) => {

  return (
    <header className='h-[250px] overflow-y-auto'>
        <table>
              <thead>
                <tr className="text-left bg-orange-500 text-white">
                  <th className="px-4 py-2">Número de Orden</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Hora</th>
                  <th className="px-4 py-2">Orden</th>
                  <th className="px-4 py-2">Numero Mesa</th>
                  <th className="px-4 py-2">Tiempo LLegada</th>
                  <th className="px-4 py-2">Total Precio</th>
                  <th className="px-4 py-2">Nombre Cliente</th>
                </tr>
              </thead>
              <tbody>
                    {recordRestaurant.map((compra) => (
                  <tr key={compra.idCompra} className="border-t bg-slate-200">
                    <td className="px-4 py-2">{compra.idCompra}</td>
                    <td className="px-4 py-2">{compra.fechaCompra}</td>
                    <td className="px-4 py-2">{compra.horaCompra}</td>
                    <td className="px-4 py-2">{compra.nombresOrden}</td>
                    <td className="px-4 py-2">{compra.numeroMesa}</td>
                    <td className="px-4 py-2">{compra.tiempoLlegada}</td>
                    <td className="px-4 py-2">{compra.totalPrecio}</td>
                    <td className="px-4 py-2">{compra.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    </header>
  )
}

export default TablaRestaurant