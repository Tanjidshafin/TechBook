"use client"

import { useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "animate.css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import { Pagination, Autoplay, EffectFade } from "swiper/modules"

const Banner = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const parallaxElements = document.querySelectorAll(".parallax-element")
            parallaxElements.forEach((element) => {
                const speed = element.getAttribute("data-speed") || 0.05
                const x = (window.innerWidth - e.pageX * speed) / 100
                const y = (window.innerHeight - e.pageY * speed) / 100
                element.style.transform = `translateX(${x}px) translateY(${y}px)`
            })
        }

        document.addEventListener("mousemove", handleMouseMove)
        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return (
        <div className="banner-container relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-purple-300 to-pink-200 opacity-20 blur-xl"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-300 to-teal-200 opacity-20 blur-xl"></div>
                <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-yellow-300 to-orange-200 opacity-20 blur-xl"></div>
            </div>

            <Swiper
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                effect={"fade"}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                modules={[Pagination, Autoplay, EffectFade]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="h-[900px] relative flex flex-col px-4 sm:px-6 lg:px-8 justify-center items-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 z-0">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-full h-full">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute rounded-full"
                                            style={{
                                                top: `${Math.random() * 100}%`,
                                                left: `${Math.random() * 100}%`,
                                                width: `${Math.random() * 300 + 50}px`,
                                                height: `${Math.random() * 300 + 50}px`,
                                                background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                                                animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out`,
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto h-full py-12">
                            <div className="text-left md:w-1/2 animate__animated animate__fadeInLeft animate__delay-1s">
                                <div className="relative">
                                    <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-900 uppercase bg-indigo-100 rounded-full">
                                        Premium Access
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-6xl text-white font-bold leading-tight mb-6">
                                        Paid Membership Opportunities
                                    </h2>
                                    <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 mb-6"></div>
                                    <p className="text-indigo-100 text-base md:text-lg mb-8 max-w-xl">
                                        "Unlock exclusive access to premium tech tools, early product launches, priority reviews, and
                                        advanced features with our paid membership. Enhance your experience and stay ahead in the world of
                                        innovative technology!"
                                    </p>
                                    <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        Join Now
                                    </button>
                                </div>
                            </div>
                            <div className="md:w-1/2 relative animate__animated animate__fadeInRight animate__delay-1s">
                                <div className="relative">
                                    <div
                                        className="absolute -top-10 -left-10 w-40 h-40 border-2 border-indigo-300 opacity-20 rounded-full parallax-element"
                                        data-speed="0.03"
                                    ></div>
                                    <div
                                        className="absolute -bottom-5 -right-5 w-28 h-28 border-2 border-pink-300 opacity-20 rounded-full parallax-element"
                                        data-speed="0.05"
                                    ></div>
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/30 to-indigo-500/30 mix-blend-overlay"></div>
                                        <img
                                            src="https://optimize.qodeinteractive.com/wp-content/uploads/2015/12/home-3-slider-layer-1.png"
                                            alt="Premium membership"
                                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div
                                        className="absolute -top-5 -right-5 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg opacity-80 blur-sm parallax-element"
                                        data-speed="0.08"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="h-[900px] relative flex flex-col px-4 sm:px-6 lg:px-8 justify-center items-center overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-600 to-emerald-700 z-0">
                            <div className="absolute inset-0 opacity-10">
                                <svg className="absolute h-full w-full" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row-reverse items-center justify-between w-full max-w-7xl mx-auto h-full py-12">
                            <div className="text-right md:w-1/2 animate__animated animate__fadeInRight animate__delay-1s">
                                <div className="relative">
                                    <span className="inline-block px-4 py-1 mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase bg-teal-100 rounded-full">
                                        Connect & Share
                                    </span>
                                    <h2 className="text-3xl md:text-4xl lg:text-6xl text-white font-bold leading-tight mb-6">
                                        Social Networks
                                    </h2>
                                    <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mb-6 ml-auto"></div>
                                    <p className="text-teal-100 text-base md:text-lg mb-8 max-w-xl ml-auto">
                                        "Connect, share, and grow with our vibrant social network. Discover like-minded individuals,
                                        exchange ideas, and stay updated on trends. Build meaningful connections and expand your digital
                                        community effortlessly."
                                    </p>
                                    <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
                                        Join Community
                                    </button>
                                </div>
                            </div>
                            <div className="md:w-1/2 relative animate__animated animate__fadeInLeft animate__delay-1s">
                                <div className="relative">
                                    <div
                                        className="absolute -top-10 -right-10 w-40 h-40 border-2 border-teal-300 opacity-20 rounded-full parallax-element"
                                        data-speed="0.03"
                                    ></div>
                                    <div
                                        className="absolute -bottom-5 -left-5 w-28 h-28 border-2 border-emerald-300 opacity-20 rounded-full parallax-element"
                                        data-speed="0.05"
                                    ></div>
                                    <div className="relative overflow-hidden rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-teal-500/30 mix-blend-overlay"></div>
                                        <img
                                            src="https://optimize.qodeinteractive.com/wp-content/uploads/2015/12/home-3-slider-layer-1.png"
                                            alt="Social networks"
                                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                    <div
                                        className="absolute -top-5 -left-5 w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg opacity-80 blur-sm parallax-element"
                                        data-speed="0.08"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Banner
