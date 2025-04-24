import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import IsSubscription from "../hooks/IsSubscription";
import AxiosPublic from "../context/AxiosPublic";
import { AppContext } from "../context/AppContext";
import UseCoupons from "../hooks/UseCoupons";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const SuccessConfetti = () => {
    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    initial={{
                        top: "50%",
                        left: "50%",
                        scale: 0,
                        backgroundColor: ["#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a"][Math.floor(Math.random() * 5)]
                    }}
                    animate={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        scale: [0, 1, 0.5],
                        y: [0, -100 - Math.random() * 500],
                        x: [0, (Math.random() - 0.5) * 500],
                        rotate: Math.random() * 360,
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        ease: "easeOut",
                        delay: Math.random() * 0.5,
                    }}
                />
            ))}
        </motion.div>
    );
};

const SuccessMessage = () => {
    return (
        <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
            >
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", damping: 10, delay: 0.2 }}
                        className="w-24 h-24 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-6"
                    >
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </motion.div>

                    <motion.h2
                        className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        Congratulations!
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-600 dark:text-gray-300 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        Your subscription has been activated successfully
                    </motion.p>

                    <motion.div
                        className="w-full bg-blue-100 dark:bg-blue-900/30 h-2 rounded-full overflow-hidden mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, delay: 0.6 }}
                    >
                        <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2, delay: 0.6 }}
                        />
                    </motion.div>

                    <motion.p
                        className="text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        Redirecting you to the dashboard...
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const CheckoutForm = () => {
    const [, subscriptionRefetched] = IsSubscription();
    const { user } = useContext(AppContext);
    const AxiosLink = AxiosPublic();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [price, setPrice] = useState(29);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [coupons] = UseCoupons();

    const applyCoupon = () => {
        const foundCoupon = coupons.find((c) => c.code === couponCode);
        if (foundCoupon) {
            const newPrice = price - (price * foundCoupon.percent) / 100;
            setPrice(newPrice.toFixed(2));
            setDiscount(foundCoupon.percent);
            setError("");
        } else {
            setError("Invalid coupon code");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const card = elements.getElement(CardElement);
        try {
            const { data: clientSecret } = await AxiosLink.post("/create-payment-intent", { amount: parseInt(price * 100) });
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (paymentResult.error) {
                setError(paymentResult.error.message);
            } else {
                setSuccess(true);
                await AxiosLink.post("/update-subscription", {
                    id: paymentResult.paymentIntent.id,
                    email: user.email,
                    price: paymentResult.paymentIntent.amount / 100,
                });
                setTimeout(() => navigate("/"), 3000);
                subscriptionRefetched();
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {success && <SuccessConfetti />}
                {success && <SuccessMessage />}
            </AnimatePresence>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <label htmlFor="coupon" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Have a coupon code?
                    </label>
                    <div className="flex space-x-2">
                        <input
                            id="coupon"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <motion.button
                            type="button"
                            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={applyCoupon}
                        >
                            Apply
                        </motion.button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {discount > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800"
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <p className="text-blue-700 dark:text-blue-300 font-medium">
                                    Coupon Applied! <span className="font-bold">{discount}%</span> discount
                                </p>
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-gray-500 dark:text-gray-400 line-through">${29.00}</span>
                                <span className="text-xl font-bold text-blue-600 dark:text-blue-300">${price}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-700 dark:text-red-300"
                        >
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {error}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-8"
                >
                    <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">Payment Details</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enter your card information below</p>
                    </div>
                    <motion.div
                        className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                        whileHover={{ boxShadow: "0 0 0 2px rgba(20, 184, 166, 0.3)" }}
                        transition={{ duration: 0.2 }}
                    >
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                        ":-webkit-autofill": {
                                            color: "#424770",
                                        },
                                    },
                                    invalid: {
                                        color: "#e53e3e",
                                        iconColor: "#e53e3e",
                                    },
                                },
                                hidePostalCode: true,
                            }}
                            className="py-2"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 flex flex-col space-y-4"
                >
                    <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">Total</span>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full py-4 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <span>Complete Payment</span>
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                </svg>
                            </div>
                        )}
                    </motion.button>
                </motion.div>
            </motion.form>
        </>
    );
};

const PlanFeature = ({ children }) => (
    <motion.li
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center mb-3"
    >
        <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span className="text-gray-700 dark:text-gray-300">{children}</span>
    </motion.li>
);

const Subscription = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-2 mt-20 sm:px-6 lg:px-8 transition-colors duration-200">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <motion.header
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="inline-block mb-4"
                    >
                        <div className="w-20 h-20 mx-auto bg-blue-500 rounded-full flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-blue-400 opacity-50"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            />
                            <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                            </svg>
                        </div>
                    </motion.div>
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Premium Subscription</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Unlock exclusive features and enhance your experience
                    </p>
                </motion.header>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    >
                        <div className="relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Premium Plan</h2>
                                    <motion.div
                                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 500, delay: 0.5 }}
                                    >
                                        MOST POPULAR
                                    </motion.div>
                                </div>

                                <div className="flex items-baseline mb-6">
                                    <span className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">$29</span>
                                    <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <ul className="mb-8 space-y-2">
                                        <PlanFeature>Unlimited products</PlanFeature>
                                        <PlanFeature>Advanced analytics</PlanFeature>
                                        <PlanFeature>Ad-free experience</PlanFeature>
                                        <PlanFeature>Early access to new features</PlanFeature>
                                        <PlanFeature>Download content for offline use</PlanFeature>
                                        <PlanFeature>Priority customer support</PlanFeature>
                                    </ul>
                                </motion.div>

                                <motion.div
                                    className="pt-6 border-t border-gray-200 dark:border-gray-700"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className="font-medium">30-day money-back guarantee</span>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    >
                        <div className="relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                            <div className="p-8">
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm />
                                </Elements>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p>By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
                    <p className="mt-2">Questions? Contact our support team at support@example.com</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Subscription;