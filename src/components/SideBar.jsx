import React from 'react'
import '../App.css'
import { TbCategoryFilled } from "react-icons/tb";
import { LiaUsersCogSolid } from "react-icons/lia";
import { HiReceiptTax } from "react-icons/hi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { AiFillReconciliation } from "react-icons/ai";
import { AiFillTruck } from "react-icons/ai";
import { LuUsers } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {

    const categories = [{
        title: "Categories",
        icon : <TbCategoryFilled className='w-6 h-6' />,
        path: "categories"
    },
    {
        title: "Roles",
        icon : <AiFillReconciliation className='w-6 h-6' />,
        path: "roles"
    },
    {
        title: "Products",
        icon : <TfiShoppingCartFull className='w-6 h-6' />,
        path: "products"
    },
    {
        title: "Staff",
        icon : <LiaUsersCogSolid className='w-6 h-6' />,
        path: "staff"
    },
    {
        title: "Suppliers",
        icon : <AiFillTruck className='w-6 h-6' />,
        path: "suppliers"
    },
        {
        title: "Users",
        icon : <LuUsers className='w-6 h-6' />,
        path: "users"
    },
        {
        title: "Order Details",
        icon : <HiReceiptTax className='w-6 h-6' />,
        path: "order-details"
    },
    {
      title: "Logout",
      icon: <RiLogoutCircleLine />,
      path : "login"
    }
  ]


return (
    <div className="bg-[#020617]/95 w-52 text-white flex flex-col items-center py-6 fixed left-0 top-0 h-screen">
           
       <Link to="/"  className="m-1.5 text-1xl text-center leading-tight">Inventory<br />Dashboard </Link>

      {categories.map(({ title, path, icon }, index) => (
        <NavLink
          key={index}
          to={path}
          className={({ isActive }) =>
            `m-3 flex items-center gap-7 cursor-pointer w-40 py-2 px-3 rounded-lg hover:scale-[1.03] transition ${
              isActive ? 'glass-morphism' : 'bg-transparent'
            }`}>
          <span className="w-3 h-3">{icon}</span>
          <p className='text-0.3xl'>{title}</p>
        </NavLink>
      ))}

      {/* <Link to="/login" className="glass-morphism mt-auto w-3/5 p-2 rounded-lg hover:scale-[1.03] transition text-center">
        Logout
      </Link> */}
    </div>
  );
};

export default SideBar