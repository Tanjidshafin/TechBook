import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'animate.css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Banner = () => {
    return (

        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
            <SwiperSlide>
                <div className='h-[900px] bg-teal-500 flex flex-col justify-center gap-10 md:justify-between items-center '>
                    <div className='text-center mt-24 animate__animated animate__fadeInDown'>
                        <p className='uppercase text-2xl  md:text-3xl lg:text-5xl text-white font-semibold'>Paid Membership Opportunities</p>
                        <p className='text-gray-300 text-sm md:text-md px-5 mt-5 max-w-[50rem] mx-auto'>"Unlock exclusive access to premium tech tools, early product launches, priority reviews, and advanced features with our paid membership. Enhance your experience and stay ahead in the world of innovative technology!"</p>
                    </div>
                    <div className='animate__animated animate__fadeInUp'>
                        <img src="https://optimize.qodeinteractive.com/wp-content/uploads/2015/12/home-3-slider-layer-1.png" alt="" />
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='h-[900px] bg-gray-600 flex flex-col justify-center gap-10 md:justify-between items-center '>
                    <div className='text-center mt-24 animate__animated animate__fadeInDown '>
                        <p className='uppercase text-2xl  md:text-3xl lg:text-5xl text-white font-semibold'>Social Networks</p>
                        <p className='text-gray-300 text-sm md:text-md px-5 mt-5 max-w-[50rem] mx-auto'>"Connect, share, and grow with our vibrant social network. Discover like-minded individuals, exchange ideas, and stay updated on trends. Build meaningful connections and expand your digital community effortlessly."</p>
                    </div>
                    <div className='animate__animated animate__fadeInUp'>
                        <img src="https://optimize.qodeinteractive.com/wp-content/uploads/2015/12/home-3-slider-layer-1.png" alt="" />
                    </div>
                </div>
            </SwiperSlide>

        </Swiper>


    )
}

export default Banner