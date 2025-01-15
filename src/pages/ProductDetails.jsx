import React, { useContext, useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { AppContext } from '../context/AppContext';
import { AwesomeButton } from 'react-awesome-button';
import AxiosPublic from '../context/AxiosPublic';
import { useParams } from 'react-router';
import { IoIosAlert } from "react-icons/io";
import { FaCaretUp } from "react-icons/fa6";
export default function ProductDetails() {
    const AxiosLink = AxiosPublic()
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const { user } = useContext(AppContext)
    useEffect(() => {
        AxiosLink.get(`/product/${id}`)
            .then(res => setProduct(res.data))

    }, [])
    const reviews = [
        {
            id: 1,
            author: 'John Doe',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 5,
            comment: 'Great product! Exactly what I was looking for.',
            date: '2 days ago'
        },
        {
            id: 2,
            author: 'Jane Smith',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 4,
            comment: 'Good quality but shipping took longer than expected.',
            date: '1 week ago'
        }
    ]

    return (
        <div className="px-4 py-8">
            <div className="grid mt-14 grid-cols-1  md:items-start lg:items-center md:grid-cols-2 gap-8">
                <Carousel>
                    {product.images?.map(image => (<div className='w-full'>
                        <img className='object-cover' src={image} />
                    </div>))}

                </Carousel>
                {/* Product Info */}
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
                            <AwesomeButton
                                type="secondary"
                            >
                                <span><FaCaretUp /></span>
                                <span className='ml-2'>Upvote ({product.upvoteCounts})</span>
                            </AwesomeButton>

                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>

                {/* Post Review */}
                <div className='flex flex-col-reverse justify-between md:flex-row gap-5'>
                    <div className="space-y-6 basis-1/2">
                        {reviews.map((review) => (
                            <div className=" relative bg-white dark:bg-gray-800 shadow-md rounded-xl flex sm:flex-row flex-col gap-[20px] p-4">
                                <div className="">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"
                                        alt="image"
                                        className="w-[50px] h-[50px] object-cover rounded-full"
                                    />
                                </div>
                                <div className="">
                                    <div>
                                        <h1 className="text-[1.4rem] font-bold leading-[24px]">Jhon Dee</h1>

                                    </div>
                                    <span className="text-[0.9rem] text-gray-400">UI/UX Designer</span>
                                    <p className="text-gray-500 mt-3 pr-10 text-[0.9rem]">UI is the saddle, the stirrups, & the reins. UX is
                                        the feeling you get being able to ride the horse.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50 w-full basis-1/2 dark:bg-gray-800 p-4 rounded-lg mb-8">
                        <div className="flex items-start gap-4">
                            <img
                                src={user ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium">{user.displayName}</span>
                                    <span className="font-medium"></span>
                                </div>
                                <textarea
                                    placeholder="Write a comment..."
                                    className="w-full resize-none p-3 rounded-lg border min-h-[100px] focus:ring-1 focus:ring-blue-500 focus:border-blue-500"

                                />
                                <div className="flex justify-end items-center mt-2">
                                    <AwesomeButton
                                        type="primary"
                                    >
                                        Post Review
                                    </AwesomeButton>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

