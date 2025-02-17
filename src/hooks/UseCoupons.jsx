import { useQuery } from '@tanstack/react-query'
import AxiosPublic from '../context/AxiosPublic'

const UseCoupons = () => {
    const AxiosLink = AxiosPublic()
    const { data: coupons = [], refetch: couponsRefetched, isFetching } = useQuery({
        queryKey: ["coupons"],
        queryFn: async () => {
            const res = await AxiosLink.get("/coupons")
            return res.data
        }
    })
    return [coupons, couponsRefetched, isFetching]
}

export default UseCoupons