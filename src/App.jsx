import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Form/Login';
import Register from './components/Form/Register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Challenge from './components/Challenge/Challenge';
import Question from './components/Question/Question';
import AddQuestion from './components/AddQuestion/AddQuestion';
import Solution from './components/Solution/Solution';
import Home from './components/Home/Home';
import PersistentUser from './components/PersistentUser/PersistentUser';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Routes>

      <Route path='/'
        element={<>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Navbar />
          <Outlet />
        </>}
      >
        <Route path='/' element={<PersistentUser />} >
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<ProtectedRoute />}>
            <Route path='/challenge' element={<Challenge />} />
            <Route path='/question/:id' element={<Question />} />
            <Route path='/addquestion/:id' element={<AddQuestion />} />
            <Route path='/solution/:id' element={<Solution />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App