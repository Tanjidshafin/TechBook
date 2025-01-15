import axios from 'axios';
import React from 'react'

const AxiosPublic = () => {
    const AxiosLink = axios.create({
        baseURL: 'http://localhost:5000/'
    });
    return AxiosLink
}

export default AxiosPublic