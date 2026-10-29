import React from 'react'
import Dashboard from './Dashboard'
import DashBoardSmallInfoCard from '../components/DashBoardSmallInfoCard'
import SalesChart from '../components/SalesChart'
import { useAdminUsers } from '../hooks/admin/useAdminUsers'
import { useCart } from '../hooks/useCart'
import { useAdminStats } from '../hooks/admin/useAdminStats'
import { useProductStats } from '../hooks/useProductStats'

const SalesPage = () => {
  const {productCount} = useProductStats();
  const {userCount} = useAdminStats();

  return (
    <div className="main-container flex-1 flex flex-col gap-4 p-10">

      <div className="upper-cards flex flex-col gap-4 md:grid lg:grid-cols-2 xl:grid-cols-4  w-full">
        <DashBoardSmallInfoCard text={"Total Users"} number={userCount} />
        <DashBoardSmallInfoCard text={"Total Products"} number={productCount} />
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