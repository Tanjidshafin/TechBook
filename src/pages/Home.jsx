import React from 'react'
import Banner from '../components/Banner'
import Featured from '../components/Featured'
import { Helmet } from 'react-helmet-async'
import Trending from '../components/Trending'
import Pricing from '../components/Pricing'
import CouponShower from '../components/CouponShower'
import Recent from '../components/Recent'
import Newsletter from '../components/NewsLetter'
import SalesPromotion from '../components/SalesPromotion'

const Home = () => {

    return (

        <div>
            <Helmet>
                <title>TechBook | Home</title>
            </Helmet>
            <Banner />
            <Recent />
            <Featured />
            <SalesPromotion />
            <Trending />
            <CouponShower />
            <Pricing />
            <Newsletter />
        </div>
    )
}

export default Home