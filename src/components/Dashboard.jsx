import React, { useEffect, useState } from 'react'
import { FiBarChart, FiPieChart } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { GoHome, GoProjectSymlink } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { NavLink, Outlet, useNavigate } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { FaUsers } from "react-icons/fa6";
import { RiCoupon2Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import IsAdmin from '../hooks/IsAdmin';
import IsModerator from '../hooks/IsModerator';
const Dashboard = () => {
    const [isAdmin] = IsAdmin()
    const [isModerator] = IsModerator()
    const { user, toggleDarkMode } = useContext(AppContext)
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
        <div className="flex flex-col lg:flex-row  md:gap-10">
            <div className='flex items-center px-4 sm:px-6 lg:px-8 mt-2 lg:hidden'>
                <div className="drawer">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 p-1 dark:bg-gray-300 dark:text-gray-800 bg-gray-700 rounded-full text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                        </svg>
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu flex flex-col gap-5 bg-base-200 text-base-content min-h-full w-2- p-4">
                            {/* Sidebar content here */}
                            <li><NavLink to="/"> <GoHome className="text-[1.5rem]  text-gray-400" /></NavLink></li>
                            <li>
                                <NavLink to="/dashboard/my-products" className={({ isActive }) => ` ${isActive ? " text-gray-300 bg-gray-700" : ""} `

                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                    </svg>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-product" className={({ isActive }) => `${isActive ? " text-gray-300 bg-gray-700" : ""}`
                                }>
                                    <GoProjectSymlink className="text-[1.5rem]  text-gray-400" />
                                </NavLink>
                            </li>
                            {isAdmin === true || isModerator === true ? (
                                <>
                                    <li>
                                        <NavLink
                                            to="/dashboard/reported-products"
                                            className={({ isActive }) =>
                                                `${isActive ? " text-gray-300 bg-gray-700" : ""
                                                }`
                                            }
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6 text-gray-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                                />
                                            </svg>
                                        </NavLink>

                                    </li>
                                    <li>
                                        <NavLink
                                            to="/dashboard/pending-products"
                                            className={({ isActive }) =>
                                                ` ${isActive ? " text-gray-300 bg-gray-700" : ""
                                                }`
                                            }
                                        >
                                            <FiBarChart className="text-[1.5rem]  text-gray-400" />
                                        </NavLink>
                                    </li>
                                </>
                            ) : null}
                            {isAdmin ? (<><li>
                                <NavLink to="/dashboard/statistics" className={({ isActive }) => ` ${isActive ? " text-gray-300 bg-gray-700" : ""}`

                                }>
                                    <FiPieChart className="text-[1.5rem]  text-gray-400" />
                                </NavLink>
                            </li>
                                <li>
                                    <NavLink to="/dashboard/manage-users" className={({ isActive }) => `${isActive ? " text-gray-300 bg-gray-700" : ""}`

                                    }>
                                        <FaUsers className="text-[1.5rem]  text-gray-400" />
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => `${isActive ? " text-gray-300 bg-gray-700" : ""}`

                                    }>
                                        <RiCoupon2Line className="text-[1.5rem]  text-gray-400" />
                                    </NavLink></li></>) : null}

                        </ul>
                    </div>
                </div>
                <div className="dropdown dropdown-left">
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

            </div>
            <aside className="bg-white hidden lg:block dark:bg-gray-800 boxShadow w-1/7 rounded-md transition-all duration-300 ease">
                <div className="mt-5 px-4">

                </div>
                <div className="mt-6 px-4">
                    <div className="mt-3 flex flex-row lg:flex-col gap-5">
                        <NavLink to="/" className={({ isActive }) => `flex items-center w-full hover:bg-gray-50 ${isActive ? "scale-150" : ""} p-[5px] rounded-md cursor-pointer`

                        }>
                            <GoHome className="text-[1.5rem]  text-gray-400" />
                            <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">Home</span>
                        </NavLink>
                        <NavLink to="/dashboard/my-products" className={({ isActive }) => `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""} p-[5px] rounded-md cursor-pointer`

                        }>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>

                            <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">My Products</span>
                        </NavLink>
                        <NavLink to="/dashboard/add-product" className={({ isActive }) => `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""} p-[5px] rounded-md cursor-pointer`

                        }>
                            <GoProjectSymlink className="text-[1.5rem]  text-gray-400" />
                            <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">Add Products</span>
                        </NavLink>
                        {isAdmin === true || isModerator === true ? (
                            <>
                                <NavLink
                                    to="/dashboard/reported-products"
                                    className={({ isActive }) =>
                                        `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""
                                        } p-[5px] rounded-md cursor-pointer`
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                                        />
                                    </svg>
                                    <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">
                                        Reported Products
                                    </span>
                                </NavLink>

                                <NavLink
                                    to="/dashboard/pending-products"
                                    className={({ isActive }) =>
                                        `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""
                                        } p-[5px] rounded-md cursor-pointer`
                                    }
                                >
                                    <FiBarChart className="text-[1.5rem]  text-gray-400" />
                                    <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">
                                        Pending Products
                                    </span>
                                </NavLink>
                            </>
                        ) : null}

                        {isAdmin ? (<><NavLink to="/dashboard/statistics" className={({ isActive }) => `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""} p-[5px] rounded-md cursor-pointer`

                        }>
                            <FiPieChart className="text-[1.5rem]  text-gray-400" />
                            <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">Statistics</span>
                        </NavLink>
                            <NavLink to="/dashboard/manage-users" className={({ isActive }) => `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""} p-[5px] rounded-md cursor-pointer`

                            }>
                                <FaUsers className="text-[1.5rem]  text-gray-400" />
                                <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">Manage Users</span>
                            </NavLink>
                            <NavLink className={({ isActive }) => `flex items-center w-full hover:bg-gray-50 ${isActive ? " text-gray-300 bg-gray-700" : ""} p-[5px] rounded-md cursor-pointer`

                            }>
                                <RiCoupon2Line className="text-[1.5rem]  text-gray-400" />
                                <span className="hidden lg:inline ml-2 text-[1rem] font-[400] text-gray-400">Manage Coupons</span>
                            </NavLink></>) : null}
                    </div>
                </div>
                {/* Profile section */}
                <div className="bg-gray-100 dark:bg-gray-700 py-3 px-4 flex items-center mt-10">
                    <div className="flex items-center gap-[3px]">
                        <img
                            src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
                            alt="" className="w-[30px] hidden lg:inline h-[30px] cursor-pointer rounded-full object-cover" />
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
                        <h3 className="hidden lg:inline text-[0.9rem] text-gray-800 dark:text-gray-400 font-[500]">{user.displayName}</h3>

                    </div>
                    <div className="relative group ml-4">
                        <BsThreeDots className="text-[1.2rem] hidden lg:inline text-gray-400 cursor-pointer" />
                        <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-0 left-[30px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]">
                            <NavLink to="/dashboard/my-profile" className={({ isActive }) => `flex items-center gap-[7px] text-[0.9rem] dark:text-gray-300 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer`

                            }>
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
            <main className="lg:w-3/4 px-5">
                <Outlet />
            </main>
        </div>
    )
}

export default Dashboard