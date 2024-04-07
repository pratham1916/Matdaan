import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContexProvider'

const PrivateRoute = ({ children }) => {
    const { auth } = useContext(AuthContext)
    return (
        auth.isAuth ? children : <Navigate to={"/login"} />
    )
}

export default PrivateRoute