import React from 'react'
import Dashboard from './Dashboard'
import DashBoardSmallInfoCard from '../components/DashBoardSmallInfoCard'
import SalesChart from '../components/SalesChart'

const SalesPage = () => {
  return (
    <div className="main-container flex-1 flex flex-col gap-4 p-10">

      <div className="upper-cards flex flex-col gap-4 md:grid lg:grid-cols-2 xl:grid-cols-4  w-full">
        <DashBoardSmallInfoCard text={"Total Users"} number={4} />
        <DashBoardSmallInfoCard text={"Total Products"} number={12} />
        <DashBoardSmallInfoCard text={"Total Orders"} number={6} />
        <DashBoardSmallInfoCard text={"Total Sales"} number={"₹ 602,452.2"} />


      </div>
      <div className="graph w-full  flex flex-col gap-2 flex-1 justify-center items-center">
          <SalesChart/>
      </div>

    </div>
  )
}

export default SalesPage