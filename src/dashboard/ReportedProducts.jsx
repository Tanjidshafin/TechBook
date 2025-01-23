import React, { useState } from 'react'
import UseReported from '../hooks/UseReported'
import Lottie from 'lottie-react'
import noData from "../assets/No_ data.json"
import { NavLink } from 'react-router'
import Swal from 'sweetalert2'
import AxiosPublic from '../context/AxiosPublic'
import UseProducts from '../hooks/UseProducts'
import { CiViewList } from "react-icons/ci";
const ReportedProducts = () => {
  const [reportedProducts, reportedRefetched] = UseReported()
  const [, productRefetched] = UseProducts()
  const [loading, setLoading] = useState(false)
  const AxiosLink = AxiosPublic()
  const handleDelete = async (id, _id) => {
    try {
      setLoading(true);
      await AxiosLink.delete(`/delete-product/${id}`);
      await AxiosLink.delete(`/delete-reported/${_id}`);
      Swal.fire({
        title: "Deleted!",
        text: "Your Product has been deleted successfully.",
        icon: "success",
      });
      productRefetched();
      reportedRefetched();
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue deleting the product. Please try again.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-3xl font-bold text-center mt-10">Reported Products</p>
      <div>
        {reportedProducts.length === 0 ? (<div
          className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
          <Lottie animationData={noData} loop={true} className='w-[200px]' />
          <h1 className="text-[1.4rem] mt-6 font-[500] text-black text-center dark:text-gray-300">No Reported Products to Show...</h1>
          <p className="text-[0.9rem] text-center text-gray-500">No Reported Products available in database.</p>
        </div>) : (<div className='overflow-x-auto'><table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Speciality</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Vew Details</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead >
          <tbody>
            {reportedProducts.map((product) => (
              <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <img
                    src={product.mainImage || 'placeholder.jpg'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">{product.speciality}</td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <NavLink to={`/product/${product.id}`}

                    className="bg-blue-500 btn text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    <CiViewList className='text-[1.5rem]' />
                  </NavLink>
                </td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <button
                    onClick={() => handleDelete(product.id, product._id)}
                    className="bg-red-500 btn text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                    </svg>

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table ></div>)}
      </div >
    </div >
  )
}

export default ReportedProducts