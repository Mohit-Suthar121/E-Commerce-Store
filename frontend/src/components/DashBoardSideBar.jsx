import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom';

import DashboardIcon from '../icons/DashboardIcon'
import SideBarButtons from '../components/SideBarButtons';
import AddProductIcon from '../icons/AddProductIcon';
import UsersIcon from '../icons/UsersIcon';
import OrdersIcon from '../icons/OrdersIcon';
import ProductsIcon from '../icons/ProductsIcon';
import DashboardIconFilled from '../icons/DashboardIconFilled';
import AddProductIconFilled from '../icons/AddProductIconFilled';
import ProductsIconFilled from '../icons/ProductsIconFilled';
import UsersIconFilled from '../icons/UsersIconFilled';
import OrdersIconFilled from '../icons/OrdersIconFilled';

const DashBoardSideBar = () => {
    const [activeButton, setActiveButton] = useState("");
    const location = useLocation();

    const [sideBarContent, setSideBarContent] = useState([
        { text: "Dashboard", componentIcon: DashboardIcon, componentIconFilled: DashboardIconFilled, path: "sales" },
        { text: "Add Product", componentIcon: AddProductIcon, componentIconFilled: AddProductIconFilled, path: "add-product" },
        { text: "Products", componentIcon: ProductsIcon, componentIconFilled: ProductsIconFilled, path: "products" },
        { text: "Users", componentIcon: UsersIcon, componentIconFilled: UsersIconFilled, path: "users" },
        { text: "Orders", componentIcon: OrdersIcon, componentIconFilled: OrdersIconFilled, path: "orders" },
    ]);

    return (
        <div className="hidden left-section w-1/3 max-w-xs md:flex flex-col gap-6 p-6 bg-[#0b0b0b] border-r border-neutral-900 flex-1 font-sans antialiased select-none">

            <div className="flex items-center gap-2.5 px-2 pb-2 border-b border-neutral-900/60">
                <div className="w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Control Console
                </span>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
                {sideBarContent.map((item, index) => (
                    <NavLink to={item.path} key={index}>
                        {({ isActive }) => {
                            const Icon = isActive ? item.componentIconFilled : item.componentIcon;
                            return (
                                <SideBarButtons
                                    text={item.text}
                                    componentIcon={<Icon currentColor="currentColor" className="w-4 h-4" />}
                                    isActive={isActive}
                                />
                            )
                        }}
                    </NavLink>
                ))}
            </div>

        </div>
    )
}

export default DashBoardSideBar