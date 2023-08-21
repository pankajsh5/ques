import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../features/userSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';

function isTokenExpired(token) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
}

const ax = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}`,
});

function usePrivateAxios() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let accessToken = useSelector(state=>state.user.accessToken);


    useEffect(() => {
        const reqInterceptor = ax.interceptors.request.use(
            async (config) => {
                // console.log('axios interceptors');
                config.headers['Authorization'] = `Bearer ${accessToken}`;
                if( isTokenExpired(accessToken) ){
                    try {
                        const res = await dispatch(refreshToken());
                        config.headers['Authorization'] = `Bearer ${res.payload.accessToken}`;
                    } catch (error) {
                        toast.warning('Refresh token expired: login again');
                        navigate('/login',{ state : { from : location.pathname } });
                        return new axios.Cancel('Operation canceled by the user.');
                    }
                }
                // console.log(config);
                return config;
            },
            (error) => Promise.reject(error)
        )

        return () => {
            // console.log('removed');
            ax.interceptors.request.eject(reqInterceptor);
        }
    }, []);

    return ax;
}

export default usePrivateAxios