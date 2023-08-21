import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import ham from '../../assets/hamburger.svg';
import close from '../../assets/cross.svg';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { USER_STATUS,logoutUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

function Navbar() {

  const { username,status,email } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const hideNavbar = () => {
    const navbar = document.querySelector("nav");
    const show = navbar.classList.contains('shownav');
    if (show)
      navbar.classList.remove('shownav');
  }

  const showNavbar = () => {
    const navbar = document.querySelector("nav");
    const show = navbar.classList.contains('shownav');
    if (!show)
      navbar.classList.add('shownav');
  }

  return (
    <header>
      <img src={ham} alt="ham" id='ham' onClick={showNavbar} />
      <img src={logo} alt="logo" id='logo' />
      <nav className='glass'>
        <img src={close} alt="" id='close' onClick={hideNavbar} />
        <NavLink className='navlink' to='/'>Home</NavLink>
        <NavLink className='navlink' to='/login'>Login</NavLink>
        <NavLink className='navlink' to='/register'>Register</NavLink>
        <NavLink className='navlink' to='/challenge'>Challenge</NavLink>
        {
          status === USER_STATUS.loggedin ?
          <NavLink onClick={()=> dispatch(logoutUser({email})) } id='username' className='navlink' to='/'>
            Logout @{username}
          </NavLink>:
          <span></span> 
        }
      </nav>
    </header>
  )
}

export default Navbar