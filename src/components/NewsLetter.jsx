"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiSend, FiCheck, FiX } from "react-icons/fi"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus(null), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  }
  return (
    <motion.div
      className="relative max-w-5xl mx-auto overflow-hidden bg-white mt-20 dark:bg-gray-900 rounded-3xl shadow-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 bg-[size:20px_20px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <motion.div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20" variants={childVariants}>
        <motion.div className="mx-auto max-w-2xl text-center" variants={childVariants}>
          <motion.h2
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            variants={childVariants}
          >
            Stay Ahead in Tech
          </motion.h2>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300"
            variants={childVariants}
          >
            Join the TechBook community and receive cutting-edge insights, exclusive offers, and early access to new
            features.
          </motion.p>
        </motion.div>
        <motion.form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-md" variants={childVariants}>
          <div className="relative">
            <input
              type="email"
              className="block w-full rounded-full border-0 px-6 py-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:ring-gray-700 dark:text-white dark:placeholder:text-gray-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="absolute right-1 top-1 bottom-1 flex items-center justify-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              <FiSend className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.form>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 text-center text-green-600 dark:text-green-400"
          >
            <FiCheck className="inline-block mr-2" /> Thank you for subscribing!
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 text-center text-red-600 dark:text-red-400"
          >
            <FiX className="inline-block mr-2" /> Oops! Something went wrong. Please try again.
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Newsletter

