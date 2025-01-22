import React, { useContext } from 'react'
import PageStarter from '../hooks/PageStarter'
import { useNavigate } from 'react-router'
import IsSubscription from '../hooks/IsSubscription'
import { AppContext } from '../context/AppContext'
import Swal from 'sweetalert2'


const Pricing = () => {
    const [isSubscription] = IsSubscription()
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    return (
        <div className='mt-10'>
            <PageStarter title="Membership Options" subTitle="Choose the perfect plan for your business" />
            <div className="py-12 px-4 mt-5 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="relative bg-gray-800 rounded-2xl p-8 shadow-xl transition-transform duration-300 hover:scale-105 border border-gray-700">
                            <div className="absolute -top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-full text-sm text-white">
                                FREE
                            </div>
                            <div className="mb-8">
                                <div className="flex items-baseline">
                                    <span className="text-5xl font-bold text-white">$0</span>
                                    <span className="text-gray-400 ml-2">/month</span>
                                </div>
                                <p className="text-gray-400 mt-4">Perfect for getting started</p>
                            </div>
                            <ul className="space-y-4 h-[12rem] mb-8">
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Add up to 1 product
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Basic analytics
                                </li>
                                <li className="flex items-center text-gray-300">
                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Email support
                                </li>
                            </ul>

                            <button disabled={user ? true : false} onClick={() => {
                                navigate("/login")
                            }} className="w-full py-3 px-6 btn rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
                                {user && isSubscription ? "Premium Membership Running" : user ? "Free Membership Running" : "Get Started"}
                            </button>
                        </div>
                        <div className="relative bg-gradient-to-b from-purple-600 to-purple-800 rounded-2xl p-8 shadow-xl transition-transform duration-300 hover:scale-105">
                            <div className="absolute -top-4 left-4 bg-gradient-to-r from-yellow-500 to-pink-500 px-3 py-1 rounded-full text-sm text-white">
                                PREMIUM
                            </div>
                            <div className="mb-8">
                                <div className="flex items-baseline">
                                    <span className="text-5xl font-bold text-white">$29</span>
                                    <span className="text-gray-200 ml-2">/month</span>
                                </div>
                                <p className="text-gray-200 mt-4">For growing businesses</p>
                            </div>

                            <ul className="space-y-4 mb-8  h-[12rem]">
                                <li className="flex items-center text-gray-100">
                                    <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Unlimited products
                                </li>
                                <li className="flex items-center text-gray-100">
                                    <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Advanced analytics
                                </li>
                                <li className="flex items-center text-gray-100">
                                    <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Priority support
                                </li>
                                <li className="flex items-center text-gray-100">
                                    <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Custom branding
                                </li>
                                <li className="flex items-center text-gray-100">
                                    <svg className="w-5 h-5 text-yellow-300 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    API access
                                </li>
                            </ul>

                            <button disabled={isSubscription} onClick={() => {
                                user ? navigate("/subscription") : Swal.fire({
                                    title: "Are you logged in?",
                                    text: "Please Login to purchase membership",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, Login!"
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        navigate("/login")
                                    }
                                });
                            }} className="w-full btn py-3 px-6 rounded-lg bg-gradient-to-r from-yellow-500 to-pink-500 text-white font-medium hover:opacity-90 transition-opacity">
                                {isSubscription ? "Premium Membership Running" : "Upgrade to Premium"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing