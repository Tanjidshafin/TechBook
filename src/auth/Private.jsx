import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate, useLocation } from 'react-router'
import { Bars } from 'react-loader-spinner'

const Private = ({ children }) => {
    const location = useLocation()
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200)
    }, [])
    if (loading) {
        return <div className='min-h-screen flex justify-center items-center'><Bars
            height="80"
            width="80"
            color="#ced4da"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        /></div>
    }
    if (user) {
        return children
    }
    return <Navigate to="/login" state={location?.pathname}></Navigate>
}

export default Private