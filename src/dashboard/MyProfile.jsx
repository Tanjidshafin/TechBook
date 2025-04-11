"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"
import { MdOutlineEdit, MdVerified } from "react-icons/md"
import { BiSolidPurchaseTag } from "react-icons/bi"
import { AppContext } from "../context/AppContext"
import IsSubscription from "../hooks/IsSubscription"
import { useNavigate } from "react-router"
import { useInView } from "framer-motion"
import { useRef } from "react"

const AnimatedSection = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

const MyProfile = () => {
  const { user } = useContext(AppContext)
  const [isSubscription] = IsSubscription()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-12">
            My Profile
          </h1>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-400 dark:bg-blue-600 rounded-full opacity-20 blur-2xl"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-400 dark:bg-purple-600 rounded-full opacity-20 blur-2xl"></div>

          <motion.div
            className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-500 dark:to-gray-400"></div>
            <div className="px-6 pb-8 -mt-16">
              <AnimatedSection delay={0.1}>
                <div className="flex flex-col items-center">
                  <div className="ring-4 ring-white dark:ring-gray-800 rounded-full overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                    <img
                      src={
                        user.photoURL ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"
                      }
                      alt="Profile"
                      className="w-32 h-32 object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src =
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"
                      }}
                    />
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="mt-6 text-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">{user.displayName}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">{user.email}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="mt-8">
                  <div className="flex justify-center">
                    {isSubscription ? (
                      <motion.div
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white shadow-md"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MdVerified className="text-xl" />
                        <span className="font-medium">Premium Member</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white shadow-md"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-medium">Free Account</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <div className="mt-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
                  <div className="flex items-start">
                    <FaQuoteLeft className="text-blue-400 dark:text-blue-300 text-xl mr-2 mt-1" />
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 italic">
                        Account created on{" "}
                        <span className="font-medium">{new Date(user.metadata.creationTime).toLocaleDateString()}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 italic mt-1">
                        Last signed in on{" "}
                        <span className="font-medium">
                          {new Date(user.metadata.lastSignInTime).toLocaleDateString()}
                        </span>{" "}
                        at{" "}
                        <span className="font-medium">
                          {new Date(user.metadata.lastSignInTime).toLocaleTimeString()}
                        </span>
                      </p>
                    </div>
                    <FaQuoteRight className="text-blue-400 dark:text-blue-300 text-xl ml-2 mt-1" />
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.5}>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.button
                    disabled
                    className="flex items-center justify-center gap-2 h-14 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-medium shadow-sm cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MdOutlineEdit className="text-xl" />
                    <span>Edit Profile</span>
                  </motion.button>

                  <motion.button
                    onClick={() => navigate("/subscription")}
                    disabled={isSubscription}
                    className={`flex items-center justify-center gap-2 h-14 rounded-xl font-medium shadow-md ${isSubscription
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                      }`}
                    whileHover={!isSubscription ? { scale: 1.02 } : {}}
                    whileTap={!isSubscription ? { scale: 0.98 } : {}}
                  >
                    <BiSolidPurchaseTag className="text-xl" />
                    <span>{isSubscription ? "Premium Active" : "Upgrade to Premium"}</span>
                  </motion.button>
                </div>
              </AnimatedSection>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile

