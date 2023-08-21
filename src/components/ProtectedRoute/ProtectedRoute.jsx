import React from 'react'
import { Outlet,useLocation,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { USER_STATUS } from '../../features/userSlice';


function ProtectedRoute() {

    const userStatus = useSelector(state=>state.user.status);
    const location = useLocation();

    switch (userStatus) {
        case USER_STATUS.loggedin:
            return <Outlet />
        case USER_STATUS.waiting:
            return <div>Loading ...</div>
        default :
            return <Navigate to={'/login'} state={{ from : location.pathname }} />
    }
}

export default ProtectedRoute;