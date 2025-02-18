"use client"

import { useContext } from "react"
import { motion } from "framer-motion"
import { FiEdit2, FiTrash2, FiPackage } from "react-icons/fi"
import UseProducts from "../hooks/UseProducts"
import { AppContext } from "../context/AppContext"
import AxiosPublic from "../context/AxiosPublic"
import Swal from "sweetalert2"
import DataTable from "./DataTable"
import { useNavigate } from "react-router"

const MyProducts = () => {
  const { user } = useContext(AppContext)
  const AxiosLink = AxiosPublic()
  const [products, productRefetched, isFetching] = UseProducts()
  const ownProducts = products.filter((product) => product.email === user.email)
  const navigate = useNavigate()
  const handleDelete = async (id, status) => {
    try {
      await AxiosLink.delete(`/delete-product/${id}`)
      Swal.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success",
      })
      productRefetched()
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the product. Please try again.",
        icon: "error",
      })
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
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.status === "pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
            : item.status === "accepted"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
            }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
  ]

  const actions = [
    {
      label: "Edit",
      icon: FiEdit2,
      variant: "default",
      onClick: (item) => (navigate(`/updateUser/${item._id}`)),
    },
    {
      label: "Delete",
      icon: FiTrash2,
      variant: "danger",
      onClick: (item) => handleDelete(item._id, item.status),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8"
    >
      <DataTable
        title="My Products"
        description="Manage and review your product listings"
        data={ownProducts}
        columns={columns}
        actions={actions}
        isLoading={isFetching}
        emptyState={{
          message: "You haven't added any products yet. Start by adding your first product!",
          icon: FiPackage,
        }}
      />
    </motion.div>
  )
}

export default MyProducts

