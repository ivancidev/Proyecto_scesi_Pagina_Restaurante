import React from 'react'

const TableDelivery = ({ recordDelivery }) => {
  return (
    <header className='h-[400px] overflow-y-auto'>
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
                {recordDelivery.map((compra) => (
                  <tr key={compra.idCompra} className="border-t bg-slate-200">
                    <td className="px-4 py-2">{compra.idCompra}</td>
                    <td className="px-4 py-2">{compra.fechaEntrega}</td>
                    <td className="px-4 py-2">{compra.horaEnvio}</td>
                    <td className="px-4 py-2">{compra.nombresOrden}</td>
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

export default TableDelivery