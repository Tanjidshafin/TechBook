import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import AxiosPublic from '../context/AxiosPublic'

const IsModerator = () => {
    const { user } = useContext(AppContext)
    const AxiosLink = AxiosPublic()
    const { data: isModerator = false, refetch } = useQuery({
        queryKey: ["isModerator", user?.email],
        queryFn: async () => {
            const res = await AxiosLink.get(`/moderator/${user.email}`)
            return res.data.isModerator
        }
    })
    return [isModerator]
}

export default IsModerator