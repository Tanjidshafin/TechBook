"use client"

import { useState, useContext } from "react"
import { motion } from "framer-motion"
import { NavLink, Outlet, useNavigate } from "react-router"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase.init"
import Swal from "sweetalert2"
import IsAdmin from "../hooks/IsAdmin"
import IsModerator from "../hooks/IsModerator"
import {
    FiHome,
    FiBox,
    FiPlusSquare,
    FiAlertTriangle,
    FiClock,
    FiPieChart,
    FiUsers,
    FiTag,
    FiMenu,
    FiX,
    FiLogOut,
    FiUser,
} from "react-icons/fi"
import { AppContext } from "../context/AppContext"


const Dashboard = () => {
    const [isAdmin] = IsAdmin()
    const [isModerator] = IsModerator()
    const { user, loading } = useContext(AppContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You have to login again to access again!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!",
            })

            if (result.isConfirmed) {
                navigate("/")
                await signOut(auth)
                await Swal.fire({
                    title: "You have been logged out!",
                    text: "Please Login Again, Thank You",
                    icon: "success",
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    const menuItems = [
        { icon: FiHome, text: "Home", path: "/" },
        { icon: FiBox, text: "My Products", path: "/dashboard/my-products" },
        { icon: FiPlusSquare, text: "Add Product", path: "/dashboard/add-product" },
        ...(isAdmin || isModerator
            ? [
                { icon: FiAlertTriangle, text: "Reported Products", path: "/dashboard/reported-products" },
                { icon: FiClock, text: "Pending Products", path: "/dashboard/pending-products" },
            ]
            : []),
        ...(isAdmin
            ? [
                { icon: FiPieChart, text: "Statistics", path: "/dashboard/statistics" },
                { icon: FiUsers, text: "Manage Users", path: "/dashboard/manage-users" },
                { icon: FiTag, text: "Manage Coupons", path: "/dashboard/manage-coupons" },
            ]
            : []),
    ]
    if (loading) {
        return <div>loading...</div>
    }
    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
            <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <div className="p-4">
                        <h1 className="text-2xl font-bold text-white tracking-wider">TECHBOOK</h1>
                    </div>
                </div>
                <nav className="mt-5 px-2">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ${isActive ? "bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                                }`
                            }
                        >
                            <item.icon className="h-5 w-5 mr-2" />
                            <span>{item.text}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <motion.aside
                initial={{ x: -300 }}
                animate={{ x: isSidebarOpen ? 0 : -300 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto lg:hidden"
            >
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Techbook</h2>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                        <FiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>
                <nav className="mt-5 px-2">
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 ${isActive ? "bg-gray-200 dark:bg-gray-700 text-blue-600 dark:text-blue-400" : ""
                                }`
                            }
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <item.icon className="h-5 w-5 mr-2" />
                            <span>{item.text}</span>
                        </NavLink>
                    ))}
                </nav>
            </motion.aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <FiMenu className="h-6 w-6" />
                            </button>
                            {user && (<div className="flex items-center">
                                <img
                                    src={user?.photoURL || "https://via.placeholder.com/40"}
                                    alt="User avatar"
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                                <span className="ml-3 font-medium text-gray-700 dark:text-gray-200">{user?.displayName}</span>
                            </div>)}
                        </div>
                        <div className="flex items-center">
                            <NavLink
                                to="/dashboard/my-profile"
                                className="mr-4 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <FiUser className="h-5 w-5" />
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
                            >
                                <FiLogOut className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                            <Outlet />
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard

