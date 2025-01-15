import React from 'react'
import SignupImage from "../assets/Signup.json"
import Lottie from 'lottie-react'
export default function Signup() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xl font-bold">M</span>
                        </div>
                        <span className="text-xl font-bold">Yourbrand</span>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">
                                Start your 14-day free trial by
                            </h1>
                            <p className="text-xl">
                                entering your information below
                            </p>
                        </div>

                        <div className="text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                                Login Here.
                            </a>
                        </div>

                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                            >
                                Complete Sign up
                            </button>

                            <p className="text-sm text-center text-gray-500">
                                By signing up, you're agreeing to our{' '}
                                <a href="/terms" className="text-gray-700 hover:text-purple-600">
                                    Terms
                                </a>
                                {' '}and{' '}
                                <a href="/privacy" className="text-gray-700 hover:text-purple-600">
                                    Privacy Policy
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Lottie animationData={SignupImage} loop={true} />
                </div>
                <div className="fixed bottom-4 right-4">
                    <a
                        href="https://webflow.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z" />
                        </svg>
                        Made in Webflow
                    </a>
                </div>
            </div>
        </div>
    )
}

