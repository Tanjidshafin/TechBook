import React, { useContext, useState } from 'react'
import PageStarter from '../hooks/PageStarter'
import UseProductsTrending from '../hooks/UseProductsTrending'
import { NavLink, useNavigate } from 'react-router'
import { AwesomeButton } from 'react-awesome-button'
import AxiosPublic from '../context/AxiosPublic'
import Swal from 'sweetalert2'
import noData from "../assets/No_ data.json"
import Lottie from 'lottie-react'
import { AppContext } from '../context/AppContext'
import { MdDoNotDisturbAlt } from "react-icons/md";
import { motion } from "framer-motion";
const Trending = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const [Trendingproducts, refetch] = UseProductsTrending()
    const AxiosLink = AxiosPublic()
    const [loading, setLoading] = useState(false)
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
    // card aniamtion
    const containerVariants = {
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
        hidden: { opacity: 0 },
    };
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };
    return (
        <div className='mt-20 px-4 sm:px-6 lg:px-8'>
            <PageStarter title="Trending Products" subTitle="Discover top-rated tech innovations in our Featured Products section. Explore cutting-edge tools, software, and apps handpicked for you." />
            {Trendingproducts.length === 0 ? (<div>
                <div
                    className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
                    <Lottie animationData={noData} loop={true} className='w-[200px]' />
                    <h1 className="text-[1.4rem] mt-6 font-[500] text-black dark:text-gray-300">No Products to Show...</h1>
                    <p className="text-[0.9rem] text-gray-500">Be the first to add the first product.</p>
                </div>
            </div>) : (<motion.div initial="hidden"
                animate="visible"
                variants={containerVariants} className='mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {Trendingproducts.map((product) => (
                    <motion.a key={product._id} variants={cardVariants}
                        transition={{ duration: 0.5, ease: "easeOut" }} className="group shadow-2xl rounded-xl py-4 px-3 block">
                        <img
                            src={product.mainImage ? product.mainImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa9oh_xT4XzP_RhI_kwLBe6fOprEig0e76jQ&s"}
                            alt=""
                            className="w-full rounded-sm h-[200px] object-cover md:h-[350px] sm:h-[300px]"
                        />

                        <div className="pt-3 flex justify-between text-sm">
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
                                    {user?.email === product.email ? (<MdDoNotDisturbAlt className='dark:text-gray-400' onClick={() => {
                                        Swal.fire({
                                            title: "Cant Upvote",
                                            text: "You Cant upvote your own posted product!!!",
                                            icon: "warning"
                                        });
                                    }} />) : (<button onClick={() => handleUpvote(product._id, product.name)} className="text-gray-600 hover:text-blue-500">▲</button>)}
                                    <span className="font-medium cursor-pointer dark:text-gray-400">{product.upvoteCounts}</span>
                                </button>
                            </p>
                        </div>
                    </motion.a>
                ))}
            </motion.div>)
            }
            <NavLink to="/products" className="flex justify-center md:justify-end mt-5">
                <AwesomeButton type="secondary">All Products</AwesomeButton>
            </NavLink>
        </div>
    )
}

export default Trending