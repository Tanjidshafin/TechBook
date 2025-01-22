import React, { useEffect, useState } from 'react'
import AxiosPublic from '../context/AxiosPublic'
import Swal from 'sweetalert2'
import UseCoupons from '../hooks/UseCoupons'
import Lottie from 'lottie-react'
import noData from "../assets/CouponLottie.json"
import { RxCross1 } from "react-icons/rx";
const ManageCoupons = () => {
    const [addCoupon, setaddCoupon] = useState(false);
    const AxiosLink = AxiosPublic()
    const [coupons, couponsRefetched] = UseCoupons()
    const [loading, setLoading] = useState(false)
    const [coupon, setCoupon] = useState([])
    const [couponData, setCouponData] = useState({
        code: "",
        expiryDate: "",
        description: "",
        percent: "",
    })
    useEffect(() => {
        if (coupon) {
            setCouponData(coupon)
        }
    }, [coupon])
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
            setLoading(true)
            await AxiosLink.post("/add-coupon", couponData)
                .then(res => {
                    Swal.fire({
                        title: "Added!",
                        text: "Coupon Added",
                        icon: "success"
                    });
                    couponsRefetched()
                })
            setCouponData({
                code: "",
                expiryDate: "",
                description: "",
                percent: "",
            })

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = (id) => {
        try {
            setLoading(true)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your coupon has been deleted.",
                        icon: "success"
                    });
                    AxiosLink.delete(`/delete-coupon/${id}`)
                        .then(res => {
                            couponsRefetched()
                        })
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const handleData = async (id) => {
        document.getElementById('my_modal_5').showModal()
        await AxiosLink.get(`/coupon/${id}`)
            .then(res => setCoupon(res.data))
    }
    const handleEdit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await AxiosLink.patch(`/update-coupon/${coupon._id}`, couponData)
                .then(res => {
                    Swal.fire({
                        title: "Updated",
                        text: "Your coupon has been deleted.",
                        icon: "success"
                    });
                    couponsRefetched()
                    document.getElementById('my_modal_5').close()
                })
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen gap-10'>
            <div>
                <p className="text-3xl font-bold text-center mt-10">Manage Coupons</p>
                <div className='text-center sm:text-start mt-10'>
                    <button onClick={() => setaddCoupon(true)} className="btn bg-blue-500 text-white px-3 py-1 hover:bg-blue-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                        Coupons</button>
                </div>
                {coupons.length === 0 ? (<div
                    className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
                    <Lottie animationData={noData} loop={true} className='w-[200px]' />
                    <h1 className="text-[1.4rem] mt-6 font-[500] text-center text-black dark:text-gray-300">No Coupons to Show...</h1>
                    <p className="text-[0.9rem] text-center text-gray-500">Add a Coupon Now!!!</p>
                </div>) : (<div className='overflow-x-auto'>
                    <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">No.</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Code</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Discount</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Action</th>
                                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Delete</th>
                            </tr>
                        </thead >
                        <tbody>
                            {coupons.map((product, index) => (
                                <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">

                                    <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">{1 + index}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">{product.code}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">{product.percent}%</td>
                                    <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">
                                        <button onClick={() => {
                                            handleData(product._id)
                                        }}

                                            className="bg-blue-500 btn text-white rounded-md hover:bg-blue-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                            </svg>

                                        </button>
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">
                                        <button onClick={() => {
                                            handleDelete(product._id)
                                        }}

                                            className="bg-red-500 text-white btn  rounded-md hover:bg-red-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                                <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                            </svg>

                                        </button>
                                    </td>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form onSubmit={handleEdit} className="p-4 space-y-4">
                                                <div>
                                                    <label
                                                        htmlFor="code"
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                    >
                                                        Coupon Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="code"
                                                        name="code"
                                                        value={couponData.code}
                                                        onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="expiryDate"
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                    >
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="date"
                                                        id="expiryDate"
                                                        name="expiryDate"
                                                        value={couponData.expiryDate}
                                                        onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="description"
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                    >
                                                        Coupon Description
                                                    </label>
                                                    <textarea
                                                        id="description"
                                                        name="description"
                                                        value={couponData.description}
                                                        onChange={handleChange}
                                                        rows="3"
                                                        className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div>
                                                    <label
                                                        htmlFor="percent"
                                                        className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                                    >
                                                        Discount Percentage
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="percent"
                                                        name="percent"
                                                        value={couponData.percent}
                                                        onChange={handleChange}
                                                        className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                                        required
                                                    />
                                                </div>
                                                <div className='flex justify-between gap-5'>
                                                    <button
                                                        type="submit"
                                                        className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                                                    >
                                                        Add Coupon
                                                    </button>
                                                    <button onClick={() => document.getElementById('my_modal_5').close()} className='btn'>Cancel</button>
                                                </div>
                                            </form>

                                        </div>
                                    </dialog>
                                </tr>

                            ))}
                        </tbody>
                    </table >
                </div>)}
            </div>
            <div className="p-8 flex items-center justify-center">
                <div
                    className={`${addCoupon ? "visible" : "invisible"} fixed inset-0 z-50 bg-black/30 flex items-center justify-center transition-opacity duration-300`}
                >
                    <div
                        className={`${addCoupon ? "scale-100 opacity-100" : "scale-95 opacity-0"} w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300`}
                    >
                        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                Add New Coupon
                            </h2>
                            <RxCross1
                                className="cursor-pointer text-xl hover:text-gray-500 transition-colors"
                                onClick={() => setaddCoupon(false)}
                            />
                        </div>
                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label
                                    htmlFor="code"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Coupon Code
                                </label>
                                <input
                                    type="text"
                                    id="code"
                                    name="code"
                                    value={couponData.code}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="expiryDate"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Expiry Date
                                </label>
                                <input
                                    type="date"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={couponData.expiryDate}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Coupon Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={couponData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label
                                    htmlFor="percent"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-400"
                                >
                                    Discount Percentage
                                </label>
                                <input
                                    type="number"
                                    id="percent"
                                    name="percent"
                                    value={couponData.percent}
                                    onChange={handleChange}
                                    className="mt-1 w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                            >
                                Add Coupon
                            </button>
                        </form>
                    </div>
                </div>
            </div>


        </div >
    )
}

export default ManageCoupons