"use client"

import { useState, useContext, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavLink, Outlet, useNavigate, useLocation } from "react-router"
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
    FiMoon,
    FiSun,
    FiSettings,
    FiBell,
} from "react-icons/fi"
import { AppContext } from "../context/AppContext"

const Dashboard = () => {
    const [isAdmin] = IsAdmin()
    const [isModerator] = IsModerator()
    const { user, loading } = useContext(AppContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const navigate = useNavigate()
    const location = useLocation()
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
        localStorage.setItem('darkMode', newDarkMode);
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

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

    // Get current page title
    const getCurrentPageTitle = () => {
        const currentPath = location.pathname
        const currentItem = menuItems.find((item) => item.path === currentPath)
        return currentItem ? currentItem.text : "Dashboard"
    }

    // Animation variants
    const sidebarVariants = {
        open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
        closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    }

    const menuItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto border-r border-gray-200 dark:border-gray-700 transition-all duration-300">
                <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center space-x-2"
                    >
                        <a className="flex items-center gap-2 font-bold dark:text-gray-300 text-gray-700 text-xl md:text-3xl">
                            <img
                                className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                                src="https://static.vecteezy.com/system/resources/thumbnails/008/386/422/small_2x/tb-or-bt-initial-letter-logo-design-vector.jpg"
                                alt=""
                            />
                            <span>TechBook</span>
                        </a>
                    </motion.div>
                </div>

                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="User avatar"
                                className="h-12 w-12 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
                            />
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 dark:text-white">{user?.displayName || "User"}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {isAdmin ? "Administrator" : isModerator ? "Moderator" : "User"}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="mt-6 px-6">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Navigation
                    </h3>
                    {menuItems.map((item, index) => (
                        <motion.div key={index} custom={index} initial="hidden" animate="visible" variants={menuItemVariants}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-3 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive
                                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400"
                                        : ""
                                    }`
                                }
                            >
                                <item.icon className={`h-5 w-5 mr-3 ${location.pathname === item.path ? "text-blue-500" : ""}`} />
                                <span>{item.text}</span>
                            </NavLink>
                        </motion.div>
                    ))}

                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 mt-8">
                        Settings
                    </h3>
                    <motion.div custom={menuItems.length} initial="hidden" animate="visible" variants={menuItemVariants}>
                        <NavLink
                            to="/dashboard/my-profile"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400"
                                    : ""
                                }`
                            }
                        >
                            <FiUser className="h-5 w-5 mr-3" />
                            <span>My Profile</span>
                        </NavLink>
                    </motion.div>

                    <motion.div custom={menuItems.length + 1} initial="hidden" animate="visible" variants={menuItemVariants}>
                        <NavLink
                            to="/dashboard/settings"
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400"
                                    : ""
                                }`
                            }
                        >
                            <FiSettings className="h-5 w-5 mr-3" />
                            <span>Settings</span>
                        </NavLink>
                    </motion.div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                        >
                            <FiLogOut className="h-5 w-5 mr-3" />
                            <span>Logout</span>
                        </motion.button>
                    </div>
                </nav>
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                variants={sidebarVariants}
                initial="closed"
                animate={isSidebarOpen ? "open" : "closed"}
                className="fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto lg:hidden"
            >
                <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                        <a className="flex items-center gap-2 font-bold dark:text-gray-300 text-gray-700 text-xl md:text-3xl">
                            <img
                                className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                                src="https://static.vecteezy.com/system/resources/thumbnails/008/386/422/small_2x/tb-or-bt-initial-letter-logo-design-vector.jpg"
                                alt=""
                            />
                            <span>TechBook</span>
                        </a>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                        <FiX className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={user?.photoURL || "https://via.placeholder.com/40"}
                                alt="User avatar"
                                className="h-12 w-12 rounded-full object-cover border-2 border-blue-500 dark:border-blue-400"
                            />
                            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                        </div>
                        <div>
                            <h2 className="font-semibold text-gray-800 dark:text-white">{user?.displayName || "User"}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {isAdmin ? "Administrator" : isModerator ? "Moderator" : "User"}
                            </p>
                        </div>
                    </div>
                </div>

                <nav className="mt-6 px-6">
                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                        Navigation
                    </h3>
                    {menuItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center px-4 py-3 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400"
                                    : ""
                                }`
                            }
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <item.icon className={`h-5 w-5 mr-3 ${location.pathname === item.path ? "text-blue-500" : ""}`} />
                            <span>{item.text}</span>
                        </NavLink>
                    ))}

                    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 mt-8">
                        Settings
                    </h3>
                    <NavLink
                        to="/dashboard/my-profile"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400"
                                : ""
                            }`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <FiUser className="h-5 w-5 mr-3" />
                        <span>My Profile</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/settings"
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 mt-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 ${isActive
                                ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-4 border-blue-500 dark:border-blue-400"
                                : ""
                            }`
                        }
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <FiSettings className="h-5 w-5 mr-3" />
                        <span>Settings</span>
                    </NavLink>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-300"
                        >
                            <FiLogOut className="h-5 w-5 mr-3" />
                            <span>Logout</span>
                        </button>
                    </div>
                </nav>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                                >
                                    <FiMenu className="h-6 w-6" />
                                </button>
                                <motion.h1
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xl font-semibold text-gray-800 dark:text-white"
                                >
                                    {getCurrentPageTitle()}
                                </motion.h1>
                            </div>

                            <div className="flex items-center space-x-4">                           
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={toggleDarkMode}
                                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                    >
                                        {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                                    </motion.button>
                                </div>

                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={handleLogout}
                                        className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                                    >
                                        <FiLogOut className="h-5 w-5" />
                                    </motion.button>
                                </div>

                                <NavLink to="/dashboard/my-profile" className="flex items-center">
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        src={user?.photoURL || "https://via.placeholder.com/40"}
                                        alt="User avatar"
                                        className="h-8 w-8 rounded-full object-cover border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300"
                                    />
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
