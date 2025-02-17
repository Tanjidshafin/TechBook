import React, { useState } from 'react'
import AxiosPublic from '../context/AxiosPublic'
import ManageUserData from '../hooks/ManageUserData'
import Lottie from 'lottie-react'
import noData from "../assets/No_ data.json"
import Swal from 'sweetalert2'
import { Bars } from 'react-loader-spinner'
const ManageUsers = () => {
    const AxiosLink = AxiosPublic()
    const [loading, setLoading] = useState(false)
    const [users, usersRefetched, isFetching] = ManageUserData()
    const makeModerator = (id, name) => {
        try {
            setLoading(true)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, upgrade it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await AxiosLink.patch(`/make-moderator/${id}`)
                    Swal.fire({
                        title: "Made Moderator",
                        text: `${name} has been made moderator from now`,
                        icon: "success"
                    });
                    usersRefetched()
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const makeAdmin = (id, name) => {
        try {
            setLoading(true)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, upgrade it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await AxiosLink.patch(`/make-admin/${id}`)
                    Swal.fire({
                        title: "Made Admin",
                        text: `${name} has been made admin from now`,
                        icon: "success"
                    });
                    usersRefetched()
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    const handleDelete = (id, name) => {
        try {
            console.log(id, name);
            setLoading(true)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `${name} has been deleted.`,
                        icon: "success"
                    });
                    await AxiosLink.delete(`/delete-user/${id}`)
                    usersRefetched()
                }
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    if (isFetching) {
        return <div className='min-h-screen flex justify-center items-center'><Bars
            height="80"
            width="80"
            color="#ced4da"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div>
    }
    return (
        <div>
            <p className="text-3xl font-bold text-center mt-10">Manage Users</p>
            <div>
                {users.length === 0 ? (<div
                    className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
                    <Lottie animationData={noData} loop={true} className='w-[200px]' />
                    <h1 className="text-[1.4rem] mt-6 font-[500] text-black dark:text-gray-300">No Users to Show...</h1>
                    <p className="text-[0.9rem] text-gray-500">No User Logged in Till Now.</p>
                </div>) : (<div className='overflow-x-auto'>
                    <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Image</th>
                                <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Name</th>
                                <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Date/Time</th>
                                <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Action</th>
                                <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Delete</th>
                            </tr>
                        </thead >
                        <tbody>
                            {users.map((product) => (
                                <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                        <img
                                            src={product.image || 'placeholder.jpg'}
                                            alt={product.name}
                                            className="lg:w-16  lg:h-16  object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="border text-sm md:text-md border-gray-300  dark:border-gray-600 px-4 py-2">{product.name}</td>
                                    <td className="border text-sm md:text-md border-gray-300  dark:border-gray-600 px-4 py-2">{product.email}</td>
                                    <td className="border text-sm md:text-md border-gray-300  dark:border-gray-600 px-4 py-2">{product.dateTime[0] + ", " + product.dateTime[1]}</td>
                                    <td className="border text-sm md:text-md border-gray-300  dark:border-gray-600 px-4 py-2">
                                        {product?.role === "moderator" ? (<button onClick={() => makeAdmin(product._id, product.name)}

                                            className="bg-red-500 btn text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            Admin
                                        </button>) : product?.role === "admin" ? (<p>Admin</p>) : (<button onClick={() => makeModerator(product._id, product.name)}

                                            className="bg-blue-500 btn text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        >
                                            Moderator
                                        </button>)}
                                    </td>
                                    <td className="border text-sm md:text-md border-gray-300  dark:border-gray-600 px-4 py-2">
                                        <button onClick={() => handleDelete(product._id, product.name)}

                                            className="bg-red-500 btn text-white px-3 py-1 rounded-md hover:bg-red-600"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                <path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" />
                                            </svg>

                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div>)}
            </div >
        </div >
    )
}

export default ManageUsers