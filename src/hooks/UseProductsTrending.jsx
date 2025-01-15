import React from 'react'
import AxiosPublic from '../context/AxiosPublic'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const UseProductsTrending = () => {
    const AxiosLink = AxiosPublic()
    const { data: Trendingproducts=[], refetch } = useQuery({
        queryKey: ['Trendingproducts'],
        queryFn: async () => {
            const res = await axios.get("http://localhost:5000/products/trending")
            return res.data
        }
    })
    return [Trendingproducts]
}

export default UseProductsTrending