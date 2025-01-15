import React, { useContext, useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { AppContext } from '../context/AppContext';
import { AwesomeButton } from 'react-awesome-button';
import AxiosPublic from '../context/AxiosPublic';
import { useParams } from 'react-router';
import { IoIosAlert } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa6";
import { ReactTyped } from "react-typed";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
export default function ProductDetails() {
    const AxiosLink = AxiosPublic()
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const { user } = useContext(AppContext)
    //fetch single product details
    const { data: product = [], refetch: singleRefetched } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            const res = await AxiosLink.get(`/product/${id}`)
            return res.data
        }
    })
    //upvote counts incrementation
    const handleUpvote = async (id) => {
        try {
            setLoading(true)
            await AxiosLink.patch(`product/${id}`)
                .then(res => {
                    Swal.fire({
                        title: "Upvoted",
                        text: `You have upvoted ${product.name}`,
                        icon: "success"
                    });
                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            singleRefetched()
        }
    }
    //reviews fecthed
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await AxiosLink.get(`/reviews/${id}`)
            return res.data
        }
    })
    //handle post reviews
    const handlePostReview = async event => {
        event.preventDefault()
        const e = event.target
        const textArea = e.comment.value
        try {
            setLoading(true)
            const postedReviews = {
                id: product._id,
                name: user.displayName,
                image: user.photoURL,
                rating: rating,
                email: user.email,
                review: textArea
            }
            await AxiosLink.post("/post-reviews", postedReviews)
                .then(res => {
                    Swal.fire({
                        title: "Posted",
                        text: "Your Review has been Posted",
                        icon: "success"
                    });

                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
            refetch()
        }

    }
    //handle delete reviews
    const handleDelete = async (id) => {
        try {
            setLoading(true)
            await AxiosLink.delete(`/review/${id}`)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your review has been deleted.",
                        icon: "success"
                    });
                    refetch()
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <div className="grid mt-14 grid-cols-1  md:items-start lg:items-center md:grid-cols-2 gap-8">
                <Carousel>
                    {product.images?.map(image => (<div className='w-full'>
                        <img className='object-cover' src={image} />
                    </div>))}

                </Carousel>
                <Helmet>
                    <title>{`TechBook | ${product.name}`}</title>
                </Helmet>
                <div className="space-y-6 lg:px-20">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-bold uppercase">{product.speciality}</span>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium mb-2">External Links</h3>
                            <ul>
                                <li>
                                    Website: {product.externalLinks?.website ? (<a className='underline text-blue-400' href={product.externalLinks?.website} target='_blank'>{product.externalLinks?.website}</a>) : ("Not Available Now")}
                                </li>
                                <li>
                                    Github: {product.externalLinks?.github ? (<a className='underline text-blue-400' href={product.externalLinks?.github} target='_blank'>{product.externalLinks?.github}</a>) : ("Not Available Now")}
                                </li>
                                <li>
                                    Twitter: {product.externalLinks?.twitter ? (<a className='underline text-blue-400' href={product.externalLinks?.twitter} target='_blank'>{product.externalLinks?.twitter}</a>) : ("Not Available Now")}
                                </li>
                            </ul>
                        </div>
                        <div className="flex gap-4">
                            <AwesomeButton
                                type="danger"
                            >
                                <span><IoIosAlert /></span>
                                <span className='ml-2'>Report</span>
                            </AwesomeButton>
                            <button onClick={() => handleUpvote(product._id)}>
                                <AwesomeButton
                                    type="secondary"
                                >
                                    <span><FaCaretUp /></span>
                                    <span className='ml-2'>Upvote ({product.upvoteCounts})</span>
                                </AwesomeButton>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
                <div className='flex flex-col justify-between md:flex-row gap-5'>
                    {reviews.length === 0 ? (<div><p> <ReactTyped strings={["No Reviews to show...."]} typeSpeed={40}
                        backSpeed={50} /></p></div>) : (<div className="space-y-6 basis-1/2">
                            {reviews.reverse().map((review) => (
                                <div className=" relative bg-white dark:bg-gray-800 shadow-md rounded-xl flex sm:flex-row flex-col gap-[20px] p-4">
                                    <div className="basis-[10%] flex justify-between">
                                        <img
                                            src={review.image}
                                            alt="image"
                                            className="w-[50px] h-[50px] object-cover rounded-full"
                                        />
                                        <button onClick={() => handleDelete(review._id)} className={`w-10 h-10 p-2 sm:hidden ${review.email === user.email ? "block" : "hidden"} rounded-full bg-white dark:bg-gray-700`}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-600">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>
                                        </button>
                                    </div>
                                    <div className="basis-[90%]">
                                        <div>
                                            <div className='flex justify-between sm:items-center'>
                                                <h1 className="text-[1.4rem] font-bold leading-[24px]">{review.name}</h1>
                                                <button onClick={() => handleDelete(review._id)} className={`w-10 p-2 hidden ${user.email === review.email ? "sm:block" : "sm:hidden"} rounded-full bg-white dark:bg-gray-700`}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-600">
                                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                </svg>
                                                </button>
                                            </div>
                                            <span className="text-[0.9rem] text-gray-400">
                                                <ReactStars
                                                    count={5}
                                                    value={review.rating}
                                                    edit={false}
                                                    size={24}
                                                    activeColor="#ffd700"
                                                />
                                            </span>
                                        </div>
                                        <span className="text-[0.9rem] text-gray-400">{review.email}</span>
                                        <p className="text-gray-500 mt-3 pr-10 text-[0.9rem]">{review.review}</p>
                                    </div>
                                </div>
                            ))}
                        </div>)}
                    <div className="bg-gray-50 w-full basis-1/2 dark:bg-gray-800 p-4 rounded-lg mb-8">
                        <div className="flex items-start gap-4">
                            <img
                                src={user ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <form onSubmit={handlePostReview}>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium">{user.displayName}</span>
                                        <span className="font-medium"></span>
                                    </div>
                                    <textarea required
                                        name='comment'
                                        placeholder="Write a comment..."
                                        className="w-full resize-none p-3 rounded-lg border min-h-[100px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500"

                                    />
                                    <p className='font-semibold mt-3 mb-2'>Rating:</p>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, index) => {
                                            const starRating = index + 1;
                                            return (
                                                <FaStar
                                                    key={starRating}
                                                    className={`cursor-pointer ${starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                                        }`}
                                                    size={24}
                                                    onClick={() => setRating(starRating)}
                                                    onMouseEnter={() => setHover(starRating)}
                                                    onMouseLeave={() => setHover(null)}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="flex justify-end items-center mt-2">
                                        <button type='submit'>
                                            <AwesomeButton
                                                type="primary"
                                            >
                                                Post Review
                                            </AwesomeButton>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

