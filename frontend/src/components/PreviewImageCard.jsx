import React from 'react'

const PreviewImageCard = ({imageUrl}) => {
  return (
    <div className='w-full h-40 rounded-xl bg-gray-300' >
        <img className='w-full h-full object-contain' src={imageUrl} alt="" />
    </div>
  )
}

export default PreviewImageCard