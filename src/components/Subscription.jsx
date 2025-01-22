import React, { useContext, useEffect, useState } from 'react'
import PageStarter from '../hooks/PageStarter'
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import AxiosPublic from '../context/AxiosPublic';
import { AppContext } from '../context/AppContext';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router';
import IsSubscription from '../hooks/IsSubscription';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const CheckoutForm = () => {
    const [, subscriptionRefetched] = IsSubscription()
    const { user } = useContext(AppContext)
    const AxiosLink = AxiosPublic()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    let price = 29
    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = elements.getElement(CardElement);

        try {
            const { data: clientSecret } = await AxiosLink.post("/create-payment-intent", { amount: parseInt(price * 100) });
            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            });

            if (paymentResult.error) {
                try {
                    setLoading(true)
                    setError(paymentResult.error.message)
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                }
            } else {
                try {
                    setLoading(true)
                    setSuccess(true);
                    await AxiosLink.post("/update-subscription", { id: paymentResult.paymentIntent.id, email: user.email, price: paymentResult.paymentIntent.amount / 100 });
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false)
                    setTimeout(() => {
                        navigate("/")
                    }, 2000)
                    subscriptionRefetched()

                }
            }
        } catch (error) {
            try {
                setLoading(true)
                setError(error.message)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)

            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="coupon" className="block mb-2 dark:text-gray-400 text-sm font-medium text-gray-700">
                Coupon Code:
            </label>
            <div className="flex mb-5 space-x-2">
                <input
                    id="coupon"
                    type="text"
                    className="flex-grow px-3 w-full py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter coupon code"
                />
                <motion.button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Apply
                </motion.button>
            </div>
            <CardElement options={{
                style: {
                    base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                            color: "#aab7c4",
                        },
                    },
                    invalid: {
                        color: "#9e2146",
                    },
                },
            }} />
            <button type="submit" disabled={!stripe} className="mt-4 btn py-2 px-4 bg-blue-500 text-white rounded-lg">
                {loading ? (<span className="loading loading-spinner loading-sm"></span>) : `Pay $${price}`}
            </button>
            {success ? (<p className="mt-5 flex flex-col gap-3 text-sm text-green-600 font-medium">Payment Successful | Redirecting .....
            </p>) : (<p className="mt-5 text-sm text-red-500 font-medium">{error}</p>)}
        </form>
    );
};
const Subscription = () => {
    return (
        <div className='min-h-screen px-4 sm:px-6 lg:px-8'>
            <header className='pt-36'>
                <PageStarter title="Elevate Your Experience with Premium Access" subTitle="Upgrade to premium and unlock a world of exclusive features designed to enhance your journey. With premium access," />
            </header>
            <div className='md:w-1/2 shadow-lg py-10 dark:bg-gray-800 rounded-lg px-5 md:px-10 mt-10 mx-auto'>
                <p className="text-xl text-transparent bg-gradient-to-tr from-blue-600 to-blue-300 bg-clip-text font-bold text-center mb-10">Enter Card Details</p>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    )
}

export default Subscription