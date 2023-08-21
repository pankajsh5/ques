import React,{ useState,useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { autoLoginUser } from '../../features/userSlice';
import { USER_STATUS } from '../../features/userSlice';

function PersistentUser() {

  const [tried, setTried] = useState(false);
  const userStatus = useSelector((state)=>state.user.status);
  const dispatch = useDispatch();
  useEffect(()=>{
    if( !tried && userStatus===USER_STATUS.loggedout ){
      dispatch(autoLoginUser());
      setTried(true);
    }
  },[userStatus]);

  // console.log('here');

  if( tried && userStatus!==USER_STATUS.waiting  )
    return <Outlet />
  else 
    return <div>Loading ...</div>

}

export default PersistentUser