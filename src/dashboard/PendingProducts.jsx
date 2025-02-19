"use client"
import { motion } from "framer-motion"
import { FiCheck, FiX, FiStar, FiEye, FiInbox } from "react-icons/fi"

import UseProducts from "../hooks/UseProducts"
import AxiosPublic from "../context/AxiosPublic"
import Swal from "sweetalert2"
import DataTable from "./DataTable"
import { useNavigate } from "react-router"

const PendingProducts = () => {
  const [products, productRefetched, isFetching] = UseProducts()
  const AxiosLink = AxiosPublic()
  const pendingProducts = products.filter((product) => product.status === "pending")
  const navigate = useNavigate()
  const handleAccepted = async (id) => {
    try {
      await AxiosLink.patch(`/accepted-product/${id}`)
      Swal.fire({
        title: "Accepted",
        text: "Product has been accepted",
        icon: "success",
      })
      productRefetched()
    } catch (err) {
      console.log(err)
    }
  }

  const handleRejected = async (id) => {
    try {
      await AxiosLink.patch(`/rejected-product/${id}`)
      Swal.fire({
        title: "Rejected",
        text: "Product has been rejected",
        icon: "success",
      })
      productRefetched()
    } catch (err) {
      console.log(err)
    }
  }

  const handleFeatured = async (id) => {
    try {
      await AxiosLink.patch(`/featured/${id}`)
      Swal.fire({
        title: "Featured",
        text: "Product has been Featured",
        icon: "success",
      })
      productRefetched()
    } catch (err) {
      console.log(err)
    }
  }

  const columns = [
    {
      header: "Product",
      accessor: "name",
      render: (item) => (
        <div className="flex items-center">
          <img
            src={item.mainImage || "/placeholder.jpg"}
            alt={item.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{item.category}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
          Pending
        </span>
      ),
    },
  ]

  const actions = [
    {
      label: "Accept",
      icon: FiCheck,
      variant: "success",
      onClick: (item) => handleAccepted(item._id),
    },
    {
      label: "Reject",
      icon: FiX,
      variant: "danger",
      onClick: (item) => handleRejected(item._id),
    },
    {
      label: "Feature",
      icon: FiStar,
      variant: "default",
      onClick: (item) => handleFeatured(item._id),
    },
    {
      label: "View",
      icon: FiEye,
      variant: "default",
      onClick: (item) => (navigate(`/product/${item._id}`)),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8"
    >
      <DataTable
        title="Pending Products"
        description="Review and manage products awaiting approval"
        data={pendingProducts}
        columns={columns}
        actions={actions}
        isLoading={isFetching}
        emptyState={{
          message: "No pending products to review at this time.",
          icon: FiInbox,
        }}
      />
    </motion.div>
  )
}

export default PendingProducts

