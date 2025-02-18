import { motion } from "framer-motion"
import ProductCard from "./ProductCard"
import ProductCardSkeleton from "./ProductCardSkeleton"

const ProductGrid = ({ products, isLoading, onUpvote, user }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {isLoading
                ? Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
                : products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onUpvote={onUpvote}
                        isOwnProduct={user?.email === product.email}
                        user={user}
                    />
                ))}
        </motion.div>
    )
}

export default ProductGrid

