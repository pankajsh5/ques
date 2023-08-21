import React, { useRef } from 'react';
import './Form.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { registerUserApi } from '../../api/User';

function Register() {

  const emailRef = useRef();
  const userRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const username = userRef.current.value;

    document.querySelector('.btn[color="green"')
    .setAttribute('disabled',true);
    document.querySelector('.btn[color="red"')
    .setAttribute('disabled',true);

    const r = registerUserApi({ email,password,username,navigate });
    r.finally(()=>{
      console.log('finally');
      document.querySelector('.btn[color="green"')
      .removeAttribute('disabled')
      document.querySelector('.btn[color="red"')
      .removeAttribute('disabled')
    })
  }


  const clear = (e) => {
    e.preventDefault();
    toast("all inputs cleared", {
      type: 'info',
    });
    emailRef.current.value = '';
    passRef.current.value = '';
  }

  return (
    <form className='box'>
      <h1>Register User</h1>
      <input ref={emailRef} className='input' type="email" id="email" placeholder='Email' />
      <input ref={userRef} type="text" className="input" id='username' placeholder='Username' />
      <input ref={passRef} className='input' type="password" id="password" placeholder='Password' />
      <div>
        <button className='btn' color='green' onClick={submit}>Submit</button>
        <button className='btn' color='red' onClick={clear}>Clear</button>
      </div>
    </form>
  )
}

export default Register