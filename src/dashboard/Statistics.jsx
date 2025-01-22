import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import UseAcceptedProduct from '../hooks/UseAcceptedProduct';
import ManageUserData from '../hooks/ManageUserData';
import UseProducts from '../hooks/UseProducts';
import { useQuery } from '@tanstack/react-query';
import AxiosPublic from '../context/AxiosPublic';

const Statistics = () => {
  const [acceptedProducts] = UseAcceptedProduct();
  const [users] = ManageUserData();
  const [products] = UseProducts();
  const AxiosLink = AxiosPublic();
  // Fetch reviews data
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await AxiosLink.get(`/reviews`);
      return res.data;
    },
  });
  const [chartData, setChartData] = useState([]);
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];
  useEffect(() => {
    if (products && acceptedProducts && users && reviews) {
      const totalProducts = products.length;
      const pendingProducts = products.filter(
        (product) => product.status === 'pending'
      ).length;
      const acceptedProductsCount = acceptedProducts.length;
      const totalReviews = reviews.length;
      const totalUsers = users.length;
      const data = [
        { name: 'Accepted Products', value: acceptedProductsCount, color: colors[0] },
        { name: 'Pending Products', value: pendingProducts, color: colors[1] },
        { name: 'Total Products', value: totalProducts, color: colors[2] },
        { name: 'Reviews', value: totalReviews, color: colors[3] },
        { name: 'Users', value: totalUsers, color: colors[4] },
      ];

      setChartData(data);
    }
  }, [products, acceptedProducts, users, reviews]);

  return (
    <div>
      <p className="text-3xl font-bold text-center mt-10">Site Statistics</p>
      <div className="flex justify-center items-center">
        {chartData.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <p className='min-h-screen flex justify-center items-center'>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
