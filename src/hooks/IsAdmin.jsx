import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import AxiosPublic from '../context/AxiosPublic'

const IsAdmin = () => {
    const { user } = useContext(AppContext)
    const AxiosLink = AxiosPublic()
    const { data: isAdmin = false, refetch } = useQuery({
        queryKey: ["isAdmin", user?.email],
        queryFn: async () => {
            const res = await AxiosLink.get(`/admin/${user.email}`)
            return res.data.isAdmin
        }
    })
    return [isAdmin]
}

export default IsAdmin