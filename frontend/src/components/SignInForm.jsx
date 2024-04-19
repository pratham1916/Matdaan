import React, { useState } from 'react';
import { Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from "../images/login2.jpg"
import "../Styles/login-register.css";

const  Text  = Typography;

const SignInForm = () => {
    const [voterId, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { voterId, password });
            const token = response.data;
            if (token) {
                localStorage.setItem('token', token);
                navigate("/");
            } else {
                alert("Wrong credentials");
            }
        } catch {
            alert("Login failed");
        }
    };

    return (

        <div className='container'>
            <div className="left-container">
                <img src={login} alt="login-img" />
            </div>
            <div className="right-container">
                <h1 className="title">Welcome to Your Voting Portal: Every Vote Matters</h1>
                <p className="description">
                    Join the democratic journey by entering your 10-digit Voter ID and password to cast your vote. Every vote is a voice that shapes the future.
                </p>
                <Form name="signInForm" initialValues={{ remember: true }}>
                    <Form.Item name="voterId" rules={[{ required: true, message: 'Please enter your Voter ID!' }]}>
                        <Input className="input" onChange={(e) => setId(e.target.value)} placeholder="Enter 10 digit Voter ID" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
                        <Input.Password className="input" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Text className="signin-register-link"> Don't have an account?
                        <Link to="/register" className="signin-nav-link" >Register now</Link>
                    </Text>
                    <Form.Item>
                        <button onClick={handleLogin} className="button btn"> Login </button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
};

export default SignInForm;
