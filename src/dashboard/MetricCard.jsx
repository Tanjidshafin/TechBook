"use client"

import { motion } from "framer-motion"

const MetricCard = ({ title, value, icon, percentage, isIncrease }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
        >
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
                    <h3 className="text-2xl font-bold mt-2 dark:text-white">{value}</h3>
                </div>
                <div className={`p-3 rounded-full ${isIncrease ? "bg-green-100" : "bg-red-100"}`}>{icon}</div>
            </div>
            <div className="flex items-center mt-4">
                <span className={`text-sm ${isIncrease ? "text-green-500" : "text-red-500"}`}>{percentage}%</span>
                <span className="text-gray-400 dark:text-gray-500 text-sm ml-2">vs last month</span>
            </div>
        </motion.div>
    )
}

export default MetricCard

