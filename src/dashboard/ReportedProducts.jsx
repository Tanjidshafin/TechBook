import React from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiTrash2, FiAlertTriangle } from 'react-icons/fi';
import UseReported from '../hooks/UseReported';
import UseProducts from '../hooks/UseProducts';
import AxiosPublic from '../context/AxiosPublic';
import Swal from 'sweetalert2';
import DataTable from './DataTable';
import { useNavigate } from 'react-router';

const ReportedProducts = () => {
  const [reportedProducts, reportedRefetched, isFetching] = UseReported();
  const [, productRefetched] = UseProducts();
  const AxiosLink = AxiosPublic();
  const navigate = useNavigate()
  const handleDelete = async (id, _id) => {
    try {
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
    }
  };

  const columns = [
    {
      header: 'Product',
      accessor: 'name',
      render: (item) => (
        <div className="flex items-center">
          <img
            src={item.image || '/placeholder.jpg'}
            alt={item.name}
            className="h-10 w-10 rounded-full object-cover mr-3"
          />
          <div>
            <div className="font-medium text-gray-900 dark:text-white">
              {item.name}
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              {item.speciality}
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Reported Date',
      accessor: 'reportedDate',
      render: (item) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(item.reportedDate).toLocaleDateString()}
        </span>
      )
    }
  ];

  const actions = [
    {
      label: 'View Details',
      icon: FiEye,
      variant: 'default',
      onClick: (item) => navigate(`/product/${item.id}`)
    },
    {
      label: 'Delete',
      icon: FiTrash2,
      variant: 'danger',
      onClick: (item) => handleDelete(item.id, item._id)
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8"
    >
      <DataTable
        title="Reported Products"
        description="Review and manage products that have been reported by users"
        data={reportedProducts}
        columns={columns}
        actions={actions}
        isLoading={isFetching}
        emptyState={{
          message: "No reported products at this time.",
          icon: FiAlertTriangle
        }}
      />
    </motion.div>
  );
};

export default ReportedProducts;
