"use client"

import { useContext } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { AppContext } from "../context/AppContext"
import IsSubscription from "../hooks/IsSubscription"

const Pricing = () => {
    const [isSubscription] = IsSubscription()
    const navigate = useNavigate()
    const { user } = useContext(AppContext)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    }

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "/month",
            description: "Perfect for getting started",
            features: ["Add up to 1 product", "Basic analytics", "Email support"],
            buttonText: user && isSubscription ? "Premium Active" : user ? "Free Active" : "Get Started",
            isPopular: false,
            onClick: () => navigate("/login"),
            disabled: user,
        },
        {
            name: "Premium",
            price: "$29",
            period: "/month",
            description: "For growing businesses",
            features: ["Unlimited products", "Advanced analytics", "Priority support", "Custom branding", "API access"],
            buttonText: isSubscription ? "Premium Active" : "Upgrade to Premium",
            isPopular: true,
            onClick: () => {
                user
                    ? navigate("/subscription")
                    : Swal.fire({
                        title: "Not Logged In",
                        text: "Please login to purchase membership",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#6366F1",
                        cancelButtonColor: "#EF4444",
                        confirmButtonText: "Login Now",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/login")
                        }
                    })
            },
            disabled: isSubscription,
        },
    ]

    return (
        <div className=" text-white mt-14 py-14 px-4 sm:px-6 lg:px-8">
            <motion.div className="max-w-5xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="text-center">
                    <h2 className="text-3xl text-gray-800 dark:text-white font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-4">
                        Choose Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Plan</span>
                    </h2>
                    <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 dark:text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
                        Unlock premium features and grow your business with our flexible pricing options.
                    </p>
                </motion.div>

                <motion.div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12" variants={containerVariants}>
                    {plans.map((plan, index) => (
                        <motion.div key={index} variants={itemVariants} className="relative">
                            <div
                                className={`h-full rounded-3xl p-8 ${plan.isPopular ? "bg-gradient-to-br from-indigo-600 to-purple-700" : "bg-gray-800"} transform transition-all duration-500  hover:shadow-2xl`}
                            >
                                {plan.isPopular && (
                                    <div className="absolute top-0 right-0 -mt-4 mr-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-pink-500 text-white">
                                            Most Popular
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                                <div className="flex items-baseline mb-6">
                                    <span className="text-5xl font-extrabold">{plan.price}</span>
                                    <span className="ml-1 text-2xl text-gray-400">{plan.period}</span>
                                </div>
                                <p className="text-gray-300 mb-6">{plan.description}</p>
                                <ul className="space-y-4 h-[11rem] mb-8">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <svg
                                                className="w-5 h-5 text-green-400 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={plan.onClick}
                                    disabled={plan.disabled}
                                    className={`w-full py-3 px-6 rounded-full text-lg font-semibold transition-all duration-300 ${plan.isPopular
                                        ? "bg-white text-indigo-600 hover:bg-gray-100"
                                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                >
                                    {plan.buttonText}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default Pricing

