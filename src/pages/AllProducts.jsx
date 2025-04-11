"use client"

import { useContext, useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router"
import { AppContext } from "../context/AppContext"
import Swal from "sweetalert2"
import AxiosPublic from "../context/AxiosPublic"
import { IoSearch, IoGrid, IoList } from "react-icons/io5"
import { useQuery } from "@tanstack/react-query"
import Lottie from "lottie-react"
import noData from "../assets/No_ data.json"
import { motion, AnimatePresence } from "framer-motion"
import { FiArrowUp } from "react-icons/fi"

const AllProducts = () => {
    const { user, total } = useContext(AppContext)
    const AxiosLink = AxiosPublic()
    const [search, setSearch] = useState("")
    const [sortOrder, setSortOrder] = useState("newest")
    const [filterCategory, setFilterCategory] = useState("all")
    const [viewMode, setViewMode] = useState("grid")
    const navigate = useNavigate()
    const [pageNumber, setPageNumber] = useState(0)
    const productsPerPage = 8
    const {
        data: products = [],
        isFetching,
        refetch,
    } = useQuery({
        queryKey: ["products", pageNumber, search, sortOrder, filterCategory],
        queryFn: async () => {
            const res = await AxiosLink.get(
                `/products/accepted?sort=${sortOrder}&search=${search}&category=${filterCategory}&page=${pageNumber}&limit=${productsPerPage}`,
            )
            return res.data
        },
        keepPreviousData: true,
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const page = Math.ceil(total / productsPerPage)

    const handleSearch = (e) => {
        e.preventDefault()
        setSearch(e.target.search.value)
        setPageNumber(0)
    }

    const handleUpvote = async (id, name) => {
        if (!user) {
            Swal.fire({
                title: "You are not logged in!",
                text: "Please Login to Interact",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Page",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login")
                }
            })
        } else {
            try {
                await AxiosLink.patch(`product/${id}`)
                Swal.fire({
                    title: "Upvoted",
                    text: `You have upvoted ${name}`,
                    icon: "success",
                })
                refetch()
            } catch (error) {
                console.error(error)
                Swal.fire({
                    title: "Error",
                    text: "Failed to upvote. Please try again.",
                    icon: "error",
                })
            }
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    }

    const CardSkeleton = () => (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
        </div>
    )

    const NoProductsView = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
            <Lottie animationData={noData} loop={true} className="w-64 h-64" />
            <h3 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">No Products Found</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
        </motion.div>
    )

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <section className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/6.jpg)] bg-cover bg-center bg-fixed bg-no-repeat">
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
                    <div className="max-w-xl text-center sm:text-left">
                        <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                            Discover
                            <strong className="block font-extrabold text-blue-500">Innovative Tech</strong>
                        </h1>
                        <p className="mt-4 max-w-lg sm:text-xl/relaxed text-gray-300">
                            Explore cutting-edge projects and vote for your favorites.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <NavLink
                                to="/"
                                className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                            >
                                Home
                            </NavLink>
                            {user ? (
                                <NavLink
                                    to="/dashboard/my-products"
                                    className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                                >
                                    Dashboard
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/signup"
                                    className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                                >
                                    Get Started
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-screen-xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Innovative Tech Projects</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Explore a curated collection of the latest tech projects shared by creators worldwide.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <form onSubmit={handleSearch} className="w-full md:w-96">
                        <div className="relative">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search projects..."
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                            <button
                                type="submit"
                                className="absolute inset-y-0 right-0 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                <IoSearch className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    <div className="flex items-center flex-wrap gap-3">
                        <select
                            className="p-2 text-sm border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="desc">Most Upvotes</option>
                            <option value="asc">Least Upvotes</option>
                        </select>

                        <select
                            className="p-2 text-sm border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="ai">AI & Machine Learning</option>
                            <option value="web">Web Development</option>
                            <option value="mobile">Mobile Apps</option>
                            <option value="iot">IoT & Hardware</option>
                            <option value="game">Game Development</option>
                        </select>

                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                        >
                            <IoGrid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"}`}
                        >
                            <IoList className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {isFetching ? (
                    <div
                        className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-8`}
                    >
                        {[...Array(8)].map((_, index) => (
                            <CardSkeleton key={index} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <NoProductsView />
                ) : viewMode === "grid" ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {products.map((product) => (
                                <motion.div
                                    key={product._id}
                                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
                                    variants={itemVariants}
                                    layout
                                >
                                    <img
                                        src={product.mainImage || "https://via.placeholder.com/300x200"}
                                        alt={product.name}
                                        className="w-full h-48 object-contain"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold h-[3.5rem] text-gray-900 dark:text-white mb-2">
                                            <NavLink to={`/product/${product._id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                                                {product.name}
                                            </NavLink>
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description.slice(0, 50)}...</p>
                                        <div>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {product.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <motion.button
                                                whileHover={{ scale: !(user?.email === product.email) && user ? 1.05 : 1 }}
                                                whileTap={{ scale: !(user?.email === product.email) && user ? 0.95 : 1 }}
                                                className={`flex items-center space-x-1 px-3 py-1 rounded-full 
                                                ${(user?.email === product.email) || !user
                                                        ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed opacity-50"
                                                        : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                                                    }`}
                                                onClick={() => !(user?.email === product.email) && user && handleUpvote(product._id, product.name)}
                                                disabled={(user?.email === product.email) || !user}
                                            >
                                                <FiArrowUp className="text-white" />
                                                <span className="text-white font-medium">{product.upvoteCounts}</span>
                                            </motion.button>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{product.time}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <motion.div className="overflow-x-auto" variants={containerVariants} initial="hidden" animate="visible">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Speciality
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tags
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Upvotes
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Time
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {products.map((product) => (
                                        <motion.tr
                                            key={product._id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            variants={itemVariants}
                                            layout
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <NavLink
                                                    to={`/product/${product._id}`}
                                                    className="hover:text-blue-600 dark:hover:text-blue-400"
                                                >
                                                    {product.name}
                                                </NavLink>
                                            </th>
                                            <td className="px-6 py-4 uppercase">{product.speciality}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {product.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">{product.upvoteCounts}</td>
                                            <td className="px-6 py-4">{product.time}</td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleUpvote(product._id, product.name)}
                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    disabled={user?.email === product.email}
                                                >
                                                    Upvote
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </motion.div>
                )}

                {products.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                onClick={() => setPageNumber(Math.max(0, pageNumber - 1))}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:bg-gray-900 dark:border-gray-700 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            {[...Array(page).keys()].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setPageNumber(num)}
                                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
      ${pageNumber === num
                                            ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 dark:bg-indigo-500 dark:border-indigo-400 dark:text-white"
                                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                        }`}
                                >
                                    {num + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setPageNumber(Math.min(page - 1, pageNumber + 1))}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border dark:bg-gray-900 dark:border-gray-700 border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllProducts

