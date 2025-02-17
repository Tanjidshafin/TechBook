"use client"

import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { AwesomeButton } from "react-awesome-button"
import Swal from "sweetalert2"
import { AppContext } from "../context/AppContext"
import PageStarter from "../hooks/PageStarter"
import UseProductsTrending from "../hooks/UseProductsTrending"
import AxiosPublic from "../context/AxiosPublic"
import NoProductsFound from "./NoProductFound"
import ProductGrid from "./ProductCardGrid"


const Trending = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const [Trendingproducts, refetch] = UseProductsTrending()
    const AxiosLink = AxiosPublic()
    const [loading, setLoading] = useState(false)

    const handleUpvote = async (id, name) => {
        try {
            if (!user) {
                Swal.fire({
                    title: "You are not logged in!",
                    text: "Please login to interact",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Go to Login",
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/login")
                    }
                })
            } else {
                setLoading(true)
                await AxiosLink.patch(`product/${id}`)
                Swal.fire({
                    title: "Upvoted",
                    text: `You have upvoted ${name}`,
                    icon: "success",
                })
                refetch()
            }
        } catch (error) {
            console.error(error)
            Swal.fire({
                title: "Error",
                text: "An error occurred while upvoting",
                icon: "error",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-20 px-4 sm:px-6 lg:px-8">
            <PageStarter
                title="Trending Products"
                subTitle="Discover the hottest tech products making waves in the industry. See what's capturing everyone's attention right now."
            />
            {Trendingproducts.length === 0 ? (
                <NoProductsFound />
            ) : (
                <ProductGrid products={Trendingproducts} isLoading={loading} onUpvote={handleUpvote} user={user} />
            )}
            <div className="mt-8 flex justify-center md:justify-end">
                <NavLink to="/products">
                    <AwesomeButton type="secondary">View All Products</AwesomeButton>
                </NavLink>
            </div>
        </div>
    )
}

export default Trending

