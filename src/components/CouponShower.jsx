"use client"

import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import UseCoupons from "../hooks/UseCoupons"
import IsSubscription from "../hooks/IsSubscription"
import { NavLink } from "react-router"

const CouponShower = () => {
    const [coupons] = UseCoupons()
    const [activeIndex, setActiveIndex] = useState(0)
    const [isSubscription] = IsSubscription()

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b mt-20 from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-white">Unlock Exclusive Deals</h1>
            <p className="text-xl text-center mb-8 text-gray-600 dark:text-gray-300">
                Swipe through our special coupons and save big on your next subscription!
            </p>

            <div className="relative max-w-sm mx-auto">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {coupons.map((coupon, index) => (
                        <SwiperSlide key={coupon.code}>
                            <div
                                className={`relative overflow-hidden rounded-2xl shadow-lg ${index === activeIndex ? "scale-100" : "scale-90 opacity-80"
                                    } transition-all duration-300 ease-in-out`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-white dark:from-gray-800 dark:to-gray-700" />
                                <div className="relative p-6 flex flex-col justify-between h-[400px]">
                                    <div className="text-right">
                                        <span className="inline-block bg-yellow-400 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                            {coupon.percent}% OFF
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{coupon.code}</h2>
                                        <p className="text-lg text-gray-600 dark:text-gray-300">{coupon.description}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                                        </div>
                                        <NavLink to={isSubscription ? "" : "/subscription"}>
                                            <button disabled={isSubscription} className="px-4 btn py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                                                {isSubscription ? "Purchased" : "Apply"}
                                            </button>
                                        </NavLink>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 rotate-90">
                                    <div className="text-9xl font-extrabold text-gray-200 dark:text-gray-700 opacity-50">
                                        {coupon.percent}%
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default CouponShower

