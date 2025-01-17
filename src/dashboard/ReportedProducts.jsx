import React, { useState } from 'react'
import UseReported from '../hooks/UseReported'
import Lottie from 'lottie-react'
import noData from "../assets/No_ data.json"
import { NavLink } from 'react-router'
import Swal from 'sweetalert2'
import AxiosPublic from '../context/AxiosPublic'
import UseProducts from '../hooks/UseProducts'
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
          <h1 className="text-[1.4rem] mt-6 font-[500] text-black dark:text-gray-300">No Reported Products to Show...</h1>
          <p className="text-[0.9rem] text-gray-500">No Reported Products available in database.</p>
        </div>) : (<table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Speciality</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Action</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead >
          <tbody>
            {reportedProducts.map((product) => (
              <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <img
                    src={product.mainImage || 'placeholder.jpg'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{product.speciality}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <NavLink to={`/product/${product.id}`}

                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </NavLink>
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <button
                    onClick={() => handleDelete(product.id, product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table >)}
      </div >
    </div >
  )
}

export default ReportedProducts