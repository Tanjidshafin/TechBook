"use client"
import { motion } from "framer-motion"
import { FiUserPlus, FiUserX, FiUsers } from "react-icons/fi"
import ManageUserData from "../hooks/ManageUserData"
import AxiosPublic from "../context/AxiosPublic"
import Swal from "sweetalert2"
import DataTable from "./DataTable"

const ManageUsers = () => {
  const AxiosLink = AxiosPublic()
  const [users, usersRefetched, isFetching] = ManageUserData()

  const makeModerator = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, upgrade it!",
      })

      if (result.isConfirmed) {
        await AxiosLink.patch(`/make-moderator/${id}`)
        Swal.fire({
          title: "Made Moderator",
          text: `${name} has been made moderator from now`,
          icon: "success",
        })
        usersRefetched()
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the user role. Please try again.",
        icon: "error",
      })
    }
  }

  const makeAdmin = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, upgrade it!",
      })

      if (result.isConfirmed) {
        await AxiosLink.patch(`/make-admin/${id}`)
        Swal.fire({
          title: "Made Admin",
          text: `${name} has been made admin from now`,
          icon: "success",
        })
        usersRefetched()
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "There was an issue updating the user role. Please try again.",
        icon: "error",
      })
    }
  }

  const handleDelete = async (id, name) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })

      if (result.isConfirmed) {
        await AxiosLink.delete(`/delete-user/${id}`)
        Swal.fire({
          title: "Deleted!",
          text: `${name} has been deleted.`,
          icon: "success",
        })
        usersRefetched()
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the user. Please try again.",
        icon: "error",
      })
    }
  }

  const columns = [
    {
      header: "User",
      accessor: "name",
      render: (item) => (
        <div className="flex items-center">
          <img
            src={item.image || "/placeholder.jpg"}
            alt={item.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{item.name}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{item.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      render: (item) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.role === "admin"
            ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
            : item.role === "moderator"
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
        >
          {item.role.charAt(0).toUpperCase() + item.role.slice(1)}
        </span>
      ),
    },
    {
      header: "Joined",
      accessor: "dateTime",
      render: (item) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {item.dateTime[0]}, {item.dateTime[1]}
        </span>
      ),
    },
  ]

  const actions = [
    {
      label: "Make Moderator",
      icon: FiUserPlus,
      variant: "success",
      onClick: (item) => item.role !== "moderator" && item.role !== "admin" && makeModerator(item._id, item.name),
      isHidden: (item) => item.role === "moderator" || item.role === "admin",
    },
    {
      label: "Make Admin",
      icon: FiUserPlus,
      variant: "success",
      onClick: (item) => item.role !== "admin" && makeAdmin(item._id, item.name),
      isHidden: (item) => item.role === "admin",
    },
    {
      label: "Delete",
      icon: FiUserX,
      variant: "danger",
      onClick: (item) => handleDelete(item._id, item.name),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8"
    >
      <DataTable
        title="Manage Users"
        description="Review and manage user accounts and roles"
        data={users}
        columns={columns}
        actions={actions}
        isLoading={isFetching}
        emptyState={{
          message: "No users found in the system.",
          icon: FiUsers,
        }}
      />
    </motion.div>
  )
}

export default ManageUsers

