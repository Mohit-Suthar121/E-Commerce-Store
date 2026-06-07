import React from 'react'
import Navbar from '../components/Navbar'
import DashBoardSideBar from '../components/DashBoardSideBar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  

    return (
        <div className='w-full min-h-screen flex flex-col '>
            <Navbar />

            <div className="main-content flex flex-1">
                <DashBoardSideBar/>
                <Outlet/>

            </div>
        </div>
    )
}

export default Dashboard