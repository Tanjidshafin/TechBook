"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import UseAcceptedProduct from "../hooks/UseAcceptedProduct"
import ManageUserData from "../hooks/ManageUserData"
import UseProducts from "../hooks/UseProducts"
import { useQuery } from "@tanstack/react-query"
import AxiosPublic from "../context/AxiosPublic"
import { FiUsers, FiShoppingBag, FiClock, FiStar, FiTrendingUp, FiTrendingDown } from "react-icons/fi"

const Statistics = () => {
  const [acceptedProducts] = UseAcceptedProduct()
  const [users] = ManageUserData()
  const [products] = UseProducts()
  const AxiosLink = AxiosPublic()

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await AxiosLink.get(`/reviews`)
      return res.data
    },
  })
  const [metrics, setMetrics] = useState({
    totalProducts: 0,
    pendingProducts: 0,
    acceptedProducts: 0,
    totalReviews: 0,
    totalUsers: 0,
  })
  useEffect(() => {
    if (products && acceptedProducts && users && reviews) {
      setMetrics({
        totalProducts: products.length,
        pendingProducts: products.filter((product) => product.status === "pending").length,
        acceptedProducts: acceptedProducts.length,
        totalReviews: reviews.length,
        totalUsers: users.length,
      })
    }
  }, [products, acceptedProducts, users, reviews])

  const colors = {
    primary: "#4F46E5",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",
  }

  const statCards = [
    {
      title: "Total Products",
      value: metrics.totalProducts,
      icon: FiShoppingBag,
      color: colors.primary,
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Active Users",
      value: metrics.totalUsers,
      icon: FiUsers,
      color: colors.success,
      trend: "+5.25%",
      trendUp: true,
    },
    {
      title: "Total Reviews",
      value: metrics.totalReviews,
      icon: FiStar,
      color: colors.warning,
      trend: "+18.2%",
      trendUp: true,
    },
    {
      title: "Pending Products",
      value: metrics.pendingProducts,
      icon: FiClock,
      color: colors.danger,
      trend: "-2.4%",
      trendUp: false,
    },
  ]
  const areaData = [
    { name: "Jan", products: 400, reviews: 240 },
    { name: "Feb", products: 300, reviews: 139 },
    { name: "Mar", products: 200, reviews: 980 },
    { name: "Apr", products: 278, reviews: 390 },
    { name: "May", products: 189, reviews: 480 },
    { name: "Jun", products: 239, reviews: 380 },
    { name: "Jul", products: 349, reviews: 430 },
  ]

  const pieChartData = [
    { name: "Accepted", value: metrics.acceptedProducts },
    { name: "Pending", value: metrics.pendingProducts },
  ]

  return (
    <div className="min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                    {stat.value.toLocaleString()}
                  </h3>
                  <div className="flex items-center mt-2">
                    {stat.trendUp ? (
                      <FiTrendingUp className="text-green-500 mr-1" />
                    ) : (
                      <FiTrendingDown className="text-red-500 mr-1" />
                    )}
                    <span className={`text-sm ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>{stat.trend}</span>
                  </div>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}15` }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Products & Reviews Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="products"
                    stackId="1"
                    stroke={colors.primary}
                    fill={`${colors.primary}15`}
                  />
                  <Area
                    type="monotone"
                    dataKey="reviews"
                    stackId="1"
                    stroke={colors.success}
                    fill={`${colors.success}15`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Product Status Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill={colors.success} />
                    <Cell fill={colors.warning} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Monthly Statistics</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="products" fill={colors.primary} />
                <Bar dataKey="reviews" fill={colors.success} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Statistics

