import React from 'react'
import AxiosPublic from '../context/AxiosPublic'
import { useQuery } from '@tanstack/react-query'


const UseProductsTrending = () => {
    const AxiosLink = AxiosPublic()
    const { data: Trendingproducts = [], refetch, isFetching: trendingLoading } = useQuery({
        queryKey: ['Trendingproducts'],
        queryFn: async () => {
            const res = await AxiosLink.get("/products/trending")
            return res.data
        }
    })
    return [Trendingproducts, refetch, trendingLoading]
}

export default UseProductsTrending