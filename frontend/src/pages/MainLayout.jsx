import React from 'react'

const MainLayout = ({children}) => {
  return (
    <div className='w-full h-screen flex flex-col'>
        {children}
    </div>
  )
}

export default MainLayout