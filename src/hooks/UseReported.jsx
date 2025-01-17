import { useQuery } from '@tanstack/react-query'
import React from 'react'
import AxiosPublic from '../context/AxiosPublic'

const UseReported = () => {
    const AxiosLink = AxiosPublic()
    const { data: reportedProducts = [], refetch: reportedRefetched } = useQuery({
        queryKey: ['reportedProducts'],
        queryFn: async () => {
            const res = await AxiosLink.get("/reported-products")
            return res.data
        }
    })
    return [reportedProducts, reportedRefetched]
}

export default UseReported