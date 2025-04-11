"use client"

import { useContext, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams } from "react-router"
import { AppContext } from "../context/AppContext"
import AxiosPublic from "../context/AxiosPublic"
import { useQuery } from "@tanstack/react-query"
import { Helmet } from "react-helmet-async"
import IsAdmin from "../hooks/IsAdmin"
import Swal from "sweetalert2"
import {
    FaGithub,
    FaTwitter,
    FaStar,
    FaClock,
    FaTag,
    FaThumbsUp,
    FaExclamationTriangle,
    FaGlobe,
    FaUser,
} from "react-icons/fa"

export default function ProductDetails() {
    const AxiosLink = AxiosPublic()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0)
    const [isAdmin] = IsAdmin()
    const { user } = useContext(AppContext)

    const {
        data: product = [],
        refetch: singleRefetched,
        isLoading: productLoading,
    } = useQuery({
        queryKey: ["product", id],
        queryFn: async () => {
            const res = await AxiosLink.get(`/product/${id}`)
            return res.data
        },
    })

    const { data: reviews = [], refetch: reviewsRefetch } = useQuery({
        queryKey: ["reviews", id],
        queryFn: async () => {
            const res = await AxiosLink.get(`/review/${id}`)
            return res.data
        },
    })

    const handleUpvote = async () => {
        try {
            setLoading(true)
            await AxiosLink.patch(`product/${id}`)
            Swal.fire({
                title: "Upvoted",
                text: `You have upvoted ${product.name}`,
                icon: "success",
            })
            singleRefetched()
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "Failed to upvote. Please try again.",
                icon: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const handlePostReview = async (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        try {
            setLoading(true)
            const postedReview = {
                id: product._id,
                name: user.displayName,
                image: user.photoURL,
                rating: rating,
                email: user.email,
                review: comment,
            }
            await AxiosLink.post("/post-reviews", postedReview)
            Swal.fire({
                title: "Posted",
                text: "Your Review has been Posted",
                icon: "success",
            })
            reviewsRefetch()
            event.target.reset()
            setRating(0)
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "Failed to post review. Please try again.",
                icon: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteReview = async (reviewId) => {
        try {
            setLoading(true)
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            })
            if (result.isConfirmed) {
                await AxiosLink.delete(`/review/${reviewId}`)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your review has been deleted.",
                    icon: "success",
                })
                reviewsRefetch()
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "Failed to delete review. Please try again.",
                icon: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleReport = async () => {
        try {
            setLoading(true)
            const reportedData = {
                id: product._id,
                name: product.name,
                image: product.mainImage,
                email: user.email,
                speciality: product.speciality,
                reportedDate: new Date().toLocaleDateString()
            }
            const res = await AxiosLink.post("/add-reported-products", reportedData)
            Swal.fire({
                title: "Reported",
                text: res.data.message,
                icon: "success",
            })
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "Failed to report product. Please try again.",
                icon: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    const ProductDetailsSkeleton = () => (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="relative">
                <div className="h-[40vh] bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse">
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative -mt-32">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
                            <div className="sm:p-8 p-4 animate-pulse">
                                <div className="grid lg:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="aspect-square rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
                                        <div className="sm:grid flex flex-wrap grid-cols-4 gap-4">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700"></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <div>
                                            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                                            <div className="space-y-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <div key={i} className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid gap-4">
                                            {[...Array(3)].map((_, i) => (
                                                <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col sm::flex-row gap-4">
                                            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                            <div className="h-12 w-40 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8">
                        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                        <div className="flex flex-col lg:flex-row gap-8">
                            <div className="lg:w-2/3 grid gap-6 sm:grid-cols-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-700/50">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                                <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                                <div className="h-4 w-full bg-gray-200 dark:bg-gray-600 rounded"></div>
                                                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-600 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="lg:w-1/3">
                                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                                <div className="space-y-4">
                                    <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    if (productLoading) {
        return <ProductDetailsSkeleton />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Helmet>
                <title>{`TechBook | ${product.name}`}</title>
            </Helmet>
            <div className="relative">
                <div className="h-[30vh] sm:h-[40vh] bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900">
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
                    <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/006/171/663/non_2x/technology-floor-and-wall-the-background-of-the-product-base-in-the-room-with-hexagon-laser-light-free-photo.jpg')] opacity-10"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-20">
                    <div className="relative -mt-20 sm:-mt-32">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-xl"
                        >
                            <div className="p-4 sm:p-8">
                                <div className="grid lg:grid-cols-2 gap-6 sm:gap-12">
                                    <div className="space-y-4 sm:space-y-6">
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={selectedImage}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800"
                                            >
                                                <img
                                                    src={product.images?.[selectedImage] || product.mainImage}
                                                    alt={product.name}
                                                    className="w-full h-full object-contain sm:object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                            </motion.div>
                                        </AnimatePresence>
                                        <div className="sm:grid flex flex-wrap justify-center sm:grid-cols-4 gap-2 sm:gap-4 overflow-x-auto sm:overflow-x-visible p-1 sm:pb-0">
                                            {product.images?.map((image, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => setSelectedImage(index)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`relative flex-shrink-0 w-20 sm:w-auto aspect-square rounded-xl overflow-hidden group ${selectedImage === index
                                                        ? "ring-2 ring-indigo-600 dark:ring-indigo-400"
                                                        : "ring-1 ring-gray-200 dark:ring-gray-700"
                                                        }`}
                                                >
                                                    <img
                                                        src={image || "/placeholder.svg"}
                                                        alt={`${product.name} view ${index + 1}`}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                                                    {selectedImage === index && (
                                                        <div className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-400/10"></div>
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6 sm:space-y-8">
                                        <div>
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="inline-flex items-center px-3 sm:px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4"
                                            >
                                                <FaTag className="mr-2" />
                                                {product.speciality}
                                            </motion.div>

                                            <motion.h1
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                                            >
                                                {product.name}
                                            </motion.h1>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
                                            >
                                                {product.description}
                                            </motion.p>
                                        </div>

                                        <div className="grid gap-3 sm:gap-4">
                                            <div className="flex items-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                                <FaClock className="text-xl text-indigo-600 dark:text-indigo-400" />
                                                <div className="ml-4">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">Posted</div>
                                                    <div className="text-gray-900 dark:text-white font-medium">{product.time}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                                <FaUser className="text-xl text-indigo-600 dark:text-indigo-400" />
                                                <div className="ml-4">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">Posted by</div>
                                                    <div className="text-gray-900 dark:text-white font-medium break-all">{product.email}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center p-3 sm:p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                                <FaGlobe className="text-xl text-indigo-600 dark:text-indigo-400" />
                                                <div className="ml-4">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">External Links</div>
                                                    <div className="flex gap-4 mt-2">
                                                        {product.externalLinks?.website && (
                                                            <a
                                                                href={product.externalLinks.website}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                            >
                                                                <FaGlobe className="text-lg" />
                                                            </a>
                                                        )}
                                                        {product.externalLinks?.github && (
                                                            <a
                                                                href={product.externalLinks.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                            >
                                                                <FaGithub className="text-lg" />
                                                            </a>
                                                        )}
                                                        {product.externalLinks?.twitter && (
                                                            <a
                                                                href={product.externalLinks.twitter}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                                                            >
                                                                <FaTwitter className="text-lg" />
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons - Full width on mobile */}
                                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleUpvote}
                                                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-600/20 transition-all"
                                                disabled={loading}
                                            >
                                                <FaThumbsUp className="mr-2" />
                                                <span className="mr-2">Upvote</span>
                                                <span className="font-semibold">({product.upvoteCounts})</span>
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleReport}
                                                className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-full bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-100 dark:hover:bg-red-800/50 shadow-lg shadow-red-600/10 transition-all"
                                                disabled={loading}
                                            >
                                                <FaExclamationTriangle className="mr-2" />
                                                Report
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4 sm:p-8"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
                        Customer Reviews
                    </h2>
                    <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                        <div className="lg:w-2/3">
                            {reviews.length === 0 ? (
                                <div className="text-center py-8 sm:py-12">
                                    <FaStar className="mx-auto text-4xl text-gray-400 dark:text-gray-600 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-lg">No reviews yet. Be the first to review!</p>
                                </div>
                            ) : (
                                <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                                    <AnimatePresence>
                                        {reviews.map((review) => (
                                            <motion.div
                                                key={review._id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="p-4 sm:p-6 rounded-2xl bg-gray-50 dark:bg-gray-700/50"
                                            >
                                                <div className="flex items-start gap-3 sm:gap-4">
                                                    <img
                                                        src={review.image || "/placeholder.svg"}
                                                        alt={review.name}
                                                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-white dark:ring-gray-800"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                                                                {review.name}
                                                            </h3>
                                                            {(user?.email === review.email || isAdmin) && (
                                                                <button
                                                                    onClick={() => handleDeleteReview(review._id)}
                                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center mt-1 mb-2">
                                                            {[...Array(5)].map((_, index) => (
                                                                <FaStar
                                                                    key={index}
                                                                    className={
                                                                        index < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                                                                    }
                                                                />
                                                            ))}
                                                        </div>
                                                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
                                                            {review.review}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        <div className="lg:w-1/3">
                            {user && (
                                <div className="sticky top-8">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                                        Write a Review
                                    </h3>
                                    <form onSubmit={handlePostReview}>
                                        <div className="mb-4 sm:mb-6">
                                            <label
                                                htmlFor="comment"
                                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                            >
                                                Your Review
                                            </label>
                                            <textarea
                                                id="comment"
                                                name="comment"
                                                rows="4"
                                                className="w-full px-3 py-2 rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none"
                                                placeholder="Share your thoughts about this product..."
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-4 sm:mb-6">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, index) => {
                                                    const starValue = index + 1
                                                    return (
                                                        <button
                                                            type="button"
                                                            key={starValue}
                                                            onClick={() => setRating(starValue)}
                                                            onMouseEnter={() => setHover(starValue)}
                                                            onMouseLeave={() => setHover(null)}
                                                            className="p-1"
                                                        >
                                                            <FaStar
                                                                className={`text-xl sm:text-2xl transition-colors ${starValue <= (hover || rating)
                                                                    ? "text-yellow-400"
                                                                    : "text-gray-300 dark:text-gray-600"
                                                                    }`}
                                                            />
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            className="inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg shadow-indigo-600/20 transition-all"
                                            disabled={loading}
                                        >
                                            <FaStar className="mr-2" />
                                            Post Review
                                        </motion.button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

