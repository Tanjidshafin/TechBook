import React from 'react'
import { NavLink } from 'react-router'

const Error404 = () => {
    return (
        <div className="grid h-screen place-content-center bg-white dark:bg-gray-800 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-black text-gray-400">404</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-600 sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-gray-500">We can't find that page.</p>
                <NavLink to="/"
                    className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                >
                    Go Back Home
                </NavLink>
            </div>
        </div>
    )
}

export default Error404