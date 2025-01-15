import React, { useContext, useState } from 'react'
import loginImage from "../assets/LoginImage.json"
import Lottie from 'lottie-react'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { AppContext } from '../context/AppContext'
export default function Login() {
    const { googleSignIn, loginUser } = useContext(AppContext)
    const [loadingGoogle, setLoadingG] = useState(false)
    const [loadingNormal, setLoadingN] = useState(false)
    const location = useLocation()
    console.log(location.pathname);
    const navigate = useNavigate()
    const from = location?.state || "/"
    const handleLogin = async e => {
        e.preventDefault()
        const event = e.target
        const email = event.Email.value
        const password = event.Password.value
        try {
            setLoadingN(true)
            await loginUser(email, password)

        } catch (error) {
            console.log(error);
        } finally {
            setLoadingN(false)
            { location.state === "/login" ? (navigate("/")) : (navigate(from)) }
        }
    }
    const handleGoogleSignIn = async () => {
        try {
            setLoadingG(true)
            await googleSignIn()
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingG(false)
            { location.state === "/login" ? (navigate("/")) : (navigate(from)) }
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-gray-800 bg-white p-4">
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="flex items-center sm:justify-start justify-center text-3xl gap-2 font-semibold">
                        <img className='md:w-10 md:h-10 w-8 h-8 rounded-full object-cover' src="https://static.vecteezy.com/system/resources/thumbnails/008/386/422/small_2x/tb-or-bt-initial-letter-logo-design-vector.jpg" alt="" />
                        <span>TechBook</span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold">Welcome Back!</h1>
                        <p className="text-gray-500">Please enter login details below</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-sm text-gray-500">Email</label>
                                <input
                                    name='Email'
                                    type="email"
                                    placeholder="Enter the email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm text-gray-500">Password</label>
                                <input
                                    name='Password'
                                    type="password"
                                    placeholder="Enter the Password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
                                />
                            </div>

                            <div className="text-right">
                                <NavLink to="/signup" className="text-sm text-gray-500 hover:text-indigo-600">
                                    Forgot password?
                                </NavLink>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                            >
                                {loadingNormal ? (<span className="loading loading-spinner loading-md"></span>) : "Sign In"}
                            </button>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-gray-700 dark:text-gray-400 text-gray-500">Or continue</span>
                            </div>
                        </div>
                        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                            {loadingGoogle ? (<span className="loading loading-spinner loading-md"></span>) : (<svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>)}

                            Log in with Google
                        </button>
                        <p className="text-center text-gray-500">
                            Don't have an account?{' '}
                            <NavLink to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                                Sign Up
                            </NavLink>
                        </p>
                    </div>
                </div>
                <div className="hidden lg:block rounded-3xl p-8">
                    <Lottie animationData={loginImage} />
                    <div className="text-white text-center mt-6">
                        <p className="text-lg text-gray-800 dark:text-gray-400 font-semibold">
                            A platform for discovering and sharing tech products, featuring user roles, product moderation, upvotes, reviews, and premium subscriptions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

