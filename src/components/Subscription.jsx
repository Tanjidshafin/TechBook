import React, { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import IsSubscription from "../hooks/IsSubscription";
import AxiosPublic from "../context/AxiosPublic";
import { AppContext } from "../context/AppContext";
import UseCoupons from "../hooks/UseCoupons";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

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
    const [error, setError] = useState("")
    const [coupons] = UseCoupons()
    const applyCoupon = () => {
        const foundCoupon = coupons.find((c) => c.code === couponCode);
        if (foundCoupon) {
            const newPrice = price - (price * foundCoupon.percent) / 100;
            setPrice(newPrice.toFixed(2));
            setDiscount(foundCoupon.percent);
            setError(null);
        } else {
            setError("Invalid coupon code");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                setTimeout(() => navigate("/"), 2000);
                subscriptionRefetched();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="coupon" className="block mb-2 text-sm font-medium dark:text-gray-400 text-gray-700">
                Coupon Code:
            </label>
            <div className="flex mb-5 space-x-2">
                <input
                    id="coupon"
                    type="text"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                />
                <motion.button
                    type="button"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyCoupon}
                >
                    Apply
                </motion.button>
            </div>
            {discount > 0 && (
                <p className="text-green-600 text-sm font-medium mb-4">
                    Coupon Applied! {discount}% discount applied. New Price: ${price}
                </p>
            )}
            {error && <p className="text-red-500 text-sm font-medium mb-4">{error}</p>}
            <CardElement
                options={{
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
                }}
            />
            <button type="submit" disabled={!stripe || loading} className="mt-4 btn py-2 px-4 bg-blue-500 text-white rounded-lg">
                {loading ? <span className="loading loading-spinner loading-sm"></span> : `Pay $${price}`}
            </button>
            {success && (
                <p className="mt-5 flex flex-col gap-3 text-sm text-green-600 font-medium">
                    Payment Successful! Redirecting...
                </p>
            )}
        </form>
    );
};

const Subscription = () => {
    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-8">
            <header className="pt-36">
                <h1 className="text-4xl font-bold text-center">Premium Access</h1>
                <p className="text-center text-gray-600 mt-2">Unlock exclusive features with premium access.</p>
            </header>
            <div className="md:w-1/2 shadow-lg py-10 dark:bg-gray-800 bg-white rounded-lg px-5 md:px-10 mt-10 mx-auto">
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Subscription;
