"use client"

import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router"
import { AwesomeButton } from "react-awesome-button"
import Swal from "sweetalert2"
import { AppContext } from "../context/AppContext"
import PageStarter from "../hooks/PageStarter"
import UseAcceptedProduct from "../hooks/UseAcceptedProduct"
import AxiosPublic from "../context/AxiosPublic"
import NoProductsFound from "./NoProductFound"
import ProductGrid from "./ProductCardGrid"


const Featured = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()
    const AxiosLink = AxiosPublic()
    const [acceptedProducts, acceptedProductRefetched, acceptedLoading] = UseAcceptedProduct()
    const [loading, setLoading] = useState(false)
    const FeaturedProducts = acceptedProducts
        .filter((product) => product?.speciality === "featured")
        .sort((a, b) => {
            const timeA = parseTime(a.time)
            const timeB = parseTime(b.time)
            return timeA - timeB
        })

    function parseTime(timeStr) {
        if (!timeStr) return 0
        const [time, modifier] = timeStr.split(" ")
        let [hours, minutes, seconds] = time.split(".").map(Number)
        if (modifier === "PM" && hours !== 12) {
            hours += 12
        } else if (modifier === "AM" && hours === 12) {
            hours = 0
        }
        return hours * 3600 + minutes * 60 + seconds
    }

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
                acceptedProductRefetched()
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
                title="Featured Products"
                subTitle="Discover top-rated tech innovations in our Featured Products section. Explore cutting-edge tools, software, and apps handpicked for you."
            />
            {FeaturedProducts.length === 0 ? (
                <NoProductsFound />
            ) : (
                <ProductGrid products={FeaturedProducts} isLoading={acceptedLoading} onUpvote={handleUpvote} user={user} />
            )}
            <div className="mt-8 flex justify-center md:justify-end">
                <NavLink to="/products">
                    <AwesomeButton type="secondary">View All Products</AwesomeButton>
                </NavLink>
            </div>
        </div>
    )
}

export default Featured

