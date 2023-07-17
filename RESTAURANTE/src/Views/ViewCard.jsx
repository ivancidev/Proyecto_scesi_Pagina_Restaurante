import React from 'react'
import logo from '../assets/imagenes/logo.png'
export const ViewCard = ({plato}) => {
  return (
    <header className='bg-[url(./assets/imagenes/fondoCards.jpg)] w-full min-h-screen flex items-center justify-center bg-cover  bg-center'>
    
    <div className='bg-white p-8 rounded-[12px]'>
     <div className='flex justify-center gap-6'>
      <div className='w-[300px]'>
      <h1 className='p1 text-center text-[21px] text-orange-500 font-bold'>{plato.nombrePlato}</h1>
      <div className='mt-4'>
        <img src={plato.imagen} alt="no existe imagen" className='rounded-[10px] w-[300px]' />
      </div> 
        <p className='text-center text-orange-500 p1 text-[20px]'>{plato.precio}</p>
        <p className='text-center text-orange-500 p1'>{plato.disponibilidad}</p>
        <p className='mt-5'>{plato.descripcionPlato}</p>
      </div>
      <div className='w-[500px]'>
        <div className='flex justify-center p-4'>
          <img src={logo} alt="no disponible" className='w-[200px] rounded-[50%]' />
        </div>
        <p>{plato.descripcionServicio}</p>
      </div>
      </div>
      <div className='flex justify-center items-center p-3'>
        <button className='mt-3 bg-orange-500 pr-12 pl-12 pt-3 pb-3 rounded-[12px] text-white hover:bg-orange-600'>Ir atras</button>
      </div>
    </div>

    </header>
  )
}

export default ViewCard
