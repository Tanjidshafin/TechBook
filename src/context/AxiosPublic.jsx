import axios from 'axios';
import React from 'react'

const AxiosPublic = () => {
    const AxiosLink = axios.create({
        baseURL: 'http://localhost:5000/'
    });
    AxiosLink.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token")
        config.headers.authorization = `Bearer ${token}`
        // Do something before request is sent
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    AxiosLink.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        console.log(error.response);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
    return AxiosLink
}

export default AxiosPublic