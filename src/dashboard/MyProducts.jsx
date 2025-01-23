import React, { useContext, useState } from 'react'
import UseProducts from '../hooks/UseProducts'
import { AppContext } from '../context/AppContext'
import Lottie from 'lottie-react'
import noData from "../assets/No_ data.json"
import AxiosPublic from '../context/AxiosPublic'
import Swal from 'sweetalert2'
import { NavLink } from 'react-router'
import { MdDeleteForever } from "react-icons/md";
const MyProducts = () => {
  const { user } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const AxiosLink = AxiosPublic()
  const [products, productRefetched] = UseProducts()
  const ownProducts = products.filter(product => product.email === user.email)
  const handleDelete = async (id, status) => {
    try {
      setLoading(true)
      await AxiosLink.delete(`/delete-product/${id}`)
        .then(res => {
          if (status !== "rejected") {
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success"
            });
            productRefetched()
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "Your Product has been deleted.",
              icon: "success"
            });
            productRefetched()
          }
        })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <p className="text-3xl font-bold text-center mt-10">My Products</p>
      <div>
        {ownProducts.length === 0 ? (<div
          className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
          <Lottie animationData={noData} loop={true} className='w-[200px]' />
          <h1 className="text-[1.4rem] mt-6 font-[500] text-center text-black dark:text-gray-300">No Products to Show...</h1>
          <p className="text-[0.9rem] text-center text-gray-500">Be the first to add the first product.</p>
        </div>) : (<div className='overflow-x-auto'>
          <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Image</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Name</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Status</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Update</th>
                <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-sm md:text-md">Delete</th>
              </tr>
            </thead >
            <tbody>
              {ownProducts.map((product) => (
                <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                  <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                    <img
                      src={product.mainImage || 'placeholder.jpg'}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">{product.status}</td>
                  <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">
                    <NavLink to={`/updateUser/${product._id}`}

                      className="bg-blue-500 btn text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>

                    </NavLink>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 text-sm md:text-md px-4 py-2">
                    <button
                      onClick={() => handleDelete(product._id, product.status)}
                      className="bg-red-500 btn text-white px-3 py-1 rounded-md hover:bg-red-600"
                    >
                      <MdDeleteForever className='text-[1.5rem]' />
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

export default MyProducts