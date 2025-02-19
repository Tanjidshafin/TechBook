"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiBook, FiCalendar, FiUsers, FiArrowRight } from "react-icons/fi"
import { NavLink } from "react-router"

const TechTrend = () => {
    const [activeBook, setActiveBook] = useState(0)
    const books = [
        {
            title: "The Innovators",
            author: "Walter Isaacson",
            cover: "https://back.3blcdn.com/sites/default/files/styles/ratio_3_2/public/triplepundit/wide/black%20inventors.jpg?h=528fcf08",
            description: "How a Group of Hackers, Geniuses, and Geeks Created the Digital Revolution",
            meetingDate: "2023-07-15",
            participants: 42,
        },
        {
            title: "Clean Code",
            author: "Robert C. Martin",
            cover: "https://cdn.dribbble.com/users/71691/screenshots/6283648/attachments/1345911/cleancode-attc.png",
            description: "A Handbook of Agile Software Craftsmanship",
            meetingDate: "2023-07-29",
            participants: 38,
        },
        {
            title: "Designing Data-Intensive Applications",
            author: "Martin Kleppmann",
            cover: "https://s3-alpha.figma.com/hub/file/6195379871/c8236a9c-c285-4b08-ba2f-d4a0203e97bc-cover.png",
            description: "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
            meetingDate: "2023-08-12",
            participants: 55,
        },
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 },
        },
    }

    return (
        <motion.div
            className="bg-white mt-20 dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white"
                variants={itemVariants}
            >
                TechBook Club
            </motion.h2>

            <div className="flex flex-col lg:flex-row gap-8">
                <motion.div className="lg:w-1/2" variants={itemVariants}>
                    <div className="relative">
                        <div className="overflow-hidden rounded-2xl shadow-lg">
                            <img
                                src={books[activeBook].cover || "/placeholder.svg"}
                                alt={books[activeBook].title}
                                className="w-full h-[25rem] object-cover transform transition-transform duration-500 hover:scale-110"
                            />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                            <h3 className="text-2xl font-bold text-white mb-2">{books[activeBook].title}</h3>
                            <p className="text-gray-300">by {books[activeBook].author}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div className="lg:w-1/2 flex flex-col justify-between" variants={itemVariants}>
                    <div>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{books[activeBook].description}</p>
                        <div className="flex items-center mb-4">
                            <FiCalendar className="text-indigo-500 dark:text-indigo-400 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">Next meeting: {books[activeBook].meetingDate}</span>
                        </div>
                        <div className="flex items-center mb-6">
                            <FiUsers className="text-indigo-500 dark:text-indigo-400 mr-2" />
                            <span className="text-gray-700 dark:text-gray-300">{books[activeBook].participants} participants</span>
                        </div>
                    </div>

                    <NavLink to="/discussion">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 px-6 py-3 rounded-full font-bold text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
                        >
                            Join Discussion <FiArrowRight className="ml-2" />
                        </motion.button>
                    </NavLink>
                </motion.div>
            </div>

            <motion.div className="mt-12" variants={itemVariants}>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Upcoming Books</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {books.map((book, index) => (
                        <motion.div
                            key={book.title}
                            className={`p-4 rounded-lg cursor-pointer transition-colors duration-300 ${index === activeBook
                                ? "bg-indigo-100 dark:bg-indigo-900"
                                : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                            onClick={() => setActiveBook(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className="flex items-center">
                                <FiBook className="text-indigo-500 dark:text-indigo-400 mr-2" />
                                <h4 className="font-semibold text-gray-900 dark:text-white">{book.title}</h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default TechTrend

