import React, { useContext, useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { ScreenMode } from '../pages/SignInPage';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const SignInForm = ({ onSwitchMode }) => {

    const [voterId, setId] = useState("");
    const [password, setPassword] = useState("");
    const nevigate = useNavigate()
    // const { setAuth } = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:8080/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ voterId, password })
            });
            let token = await res.json();
            console.log(token);
            if (token) {
                localStorage.setItem('token', token);
                nevigate("/");
            } else {
                alert("wrong credentials");
            }
        } catch (err) {
            console.log(err);
            alert("login failed");
        }
    }



    const onFinish = (values) => {
        console.log('Received values:', values);
    };

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#393E46"
    };

    const formStyle = {
        background: "#ffffff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        width: "400px"
    };

    const inputStyle = {
        borderRadius: "10px",
        height: "45px"
    };

    const buttonStyle = {
        width: "100%",
        height: "45px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "#1890ff",
        borderRadius: "10px",
        marginTop: "20px",
        color: "#000000",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
            backgroundColor: "#0050b3"
        }
    };

    const registerLinkStyle = {
        marginTop: "20px",
        textAlign: "center"
    };

    return (
        <div style={containerStyle}>
            <section style={formStyle}>
                <Title level={3} style={{ textAlign: 'center', fontWeight: "bold", marginBottom: "30px", color: "#1890ff" }}>
                    नमस्ते, Voters
                </Title>
                <Text style={{ textAlign: 'center', marginBottom: "20px", color: "#666666" }}>
                    Please provide your 10-digit Voter ID and password to proceed.
                </Text>
                <Form
                    name="signInForm"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="voterId"
                        rules={[{ required: true, message: 'Please enter your Voter ID!' }]}

                    >
                        <Input style={{ ...inputStyle, marginBottom: "20px" }} onChange={(e) => setId(e.target.value)} placeholder="Enter 10 digit Voter ID" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password style={inputStyle} placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={handleLogin} style={buttonStyle}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <Text style={registerLinkStyle}>
                    Don't have an account?
                    <Link to="/SignIn" className="nav-link login" onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}>Register now</Link>
                </Text>
            </section>
        </div>
    );
}

export default SignInForm;
