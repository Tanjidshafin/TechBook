import React from 'react'

const PageStarter = ({ title, subTitle }) => {
    return (
        <div>
            <header>
                <h2 className="text-xl font-bold text-gray-900 sm:text-3xl dark:text-gray-300">--{title}--</h2>
                <p className="mt-4 max-w-md text-gray-500">
                    {subTitle}
                </p>
            </header>
        </div>
    )
}

export default PageStarter