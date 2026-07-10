import React from 'react'

const PreviewImageCard = ({imageUrl,onClick}) => {
  return (
    <div className='w-full h-40 rounded-xl bg-gray-300 relative ' >
        <img className='w-full h-full object-contain' src={imageUrl} alt="" />
        <button type='button' onClick={onClick} className="absolute top-0 right-0 border w-8 h-8 flex justify-center items-center p-2 bg-neutral-800 rounded-full cursor-pointer hover:brightness-115">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
        </button>
    </div>
  )
}

export default PreviewImageCard