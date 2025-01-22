import { useQuery } from '@tanstack/react-query'
import React, { useContext, } from 'react'
import { AppContext } from '../context/AppContext'
import AxiosPublic from '../context/AxiosPublic'

const IsSubscription = () => {
    const AxiosLink = AxiosPublic()
    const { user } = useContext(AppContext)
    const { data: isSubscription = [], refetch: subscriptionRefetched } = useQuery({
        queryKey: ["isSubscription", user?.email],
        queryFn: async () => {
            const res = await AxiosLink.get(`/subscriptions/${user?.email}`)
            return res.data.isSubscription
        }
    })
    return [isSubscription, subscriptionRefetched]
}

export default IsSubscription