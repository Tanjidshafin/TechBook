import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'
import Swal from 'sweetalert2'
import AxiosPublic from '../context/AxiosPublic'
import { MdDoNotDisturbAlt } from "react-icons/md";
import UseAcceptedProduct from '../hooks/UseAcceptedProduct'
import { IoSearch } from 'react-icons/io5';
const AllProducts = () => {
    const { user } = useContext(AppContext)
    const [acceptedProducts, acceptedProductRefetched] = UseAcceptedProduct()
    const AxiosLink = AxiosPublic()
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])
    const [sortOrder, setSortOrder] = useState("desc")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    //search from backend
    const handleSearch = e => {
        e.preventDefault()
        setSearch(e.target.search.value)
    }
    //pagination 
    const [pageNumber, setPageNumber] = useState(0)
    useEffect(() => {
        AxiosLink.get(`/products/accepted?sort=${sortOrder}&search=${search}&page=${pageNumber}&limit=${productsPerPage}`)
            .then(res => setProducts(res.data))
    }, [pageNumber, sortOrder, search])
    const productsPerPage = 8
    let page = 0
    if (!search) {
        page = Math.ceil(acceptedProducts.length / productsPerPage)
    } else {
        page = Math.ceil(products.length / productsPerPage)
    }
    const updatePageNumber = (num) => {
        if ((num > (page - 1)) || (0 > num)) { return setPageNumber(0) }
        setPageNumber(num)
        acceptedProductRefetched()
        refetch()
    }
    const updatedProducts = products.sort((a, b) => {
        const timeA = parseTime(a.time);
        const timeB = parseTime(b.time);
        return timeA - timeB;
    });
    function parseTime(timeStr) {
        if (!timeStr) return 0;
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes, seconds] = time.split(".").map(Number);
        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        } else if (modifier === "AM" && hours === 12) {
            hours = 0;
        }
        return hours * 3600 + minutes * 60 + seconds;
    }
    //upvote incrementation
    const handleUpvote = async (id, name) => {
        try {
            if (!user) {
                Swal.fire({
                    title: "You are not logged in!!!",
                    text: "Please Login to Interect",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Login Page"
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login")
                    }
                });
            } else {
                setLoading(true)
                await AxiosLink.patch(`product/${id}`)
                    .then(res => {
                        Swal.fire({
                            title: "Upvoted",
                            text: `You have upvoted ${name}`,
                            icon: "success"
                        });
                    })
                refetch()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className=' px-4 sm:px-6 lg:px-8'>
            <section
                className="relative bg-[url(https://htmldemo.net/boighor/boighor/images/bg/6.jpg)] bg-cover mb-10 bg-center bg-fixed bg-no-repeat"
            >
                <div className="bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

                <div className="mx-auto md:h-[30rem] justify-center items-center max-w-screen-xl px-4 py-32 sm:px-6 flex flex-col gap-5 lg:items-center lg:px-8">
                    <div className="max-w-xl flex justify-center items-center text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-2xl flex items-center text-gray-200 gap-3 font-extrabold sm:text-4xl">
                            ALL
                            <strong className="block font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-blue-500 to-[#1A365D]"> PRODUCTS </strong>
                        </h1>
                    </div>
                    <div className="text-white">
                        <p className="text-xl">
                            <span><NavLink to="/">Home</NavLink></span> / <span>{user ? (<NavLink to="/dashboard/my-products" className="text-blue-500">Dashboard</NavLink>) : (<NavLink to="/register" className="text-blue-500">Get Started</NavLink>)}</span>
                        </p>
                    </div>
                </div>
            </section>
            <header className="text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-400 sm:text-3xl">Discover Innovative Tech Projects</h2>

                <p className="mx-auto mt-4 max-w-5xl p-2 text-xs sm:text-sm md:text-md text-gray-500">
                    Explore a curated collection of the latest tech projects shared by creators worldwide. From cutting-edge AI tools to unique software solutions and exciting games, find inspiration, upvote your favorites, and leave your reviews. Join the community and be part of the innovation! Let me know if you’d like adjustments to match the tone or specifics of your platform. 😊
                </p>
            </header>
            <div className="mt-8 flex items-center justify-between">
                <div className="rounded border hidden md:flex border-gray-100">
                    <button
                        className="inline-flex size-10 items-center justify-center border-e text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                            />
                        </svg>
                    </button>

                    <button
                        className="inline-flex size-10 items-center justify-center text-gray-600 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                            />
                        </svg>
                    </button>
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4 w-full md:w-fit items-center">
                    <form onSubmit={handleSearch} className='w-full relative'>
                        <input type='text' name='search' placeholder='Search by tags'
                            className='border border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md' />
                        <button type='submit'
                            className='bg-gray-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group'><IoSearch
                                className='text-[1.3rem]  group-hover:text-gray-200' /></button>
                    </form>
                    <div className='flex items-start'>
                        <select
                            className="px-4 py-2 border rounded-lg"
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="desc">Highest Upvotes</option>
                            <option value="asc">Lowest Upvotes</option>
                        </select>
                    </div>
                </div>
            </div>
            <ul className="mt-4 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {updatedProducts.map((product) => (
                    <a key={product._id} className="group block">
                        <img
                            src={product.mainImage ? product.mainImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9oh_xT4XzP_RhI_kwLBe6fOprEig0e76jQ&s"}
                            alt=""
                            className="w-full object-cover sm:h-[450px]"
                        />

                        <div className="mt-3 flex justify-between text-sm">
                            <div>
                                <div>
                                    <NavLink to={`/product/${product._id}`} className="text-gray-900 dark:text-gray-400 group-hover:underline group-hover:underline-offset-4">
                                        {product.name}
                                    </NavLink>
                                    <p className="mt-1.5 text-pretty text-xs text-gray-500">
                                        {product.time}
                                    </p>
                                </div>

                                <div className='hidden sm:flex  flex-wrap gap-2'>
                                    {product.tags.map(tag => (<p className="mt-1.5 text-pretty text-xs text-gray-500">
                                        {tag}
                                    </p>))}
                                </div>
                            </div>

                            <p className="text-gray-900">
                                <button className="flex items-center gap-1">
                                    {user?.email === product.email ? (<MdDoNotDisturbAlt onClick={() => {
                                        Swal.fire({
                                            title: "Cant Upvote",
                                            text: "You Cant upvote your own posted product!!!",
                                            icon: "warning"
                                        });
                                    }} />) : (<button onClick={() => handleUpvote(product._id, product.name)} className="text-gray-600 hover:text-blue-500">▲</button>)}
                                    <span className="font-medium cursor-pointer">{product.upvoteCounts}</span>
                                </button>
                            </p>
                        </div>
                    </a>
                ))}
            </ul>
            <div className='flex justify-center mt-10 items-center gap-5 dark:bg-gray-800 bg-white p-2 shadow-lg rounded-md w-fit mx-auto select-none'>
                {/* left arrow */}
                <div onClick={() => { updatePageNumber(pageNumber - 1) }} className='text-[12px] cursor-pointer font-semibold px-1 py-1'>
                    PREV
                </div>
                <div className='flex justify-center items-center gap-2 '>
                    {[...Array(page).keys()].map((item, ind) => <div key={item} onClick={() => { setPageNumber(item) }} className={`cursor-pointer hover:scale-110  border-b-2  text-sm scale-100 transition-all duration-200 px-3 ${pageNumber === item ? 'border-sky-300' : 'border-white'}   font-semibold text-gray-700 dark:text-gray-400    py-[6px] `} >
                        {item + 1}
                    </div>)}
                </div>
                {/* right arrow */}
                <div onClick={() => { updatePageNumber(pageNumber + 1) }} className='text-[12px] cursor-pointer font-semibold px-1 py-1'>
                    NEXT
                </div>
            </div>
        </div>

    )
}

export default AllProducts