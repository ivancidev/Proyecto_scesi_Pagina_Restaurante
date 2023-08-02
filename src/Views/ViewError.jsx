import React from 'react'

const ViewError = ({mostrar, contenido}) => {
  return (
    <div className={`fixed z-50 bottom-0 left-0 w-full bg-red-600 text-white p-4 lg:mb-0 mb-[60px] ${mostrar ? 'block' : 'hidden'}`}>
      <p className='text-center'>{contenido}</p>
    </div>
  )
}

export default ViewError