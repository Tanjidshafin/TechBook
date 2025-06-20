import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AxiosPublic from '../context/AxiosPublic'

const UseProducts = () => {
    const AxiosLink = AxiosPublic()
    const { data: products = [], refetch: productRefetched, isFetching } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await AxiosLink.get("/products")
            return res.data
        }
    })
    return [products, productRefetched, isFetching]
}

export default UseProducts