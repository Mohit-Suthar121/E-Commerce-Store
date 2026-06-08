import React from 'react'
import Navbar from '../components/Navbar'
import DashBoardSideBar from '../components/DashBoardSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  

    return (
        <div className='w-full flex flex-1 flex-col min-h-0 '>
            <Navbar />

            <div className="main-content flex flex-1 min-h-0">
                <DashBoardSideBar/>
                <Outlet/>
            </div>
            
        </div>
    )
}

export default Dashboard