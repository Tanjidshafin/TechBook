import React from 'react'
import PageStarter from '../hooks/PageStarter'
import UseProducts from '../hooks/UseProducts'
import { AwesomeButton } from "react-awesome-button";
import { NavLink } from 'react-router';
const Featured = () => {
    const [products] = UseProducts();
    const FeaturedProducts = products
        .filter(product => product?.speciality === "featured")
        .sort((a, b) => {
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
    return (
        <div className='mt-20 px-4 sm:px-6 lg:px-8'>
            <PageStarter title="Featured Products" subTitle="Discover top-rated tech innovations in our Featured Products section. Explore cutting-edge tools, software, and apps handpicked for you." />
            <div className='mt-5 md:grid md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                    FeaturedProducts.map(product => (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl max-w-sm">
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt=""
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute uppercase top-0 right-0 bg-yellow-400 text-indigo-900 font-bold px-2 py-1 m-2 rounded-full text-xs">
                                    {product.speciality}
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-400 text-sm mb-2 line-clamp-2">Posted on: {product.time}</p>
                                <NavLink to={`/product/${product._id}`} className="text-xl font-bold text-indigo-700 truncate">{product.name}</NavLink>
                                <div className='flex flex-col mt-4 justify-between'>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {product.tags.map(tag => (<span

                                            className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                        >
                                            {tag}
                                        </span>))}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <button

                                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                                        >
                                            ▲ Upvote
                                        </button>
                                        <span className="text-indigo-600 font-bold text-xl">{product.upvoteCounts}</span>

                                    </div>
                                </div>
                            </div>
                        </div>

                    ))
                }
            </div>
            <NavLink className="flex justify-center md:justify-end mt-5">
                <AwesomeButton type="secondary">All Products</AwesomeButton>
            </NavLink>
        </div>
    )
}

export default Featured