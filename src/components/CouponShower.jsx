import React from 'react'
import PageStarter from '../hooks/PageStarter'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import UseCoupons from '../hooks/UseCoupons';
const CouponShower = () => {
    const [coupons] = UseCoupons()
    return (
        <div>
            <header className='mt-10 px-4 sm:px-6 lg:px-8'>
                <PageStarter title="Unlock Great Deals with Our Coupons!" subTitle='Browse our exclusive coupons and save big on your next subscription. Apply the codes at checkout to enjoy special discounts!' />
            </header>
            <Swiper className='mt-10'>
                {coupons.map(coupon => (<SwiperSlide className='mx-auto bg-gradient-to-r from-purple-600 to-indigo-600 shadow-2xl'>
                    <div className="flex flex-col justify-center text-center items-center h-[400px] p-6 text-white">
                        <div className="text-4xl font-bold mb-2">{coupon.code}</div>
                        <div className="text-2xl font-semibold mb-2">{coupon.percent}% OFF</div>
                        <div className="text-lg text-center mb-2">{coupon.description}</div>
                        <div className="text-sm">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</div>
                    </div>
                </SwiperSlide>))}
            </Swiper>
        </div>
    )
}

export default CouponShower