import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SideBarButtons from './SideBarButtons'
import DashboardIcon from '../icons/DashboardIcon'
import AddProductIcon from '../icons/AddProductIcon';
import UsersIcon from '../icons/UsersIcon';
import OrdersIcon from '../icons/OrdersIcon';
import ProductsIcon from '../icons/ProductsIcon'
import DashboardIconFilled from '../icons/DashboardIconFilled';
import AddProductIconFilled from '../icons/AddProductIconFilled';
import ProductsIconFilled from '../icons/ProductsIconFilled';
import UsersIconFilled from '../icons/UsersIconFilled';
import OrdersIconFilled from '../icons/OrdersIconFilled';


const DashboardHamburgerContent = ({ setShowMenu }) => {
    const [activeButton, setActiveButton] = useState("");
    const [sideBarContent, setSideBarContent] = useState([

        {
            text: "Dashboard",
            componentIcon: DashboardIcon,
            componentIconFilled: DashboardIconFilled,
            path: "sales"
        },
        {
            text: "Add Product",
            componentIcon: AddProductIcon,
            componentIconFilled: AddProductIconFilled,
            path: "add-product"
        },
        {
            text: "Products",
            componentIcon: ProductsIcon,
            componentIconFilled: ProductsIconFilled,
            path: "products"
        },
        {
            text: "Users",
            componentIcon: UsersIcon,
            componentIconFilled: UsersIconFilled,
            path: "users"
        },
        {
            text: "Orders",
            componentIcon: OrdersIcon,
            componentIconFilled: OrdersIconFilled,
            path: "orders"
        },
    ]);

    return (
        <div className="hamburger-content border-t border-neutral-800 flex-1 w-full p-4 flex flex-col gap-2">
            {sideBarContent.map((item,index) => (
                <NavLink key={index} onClick={() => { setShowMenu(false) }} to={item.path}>
                    {({ isActive }) => {
                        const Icon = isActive ? item.componentIconFilled : item.componentIcon;
                        return <SideBarButtons componentIcon={<Icon currentColor={"currentColor"} className={"w-6 h-6"} />} isActive={isActive} text={item.text} />
                    }}

                </NavLink>
            ))}

            {/* <NavLink onClick={() => { setShowMenu(false) }} to="/dashboard/sales" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                {({ isActive }) => {
                    return <SideBarButtons componentIcon={isActive ? <DashboardIconFilled currentColor={"currentcolor"} className={"w-6 h-6"} /> : <DashboardIcon currentColor={"currentcolor"} className={"w-6 h-6"} />} activeButton={isActive} text={"Dashboard"} />

                }}

            </NavLink>


            <NavLink onClick={() => { setShowMenu(false) }} to="/dashboard/add-product" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <SideBarButtons componentIcon={<AddProductIcon currentColor={"currentColor"} className={"w-6 h-6"} />} activeButton={activeButton} text={"Add Product"} />

            </NavLink>


            <NavLink onClick={() => { setShowMenu(false) }} to="/dashboard/products" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <SideBarButtons componentIcon={<ProductsIcon currentColor={"currentColor"} className={"w-6 h-6"} />} activeButton={activeButton} text={"Products"} />

            </NavLink>

            <NavLink onClick={() => { setShowMenu(false) }} to="/dashboard/users" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <SideBarButtons componentIcon={<UsersIcon currentColor={"currentColor"} className={"w-6 h-6"} />} activeButton={activeButton} text={"Users"} />

            </NavLink>


            <NavLink onClick={() => { setShowMenu(false) }} to="/dashboard/orders" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <SideBarButtons componentIcon={<OrdersIcon currentColor={"currentColor"} className={"w-6 h-6"} />} activeButton={activeButton} text={"Orders"} />

            </NavLink> */}


        </div>
    )
}

export default DashboardHamburgerContent