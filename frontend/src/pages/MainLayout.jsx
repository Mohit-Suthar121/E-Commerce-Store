import React from 'react'

import { ToastContainer, toast,Bounce } from 'react-toastify';

const MainLayout = ({children}) => {
  return (
    <div className='w-full h-screen flex flex-col'>
        {children}
         <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
    </div>
  )
}

export default MainLayout