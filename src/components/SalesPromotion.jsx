"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FiArrowRight, FiClock, FiStar } from "react-icons/fi"

const SalesPromotion = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })
    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
            const difference = endDate - now

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
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
            transition: { duration: 0.2 },
        },
    }
    return (
        <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl mt-20 max-w-6xl mx-auto overflow-hidden shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="relative p-8 md:p-12 lg:p-16">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 dark:bg-indigo-900 rounded-full -mr-20 -mt-20 opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-100 dark:bg-pink-900 rounded-full -ml-20 -mb-20 opacity-50"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
                    <motion.div variants={itemVariants} className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
                            TechBook Summer Blast!
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                            Get up to 50% off on premium tech products
                        </p>
                        <div className="flex items-center justify-center md:justify-start text-indigo-600 dark:text-indigo-400 mb-6">
                            <FiClock className="mr-2" />
                            <span className="font-semibold">Limited Time Offer</span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-8 py-3 rounded-full font-bold text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Show All Products <FiArrowRight className="inline-block ml-2" />
                        </motion.button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative">
                        <img
                            src="https://static.vecteezy.com/system/resources/thumbnails/019/641/478/small/sale-3d-label-promotion-banner-png.png"
                            alt="TechBook Summer Promotion"
                            className="rounded-3xl shadow-lg transform rotate-3 hover:rotate-0 transition duration-300 ease-in-out"
                        />
                        <div className="absolute bottom-4 right-4 bg-yellow-400 text-gray-900 text-lg font-bold rounded-full p-4 w-16 h-16 flex items-center justify-center transform rotate-12">
                            50% OFF
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="mt-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Offer Ends In:</h3>
                    <div className="grid grid-cols-4 gap-4 text-center">
                        {Object.entries(timeLeft).map(([unit, value]) => (
                            <div key={unit} className="bg-indigo-100 dark:bg-indigo-900 rounded-lg p-4">
                                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
                                <p className="text-sm text-gray-600 hidden sm:block dark:text-gray-400 capitalize">{unit}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {["Laptop", "Mobile", "Desktop", "Accessories"].map((item, index) => (
                        <div key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-center">
                            <FiStar className="text-yellow-400 mr-2" />
                            <p className="text-gray-900 dark:text-gray-100 font-semibold">{item}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}

export default SalesPromotion

