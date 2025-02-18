"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FiEdit2, FiTrash2, FiPlus, FiTag } from "react-icons/fi"
import UseCoupons from "../hooks/UseCoupons"
import AxiosPublic from "../context/AxiosPublic"
import Swal from "sweetalert2"
import DataTable from "./DataTable"

const ManageCoupons = () => {
    const [addCoupon, setAddCoupon] = useState(false)
    const AxiosLink = AxiosPublic()
    const [coupons, couponsRefetched, isFetching] = UseCoupons()
    const [couponData, setCouponData] = useState({
        code: "",
        expiryDate: "",
        description: "",
        percent: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setCouponData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await AxiosLink.post("/add-coupon", couponData)
            Swal.fire({
                title: "Added!",
                text: "Coupon Added",
                icon: "success",
            })
            couponsRefetched()
            setAddCoupon(false)
            setCouponData({
                code: "",
                expiryDate: "",
                description: "",
                percent: "",
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error!",
                text: "There was an issue adding the coupon. Please try again.",
                icon: "error",
            })
        }
    }

    const handleDelete = async (id) => {
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
                await AxiosLink.delete(`/delete-coupon/${id}`)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your coupon has been deleted.",
                    icon: "success",
                })
                couponsRefetched()
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error!",
                text: "There was an issue deleting the coupon. Please try again.",
                icon: "error",
            })
        }
    }

    const handleEdit = async (id) => {
        try {
            const coupon = await AxiosLink.get(`/coupon/${id}`)
            setCouponData(coupon.data)
            setAddCoupon(true)
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Error!",
                text: "There was an issue fetching the coupon data. Please try again.",
                icon: "error",
            })
        }
    }

    const columns = [
        {
            header: "Code",
            accessor: "code",
        },
        {
            header: "Discount",
            accessor: "percent",
            render: (item) => `${item.percent}%`,
        },
        {
            header: "Expiry Date",
            accessor: "expiryDate",
            render: (item) => new Date(item.expiryDate).toLocaleDateString(),
        },
        {
            header: "Description",
            accessor: "description",
        },
    ]

    const actions = [
        {
            label: "Edit",
            icon: FiEdit2,
            variant: "default",
            onClick: (item) => handleEdit(item._id),
        },
        {
            label: "Delete",
            icon: FiTrash2,
            variant: "danger",
            onClick: (item) => handleDelete(item._id),
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8"
        >
            <div className="flex justify-between flex-col sm:flex-row gap-5 items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Manage Coupons</h1>
                <button
                    onClick={() => setAddCoupon(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
                >
                    <FiPlus className="mr-2" />
                    Add Coupon
                </button>
            </div>

            <DataTable
                title="Coupons"
                description="Manage your discount coupons"
                data={coupons}
                columns={columns}
                actions={actions}
                isLoading={isFetching}
                emptyState={{
                    message: "No coupons found. Add your first coupon to get started!",
                    icon: FiTag,
                }}
            />

            {addCoupon && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 z-50 overflow-y-auto"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                                    {couponData._id ? "Edit Coupon" : "Add New Coupon"}
                                </h3>
                                <div className="mt-2 space-y-4">
                                    <div>
                                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Coupon Code
                                        </label>
                                        <input
                                            type="text"
                                            name="code"
                                            id="code"
                                            value={couponData.code}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            name="expiryDate"
                                            id="expiryDate"
                                            value={couponData.expiryDate}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            rows="3"
                                            value={couponData.description}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="percent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Discount Percentage
                                        </label>
                                        <input
                                            type="number"
                                            name="percent"
                                            id="percent"
                                            value={couponData.percent}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                                    >
                                        {couponData._id ? "Save Changes" : "Add Coupon"}
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                                        onClick={() => setAddCoupon(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default ManageCoupons

