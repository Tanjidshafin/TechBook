import React from 'react'
import AxiosPublic from '../context/AxiosPublic'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const UseProductsTrending = () => {
    const AxiosLink = AxiosPublic()
    const { data: Trendingproducts = [], refetch } = useQuery({
        queryKey: ['Trendingproducts'],
        queryFn: async () => {
            const res = await AxiosLink.get("/products/trending")
            return res.data
        }
    })
    return [Trendingproducts, refetch]
}

export default UseProductsTrending