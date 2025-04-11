"use client"
import { motion } from "framer-motion"
import { FiHome, FiBookOpen } from "react-icons/fi"
import { NavLink } from "react-router"

const Error404 = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-hidden">
            <img
                src="https://wallpapers.com/images/hd/tech-background-t29vt7psb6i6sgcy.jpg"
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <motion.div
                className="relative z-10 max-w-2xl w-full px-4 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
                    variants={itemVariants}
                >
                    <motion.div
                        className="mb-8 text-6xl md:text-8xl font-extrabold text-indigo-600 dark:text-indigo-400"
                        variants={itemVariants}
                    >
                        404
                    </motion.div>
                    <motion.h1
                        className="mb-4 text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                        variants={itemVariants}
                    >
                        Oops! Page Not Found
                    </motion.h1>
                    <motion.p className="mb-8 text-lg text-gray-600 dark:text-gray-300" variants={itemVariants}>
                        The page you're looking for seems to be missing from our TechBook. It might have been moved, deleted, or
                        never existed.
                    </motion.p>
                    <motion.div
                        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                        variants={itemVariants}
                    >
                        <NavLink to="/">
                            <motion.a
                                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiHome className="mr-2" />
                                Back to Home
                            </motion.a>
                        </NavLink>
                        <NavLink to="/products">
                            <motion.a
                                href="/search"
                                className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:text-indigo-400 dark:hover:bg-gray-700"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiBookOpen className="mr-2" />
                                See All Products
                            </motion.a>
                        </NavLink>
                    </motion.div>
                </motion.div>

                <motion.div className="mt-8 text-white text-sm" variants={itemVariants}>
                    © 2025 TechBook. All rights reserved.
                </motion.div>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>
    )
}

export default Error404

