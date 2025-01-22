import React from 'react'

const PageStarter = ({ title, subTitle }) => {
    return (
        <div>
            <header>
                <h2 className="text-xl font-bold text-center text-gray-900 sm:text-3xl dark:text-gray-300">--{title}--</h2>
                <p className="mt-4 text-center mx-auto text-gray-400 max-w-xl">
                    {subTitle}
                </p>
            </header>
        </div>
    )
}

export default PageStarter