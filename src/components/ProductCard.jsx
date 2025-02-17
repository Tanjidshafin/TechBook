import { motion } from "framer-motion"
import { NavLink } from "react-router"
import { FiArrowUp, FiClock, FiTag } from "react-icons/fi"

const ProductCard = ({ product, onUpvote, isOwnProduct, user }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
        >
            <div className="relative">
                <img
                    src={product.mainImage || "https://via.placeholder.com/300x200"}
                    alt={product.name}
                    className="w-full h-60 object-contain"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-60" />
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-lg font-semibold line-clamp-2">{product.name}</h3>
                </div>
            </div>
            <div className="p-4 flex-grow">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <FiClock className="mr-1" />
                    <span>{product.time}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.slice(0, 3).map((tag, index) => (
                        <span
                            key={index}
                            className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 dark:text-gray-300"
                        >
                            <FiTag className="inline mr-1" />
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                <NavLink
                    to={`/product/${product._id}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                    View Details
                </NavLink>
                <motion.button
                    whileHover={{ scale: !isOwnProduct && user ? 1.05 : 1 }}
                    whileTap={{ scale: !isOwnProduct && user ? 0.95 : 1 }}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full 
    ${isOwnProduct || !user
                            ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed opacity-50"
                            : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        }`}
                    onClick={() => !isOwnProduct && user && onUpvote(product._id, product.name)}
                    disabled={isOwnProduct || !user}
                >
                    <FiArrowUp className="text-white" />
                    <span className="text-white font-medium">{product.upvoteCounts}</span>
                </motion.button>

            </div>
        </motion.div>
    )
}

export default ProductCard

