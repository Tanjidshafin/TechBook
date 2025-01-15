import React from 'react'
import Banner from '../components/Banner'
import Featured from '../components/Featured'
import { Helmet } from 'react-helmet-async'
import Trending from '../components/Trending'

const Home = () => {
    <Helmet>
        <title>TechBook || Home</title>
    </Helmet>
    return (
        <div>
            <Banner />
            <Featured />
            <Trending />
        </div>
    )
}

export default Home