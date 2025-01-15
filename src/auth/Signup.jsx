import React, { useContext, useState } from 'react'
import SignupImage from "../assets/Signup.json"
import Lottie from 'lottie-react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router'
export default function Signup() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { registerUser } = useContext(AppContext)
    const handleRegister = async e => {
        e.preventDefault()
        const event = e.target
        const name = event.firstName.value + " " + event.lastName.value
        const image = event.imageUrl.value
        const email = event.Email.value
        const password = event.Password.value
        try {
            setLoading(true)
            await registerUser(email, password, name, image)
        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false)
            navigate("/")
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-800 p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex items-center sm:justify-start justify-center text-3xl gap-2 font-semibold">
                        <img className='md:w-10 md:h-10 w-8 h-8 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/thumbnails/008/386/422/small_2x/tb-or-bt-initial-letter-logo-design-vector.jpg" alt="" />
                        <span>TechBook</span>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold dark:text-gray-300">
                                Start your Premium Membership
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

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    First Name
                                </label>
                                <input
                                    name='firstName'
                                    type="text"
                                    placeholder='Enter First Name'
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Last Name
                                </label>
                                <input
                                    name='lastName'
                                    type="text"
                                    placeholder='Enter Last Name'
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Image URL
                                </label>
                                <input
                                    name='imageUrl'
                                    placeholder='Enter Image URL'
                                    type="url"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Email address
                                </label>
                                <input
                                    placeholder='Enter Email'
                                    name='Email'
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-400">
                                    Password
                                </label>
                                <input
                                    placeholder='Enter Password'
                                    name='Password'
                                    type="password"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
                            >
                                {loading ? (<span className="loading loading-spinner loading-md"></span>) : "Complete Sign Up"}
                            </button>

                            <p className="text-sm text-center text-gray-500">
                                By signing up, you're agreeing to our{' '}
                                <a href="/terms" className="text-gray-700 dark:text-gray-400 hover:text-purple-600">
                                    Terms
                                </a>
                                {' '}and{' '}
                                <a href="/privacy" className="text-gray-700 dark:text-gray-400 hover:text-purple-600">
                                    Privacy Policy
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Lottie animationData={SignupImage} loop={true} />
                </div>

            </div>
        </div>
    )
}

