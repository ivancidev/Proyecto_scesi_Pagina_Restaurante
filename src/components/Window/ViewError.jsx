import React from 'react'

const ViewError = ({showError, content}) => {
  return (
    <div className={`fixed z-50 bottom-0 left-0 w-full bg-red-600 text-white p-4 lg:mb-0 mb-[60px] ${showError ? 'block' : 'hidden'}`}>
      <p className='text-center'>{content}</p>
    </div>
  )
}

export default ViewError