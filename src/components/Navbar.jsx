"use client"

import { useContext, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AwesomeButton } from "react-awesome-button"
import "react-awesome-button/dist/styles.css"
import { NavLink } from "react-router"
import { AppContext } from "../context/AppContext"
import { FiUser, FiSettings, FiHelpCircle, FiSun, FiMoon } from "react-icons/fi"
import { MdDashboard } from "react-icons/md"
import { CiNoWaitingSign } from "react-icons/ci"
import { TbLogout2 } from "react-icons/tb"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase.init"
import Swal from "sweetalert2"
import IsSubscription from "../hooks/IsSubscription"

const Navbar = () => {
    const [isSubscription] = IsSubscription()
    const { user, toggleDarkMode, isDarkMode } = useContext(AppContext)
    const [accountMenuOpen, setAccountMenuOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset
            setVisible(accountMenuOpen || mobileMenuOpen ? true : prevScrollPos > currentScrollPos || currentScrollPos < 10)
            setPrevScrollPos(currentScrollPos)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [prevScrollPos, accountMenuOpen, mobileMenuOpen])

    const handleLogout = async () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You have to login again to access again!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!",
            }).then((result) => {
                if (result.isConfirmed) {
                    signOut(auth).then((res) => {
                        Swal.fire({
                            title: "You have been logged out!",
                            text: "Please Login Again, Thank You",
                            icon: "success",
                        })
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            clipPath: "circle(0% at 90% 0%)",
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            clipPath: "circle(150% at 90% 0%)",
            transition: {
                type: "spring",
                duration: 0.4,
                staggerChildren: 0.05,
            },
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            y: -20,
            clipPath: "circle(0% at 90% 0%)",
            transition: {
                duration: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 },
    }

    const ThemeIcon = () => (
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
            {isDarkMode ? <FiMoon className="h-6 w-6 text-blue-400" /> : <FiSun className="h-6 w-6 text-amber-500" />}
        </motion.div>
    )

    return (
        <motion.nav
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: visible ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md"
        >
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <a className="flex items-center gap-2 font-bold dark:text-gray-300 text-gray-700 text-xl md:text-3xl">
                            <img
                                className="md:w-10 md:h-10 w-8 h-8 rounded-full object-cover"
                                src="https://static.vecteezy.com/system/resources/thumbnails/008/386/422/small_2x/tb-or-bt-initial-letter-logo-design-vector.jpg"
                                alt=""
                            />
                            <span>TechBook</span>
                        </a>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                `text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}`
                            }
                        >
                            Products
                        </NavLink>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={toggleDarkMode}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                <ThemeIcon />
                            </AnimatePresence>
                        </motion.button>

                        {user && (
                            <div className="relative">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
                                    <img
                                        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                        src={
                                            user.photoURL ||
                                            "https://cdn.vectorstock.com/i/500p/43/94/default-avatar-photo-placeholder-icon-grey-vector-38594394.jpg"
                                        }
                                        alt=""
                                        className="w-9 h-9 rounded-full cursor-pointer object-cover ring-2 ring-blue-500 dark:ring-blue-400"
                                    />
                                    <motion.div
                                        className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                    />
                                </motion.div>

                                <AnimatePresence>
                                    {accountMenuOpen && (
                                        <motion.div
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute right-0 mt-3 w-64 origin-top-right"
                                        >
                                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="p-4 bg-gradient-to-r from-gray-600 to-gray-600 dark:from-gray-600 dark:to-gray-600"
                                                >
                                                    <p className="text-white font-medium truncate">{user.displayName}</p>
                                                    <p className="text-blue-100 text-sm truncate">{user.email}</p>
                                                </motion.div>

                                                <div className="p-2">
                                                    <motion.div variants={itemVariants}>
                                                        <NavLink
                                                            to="/dashboard/my-profile"
                                                            className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors group"
                                                        >
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                                                <FiUser className="w-4 h-4" />
                                                            </div>
                                                            <span className="ml-3">Profile</span>
                                                        </NavLink>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <NavLink
                                                            to="/dashboard/my-products"
                                                            className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors group"
                                                        >
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-500 dark:text-purple-400 group-hover:scale-110 transition-transform">
                                                                <MdDashboard className="w-4 h-4" />
                                                            </div>
                                                            <span className="ml-3">Dashboard</span>
                                                        </NavLink>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <NavLink
                                                            to="/settings"
                                                            className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors group"
                                                        >
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                                                <FiSettings className="w-4 h-4" />
                                                            </div>
                                                            <span className="ml-3">Settings</span>
                                                        </NavLink>
                                                    </motion.div>

                                                    <motion.div variants={itemVariants}>
                                                        <NavLink
                                                            to="/help"
                                                            className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors group"
                                                        >
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform">
                                                                <FiHelpCircle className="w-4 h-4" />
                                                            </div>
                                                            <span className="ml-3">Help</span>
                                                        </NavLink>
                                                    </motion.div>
                                                </div>

                                                <motion.div
                                                    variants={itemVariants}
                                                    className="px-4 py-3 border-t border-gray-100 dark:border-gray-700"
                                                >
                                                    {isSubscription ? (
                                                        <div className="flex items-center px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 text-green-500 dark:text-green-400">
                                                                <motion.div
                                                                    animate={{ scale: [1, 1.2, 1] }}
                                                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                                                                >
                                                                    <CiNoWaitingSign className="w-4 h-4" />
                                                                </motion.div>
                                                            </div>
                                                            <span className="ml-3 text-sm font-medium text-green-700 dark:text-green-300">
                                                                Verified Account
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/30">
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-400">
                                                                <CiNoWaitingSign className="w-4 h-4" />
                                                            </div>
                                                            <span className="ml-3 text-sm font-medium text-red-700 dark:text-red-300">
                                                                Not Verified
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.div>

                                                <motion.div variants={itemVariants} className="p-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="flex items-center w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors group"
                                                    >
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform">
                                                            <TbLogout2 className="w-4 h-4" />
                                                        </div>
                                                        <span className="ml-3 font-medium">Logout</span>
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <motion.button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </motion.button>
                        </div>

                        {user ? (
                            <></>
                        ) : (
                            <NavLink to="/login">
                                <AwesomeButton type="primary">Login</AwesomeButton>
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile Menu Sidebar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 20 }}
                            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl"
                        >
                            <div className="p-4 space-y-4">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <nav className="space-y-2">
                                    <NavLink
                                        to="/"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded-lg transition-colors ${isActive
                                                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="/products"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={({ isActive }) =>
                                            `block px-4 py-2 rounded-lg transition-colors ${isActive
                                                ? "bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            }`
                                        }
                                    >
                                        Products
                                    </NavLink>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            <style jsx>{`
                .dropdown-item {
                    @apply flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200;
                }
            `}</style>
        </motion.nav>
    )
}

export default Navbar

