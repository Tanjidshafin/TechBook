import React, { useEffect, useState } from 'react'
import {
    IoNotificationsOutline,
    IoSettingsOutline
} from "react-icons/io5";
import { FiBarChart, FiPieChart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { GoHome, GoProjectSymlink, GoSidebarCollapse } from "react-icons/go";
import { CiCalendar, CiLogout } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';
import Swal from 'sweetalert2';
const Dashboard = () => {
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    })
    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <div className="w-10 h-10 flex gap-2 items-center justify-center"><div className="w-2 h-5 animate-[ping_1.4s_linear_infinite] bg-sky-600"></div><div className="w-2 h-5 animate-[ping_1.8s_linear_infinite] bg-sky-600"></div><div className="w-2 h-5 animate-[ping_2s_linear_infinite] bg-sky-600"></div></div>
        </div>
    }
    if (!user) {
        return <div>Please Reload Again</div>
    }
    const handleLogout = async () => {
        try {
            setLoading(true)
            Swal.fire({
                title: "Are you sure?",
                text: "You have to login again to access again!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!"
            }).then((result) => {
                if (result.isConfirmed) {
                    signOut(auth)
                        .then(res => {
                            Swal.fire({
                                title: "You have beeen logged out!",
                                text: "Please Login Again, Thank You",
                                icon: "success"
                            });
                            navigate("/login")
                        })
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="flex md:gap-10">
            <aside className="bg-white min-h-screen boxShadow w-1/7 rounded-md transition-all duration-300 ease">
                <div className="mt-5 px-4">

                </div>
                <div className="mt-6 px-4">
                    <div className="mt-3 flex flex-col gap-5">
                        <NavLink to="/dashboard/my-products" className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <GoHome className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">My Products</span>
                        </NavLink>
                        <NavLink to="/dashboard/add-product" className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <CiCalendar className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">Add Products</span>
                        </NavLink>
                        <NavLink to="/dashboard/reported-products" className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <GoProjectSymlink className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">Reported Products</span>
                        </NavLink>
                        <NavLink to="/dashboard/pending-products" className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <FiBarChart className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">Pending Products</span>
                        </NavLink>
                        <NavLink to="/dashboard/statistics" className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <FiPieChart className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">Statistics</span>
                        </NavLink>
                        <NavLink to="/dashboard/manage-users" className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <IoNotificationsOutline className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">Manage Users</span>
                        </NavLink>
                        <div className="flex items-center w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer">
                            <IoSettingsOutline className="text-[1.5rem] text-gray-500" />
                            <span className="hidden md:inline ml-2 text-[1rem] font-[400] text-gray-500">Manage Coupons</span>
                        </div>
                    </div>
                </div>
                {/* Profile section */}
                <div className="bg-gray-100 py-3 px-4 flex items-center mt-10">
                    <div className="flex items-center gap-[3px]">
                        <img
                            src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
                            alt="" className="w-[30px] hidden md:inline h-[30px] cursor-pointer rounded-full object-cover" />
                        <div className="dropdown dropdown-bottom">
                            <div tabIndex={0} role="button" className=" inline md:hidden">
                                <img
                                    src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
                                    alt="avatar" className="w-[30px] h-[30px] cursor-pointer rounded-full object-cover" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><NavLink to="/dashboard/my-profile"> <RiAccountCircleLine />
                                    Profile</NavLink></li>
                                <li onClick={handleLogout}><a><CiLogout />
                                    Logout</a></li>
                            </ul>
                        </div>
                        <h3 className="hidden md:inline text-[0.9rem] text-gray-800 font-[500]">{user.displayName}</h3>

                    </div>
                    <div className="relative group ml-4">
                        <BsThreeDots className="text-[1.2rem] hidden md:inline text-gray-500 cursor-pointer" />
                        <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-0 left-[30px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]">
                            <NavLink to="/dashboard/my-profile" className="flex items-center gap-[7px] text-[0.9rem] text-gray-600 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
                                <RiAccountCircleLine />
                                Profile
                            </NavLink>
                            <li onClick={handleLogout} className="flex items-center gap-[7px] text-[0.9rem] text-red-500 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer">
                                <CiLogout />
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
            <main className="w-3/4">
                <Outlet />
            </main>
        </div>
    )
}

export default Dashboard