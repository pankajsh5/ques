import axios from 'axios';
import { toast } from 'react-toastify';

const ax = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_BASE_URL}`
});

export const loginUserApi = async({ email,password,from,navigate }, thunkApi)=>{

    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;

    if( !email || !password ){
      toast('all fields are required',{ type : 'error' });
      return;
    }
    if (!emailRegex.test(email)) {
      toast('invalid email format',{ type : 'error' });
      return;
    }

    const t = toast.loading('logging in');
    try {
      const res = await ax.post('user/login',{ email,password });
      toast.update(t,{render: `Logged in as "${res.data.username}"`, isLoading : false, type : 'success',autoClose : true,closeOnClick : true });
      // console.log(res);
      navigate(from, { replace: true });
      localStorage.setItem('jwt_question_set',res.data.refreshToken);
      return {...res.data,email};
    } catch (error) {
      toast.update(t,{render : `Login failed : ${error.response.data.message}`, isLoading : false,type : 'error',autoClose : true,closeOnClick : true });
      // console.log(error);
      return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const registerUserApi = async({ username,email,password,navigate },thunkApi)=>{
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!username || !email || !password) {
      toast('all fields are required', { type: 'error' });
      return;
    }
    if (!emailRegex.test(email)) {
      toast('invalid email format', { type: 'error' });
      return;
    }

    // if (!passRegex.test(password)) {
    //   toast('invalid password format', { type: 'error' });
    //   return;
    // }

    const t = toast('registering user',{ isLoading:true });
    try {
      await ax.post('user/register', { email, username, password });
      toast.update(t,{ isLoading : false, type : 'success',autoClose : true });
      navigate('/login');
    } catch (error) {
      toast.update(t,{ isLoading : false, type : 'error',autoClose : true });
    }
}

export const autoLoginUserApi = async()=>{
  const refreshToken = localStorage.getItem('jwt_question_set');

  const t = toast.loading('logging in');
  try {
    const res = await ax.post('user/autologin',{ refreshToken });
    toast.update(t,{render: `Logged in as "${res.data.username}"`, isLoading : false, type : 'success',autoClose : true,closeOnClick : true });
    // console.log(res.data);
    return { ...res.data };
  } catch (error) {
    console.log(error);
    toast.update(t,{render : `Login failed : ${error.response.data.message}`, isLoading : false,type : 'error',autoClose : true,closeOnClick : true });    
    return thunkApi.rejectWithValue({ message: error.response.data.message });
  }
}

export const logoutUserApi = async({email},thunkApi)=>{
  const t = toast.loading('logging out');
  try {
    await ax.post('user/logout',{ email });
    toast.update(t,{render : `user logged out`, isLoading : false,type : 'success',autoClose : true,closeOnClick : true });    
    localStorage.removeItem('jwt_question_set');
    return "";
  } catch (error) {
    toast.update(t,{render : `some error occured`, isLoading : false,type : 'error',autoClose : true,closeOnClick : true });    
    return thunkApi.rejectWithValue({ message: error.response.data.message });
  }
}

export const refreshTokenApi = async(thunkApi)=>{
  const refreshToken = localStorage.getItem('jwt_question_set') || '';
  try {
    const res = await ax.post('user/refresh',{ refreshToken });
    return { ...res.data };
  } catch (error) {
    return thunkApi.rejectWithValue({ message: error.response.data.message });
  }
}
