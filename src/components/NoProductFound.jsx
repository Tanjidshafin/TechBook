import { motion } from "framer-motion"
import Lottie from "lottie-react"
import noDataAnimation from "../assets/No_ data.json"

const NoProductsFound = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center mt-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
            <Lottie animationData={noDataAnimation} loop={true} className="w-64 h-64" />
            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-gray-800 dark:text-gray-200 mt-4"
            >
                No Products Found
            </motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-gray-600 dark:text-gray-400 mt-2 text-center"
            >
                Be the first to add a product and start the trend!
            </motion.p>
        </motion.div>
    )
}

export default NoProductsFound

