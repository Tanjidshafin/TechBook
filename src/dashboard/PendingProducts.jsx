import React, { useState } from 'react'
import UseProducts from '../hooks/UseProducts'
import AxiosPublic from '../context/AxiosPublic'
import Swal from 'sweetalert2'
import Lottie from 'lottie-react'
import noData from "../assets/No_ data.json"

const PendingProducts = () => {
  const [products, productRefetched] = UseProducts()
  const AxiosLink = AxiosPublic()
  const [loading, setLoading] = useState(false)
  const pendingProducts = products.filter(product => product.status === "pending")
  const handleAccepted = async (id) => {
    try {
      setLoading(true)
      await AxiosLink.patch(`/accepted-product/${id}`)
        .then(res => {
          Swal.fire({
            title: "Are you sure?",
            text: "You want to accept the Product",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Accepted",
                text: "Product has been accepted",
                icon: "success"
              });
              productRefetched()
            }
          });
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
            title: "Are you sure?",
            text: "You want to reject the Product",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Rejected",
                text: "Product has been rejected",
                icon: "success"
              });
              productRefetched()
            }
          });
        })
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }
  return (
    <div>
      <p className="text-3xl font-bold text-center mt-10">Pending Products</p>
      <div>
        {pendingProducts.length === 0 ? (<div
          className="boxShadow p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
          <Lottie animationData={noData} loop={true} className='w-[200px]' />
          <h1 className="text-[1.4rem] mt-6 font-[500] text-black dark:text-gray-300">No Products to Show...</h1>
          <p className="text-[0.9rem] text-gray-500">Be the first to add the first product.</p>
        </div>) : (<table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-600 mt-5">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Accept</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Reject</th>
            </tr>
          </thead >
          <tbody>
            {pendingProducts.map((product) => (
              <tr key={product._id} className="even:bg-gray-100 dark:even:bg-gray-800">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <img
                    src={product.mainImage || 'placeholder.jpg'}
                    alt=""
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <button onClick={() => handleAccepted(product._id)}
                    className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600"
                  >
                    Accept
                  </button>
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  <button onClick={() => handleRejected(product._id)}
                    className="px-3 py-1 rounded text-white bg-red-500 hover:bg-red-600"
                  >
                    Reject
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

export default PendingProducts