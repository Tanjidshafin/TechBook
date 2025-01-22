import React from 'react'
import Banner from '../components/Banner'
import Featured from '../components/Featured'
import { Helmet } from 'react-helmet-async'
import Trending from '../components/Trending'
import Pricing from '../components/Pricing'

const Home = () => {

    return (

        <div>
            <Helmet>
                <title>TechBook | Home</title>
            </Helmet>
            <Banner />
            <Featured />
            <Trending />
            <Pricing />
        </div>
    )
}

export default Home