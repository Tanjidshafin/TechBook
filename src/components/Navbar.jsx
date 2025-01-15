import React, { useContext, useEffect, useState } from 'react'
import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import { NavLink } from 'react-router';
import { AppContext } from '../context/AppContext';
import { FiUser } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { CiNoWaitingSign } from "react-icons/ci";
import { TbLogout2 } from "react-icons/tb";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';
import Swal from 'sweetalert2';
const Navbar = () => {
    const { user } = useContext(AppContext)
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    //logout
    const handleLogout = async () => {
        try {
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
                        })
                }
            });
        } catch (error) {
            console.log(error);
        }

    }
    //dark mode
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', newDarkMode);
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div>
            <div className={`navbar dark:bg-black  glass justify-between fixed z-10 max-w-screen-2xl px-4 sm:px-6 lg:px-8`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="mr-2 active:scale-90 lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><a>Home</a></li>
                            <li><a>Products</a></li>
                        </ul>
                    </div>
                    <a className="flex items-center gap-2 font-bold dark:text-gray-300 text-gray-700  text-xl md:text-3xl">
                        <img className='md:w-10 md:h-10 w-8 h-8 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/thumbnails/008/386/422/small_2x/tb-or-bt-initial-letter-logo-design-vector.jpg" alt="" />
                        <span>TechBook</span>
                    </a>
                </div>
                <div className="navbar-end hidden mr-10 lg:flex">
                    <ul className="flex dark:text-gray-200 font-semibold text-gray-700 justify-center gap-5 px-1">
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    `before:w-0 hover:before:w-full ${isActive ? "before:w-full" : ""} 
      before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 
      before:absolute relative before:rounded-full before:bottom-[-2px] 
      hover:text-[#3B9DF8] transition-all duration-300 before:left-0 
      cursor-pointer capitalize`
                                }
                            >
                                Home
                            </NavLink>
                        </li>


                        <li><NavLink to="/products" className={({ isActive }) => `before:w-0 hover:before:w-full ${isActive ? "before:w-full" : ""} 
      before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 
      before:absolute relative before:rounded-full before:bottom-[-2px] 
      hover:text-[#3B9DF8] transition-all duration-300 before:left-0 
      cursor-pointer capitalize`

                        }>Products</NavLink></li>
                    </ul>
                </div>
                <div className='flex items-center gap-2'>

                    <AwesomeButton onPress={toggleDarkMode}
                        size="icon"
                        type="primary"

                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                        </svg>
                    </AwesomeButton>
                    {user ? (<div className="flex items-center gap-[15px]">
                        <div className="flex items-center gap-[10px] cursor-pointer relative"
                            onClick={() => setAccountMenuOpen(!accountMenuOpen)}>
                            <div className="relative w-9">
                                <img
                                    src={user.photoURL ? user.photoURL : "https://cdn.vectorstock.com/i/500p/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"}
                                    alt="avatar" className="w-[35px] h-[35px] rounded-full object-cover" />
                                <div
                                    className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"></div>
                            </div>

                            <div
                                className={`${accountMenuOpen ? "translate-y-0 opacity-100 z-[1]" : "translate-y-[10px] opacity-0 z-[-1]"} bg-white w-max rounded-md boxShadow absolute top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}>
                                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                                    <FiUser />
                                    {user.displayName}
                                </p>
                                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                                    <MdDashboard />
                                    Dashboard
                                </p>
                                <p className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-gray-600 hover:bg-gray-50">
                                    <CiNoWaitingSign />
                                   Membership Status
                                </p>
                                <div className="mt-3 border-t border-gray-200 pt-[5px]">
                                    <button onClick={handleLogout} className="flex items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-red-500 hover:bg-red-50">
                                        <TbLogout2 />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>) : (<NavLink to="/login">
                        <AwesomeButton type="primary">Login</AwesomeButton>
                    </NavLink>)}

                </div>
            </div>
        </div>
    )
}

export default Navbar