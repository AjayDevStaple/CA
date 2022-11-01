import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate , Route } from 'react-router-dom'


function UserRoute({ children }) {
    const { token,uerType } = useSelector(state => state?.userProfile?.userData)
    return uerType=='2' ? children : <Navigate to="/login" />;
}


export default UserRoute;