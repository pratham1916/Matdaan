import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { ScreenMode } from '../pages/SignInPage';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import "../Styles/SignInForm.css";

const { Title, Text } = Typography;

const SignInForm = ({ onSwitchMode }) => {
    const [voterId, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', {
                voterId,
                password
            });

            const token = response.data;
            if (token) {
                localStorage.setItem('token', token);
                navigate("/");
            } else {
                alert("Wrong credentials");
            }
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="container">
            <section className="form-section">
                <Title level={3} className="form-title">नमस्ते, Voters</Title>
                <Text className="form-description">
                    Please provide your 10-digit Voter ID and password to proceed.
                </Text>
                <Form
                    name="signInForm"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="voterId"
                        rules={[{ required: true, message: 'Please enter your Voter ID!' }]}
                    >
                        <Input className="input-style" onChange={(e) => setId(e.target.value)} placeholder="Enter 10 digit Voter ID" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password className="input-style" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleLogin} className="login-button">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Text className="register-link">
                    Don't have an account?
                    <Link to="/SignIn" className="nav-link login" onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}>Register now</Link>
                </Text>
            </section>
        </div>
    );
};

export default SignInForm;
