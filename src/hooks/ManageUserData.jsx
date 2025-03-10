import { useQuery } from '@tanstack/react-query'
import AxiosPublic from '../context/AxiosPublic'

const ManageUserData = () => {
    const AxiosLink = AxiosPublic()
    const { data: users = [], refetch: userRefetched, isFetching } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await AxiosLink.get("/users")
            return res.data
        }
    })
    return [users, userRefetched, isFetching]
}

export default ManageUserData