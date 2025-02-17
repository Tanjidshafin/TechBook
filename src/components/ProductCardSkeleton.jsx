import { motion } from "framer-motion"

const ProductCardSkeleton = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
        >
            <div className="w-full h-60 bg-gray-300 dark:bg-gray-700 animate-pulse" />
            <div className="p-4">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4 animate-pulse" />
                <div className="flex space-x-2 mb-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>
            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
                <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse" />
            </div>
        </motion.div>
    )
}

export default ProductCardSkeleton

