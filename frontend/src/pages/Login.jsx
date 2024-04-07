import React from 'react'
import "../Styles/login.css"

const Login = () => {
    return (
        <div>
            <form action="#" className="login-form">
                <h1 className="login-title">Login</h1>

                <div className="input-box">
                    <i className='bx bxs-user'></i>
                    <input type="text" placeholder="Username" />
                </div>
                <div className="input-box">
                    <i className='bx bxs-lock-alt'></i>
                    <input type="password" placeholder="Password" />
                </div>

                <div className="remember-forgot-box">
                    <label htmlFor="remember">
                        <input type="checkbox" id="remember" />
                        Remember me
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>

                <button className="login-btn">Login</button>

                <p className="register">
                    Don't have an account?
                    <a href="#"><b>Register</b></a>
                </p>
            </form>
        </div>
    );
}

export default Login
