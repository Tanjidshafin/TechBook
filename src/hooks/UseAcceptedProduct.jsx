import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AxiosPublic from '../context/AxiosPublic'

const UseAcceptedProduct = () => {
    const AxiosLink = AxiosPublic()
    const { data: acceptedProducts = [], refetch: acceptedProductRefetched, isFetching: acceptedLoading } = useQuery({
        queryKey: ["acceptedProducts"],
        queryFn: async () => {
            const res = await AxiosLink.get("/products/accepted")
            return res.data
        }
    })
    return [acceptedProducts, acceptedProductRefetched, acceptedLoading]
}

export default UseAcceptedProduct