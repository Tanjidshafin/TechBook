import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';
import { useNavigate } from 'react-router';


const AxiosPublic = () => {
    const navigate = useNavigate()
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
        signOut(auth)
            .then(res => {
                localStorage.removeItem("token")
                navigate("/login")
            })
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
    return AxiosLink
}

export default AxiosPublic