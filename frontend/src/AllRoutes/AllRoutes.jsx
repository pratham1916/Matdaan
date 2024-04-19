import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
import About from '../pages/About';
import Vote from '../pages/Vote';
import Result from '../pages/Result';
import Contact from '../pages/Contact';
import PrivateRoute from './PrivateRoutes';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/vote' element={<PrivateRoute><Vote /></PrivateRoute>}></Route>
                <Route path='/result' element={<PrivateRoute><Result /></PrivateRoute>}></Route>
                <Route path='/contact' element={<Contact />}></Route>
                <Route path='/login' element={<SignInForm />}></Route>
                <Route path='/register' element={<SignUpForm />}></Route>
            </Routes>
        </div>
    )
}

export default AllRoutes
