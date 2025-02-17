import React, { useState } from 'react'
import UseProducts from '../hooks/UseProducts'
import AxiosPublic from '../context/AxiosPublic'
import Swal from 'sweetalert2'
import Lottie from 'lottie-react'
import noData from "../assets/No_ data.json"
import { NavLink } from 'react-router'
import { FcAcceptDatabase } from "react-icons/fc";
import { Bars } from 'react-loader-spinner'
const PendingProducts = () => {
  const [products, productRefetched, isFetching] = UseProducts()
  const AxiosLink = AxiosPublic()
  const [loading, setLoading] = useState(false)
  const pendingProducts = products.filter(product => product.status === "pending")
  const handleAccepted = async (id) => {
    try {
      setLoading(true)
      await AxiosLink.patch(`/accepted-product/${id}`)
        .then(res => {
          Swal.fire({
            title: "Accepted",
            text: "Product has been accepted",
            icon: "success"
          });
          productRefetched()
        })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }
  const handleRejected = async (id) => {
    try {
      setLoading(true)
      await AxiosLink.patch(`/rejected-product/${id}`)
        .then(res => {
          Swal.fire({
            title: "Rejected",
            text: "Product has been rejected",
            icon: "success"
          });
          productRefetched()
        })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }
  const handleFeatured = async (id) => {
    try {
      setLoading(true)
      await AxiosLink.patch(`/featured/${id}`)
        .then(res => {
          Swal.fire({
            title: "Featured",
            text: "Product has been Featured",
            icon: "success"
          });
          productRefetched()
        })
    } catch (err) {
      console.log(err);
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
      <p className="text-3xl font-bold text-center mt-10">Pending Products</p>
      <div>
        {pendingProducts.length === 0 ? (<div
          className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
          <Lottie animationData={noData} loop={true} className='w-[200px]' />
          <h1 className="text-[1.4rem] mt-6 font-[500] text-black text-center dark:text-gray-300">No Products to Show...</h1>
          <p className="text-[0.9rem] text-gray-500 text-center">Be the first to add the first product.</p>
        </div>) : (<div className='overflow-x-auto'><table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Accept</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Reject</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Featured</th>
              <th className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2 text-left">Details</th>
            </tr>
          </thead >
          <tbody>
            {pendingProducts.map((product) => (
              <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <img
                    src={product.mainImage || 'placeholder.jpg'}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <button onClick={() => handleAccepted(product._id)}
                    className="px-3 btn py-1 rounded text-white bg-green-500 hover:bg-green-600"
                  >
                    <FcAcceptDatabase className='text-[1.5rem]' />
                  </button>
                </td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <button onClick={() => handleRejected(product._id)}
                    className="px-3 py-1 btn rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                    </svg>

                  </button>
                </td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <button disabled={product.speciality === "featured"} onClick={() => handleFeatured(product._id)}
                    className="px-3 btn py-1 rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
                    </svg>

                  </button>
                </td>
                <td className="border border-gray-300 text-sm md:text-md dark:border-gray-600 px-4 py-2">
                  <NavLink to={`/product/${product._id}`}
                    className="px-3 btn py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600"
                  >
                    <FcAcceptDatabase className='text-[1.5rem]' />
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table ></div>)}
      </div >
    </div >
  )
}

export default PendingProducts