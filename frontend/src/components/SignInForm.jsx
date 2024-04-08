import React, { useContext, useState } from 'react';
import { Form, Input, Radio, Select, DatePicker, Alert, message } from 'antd'
import { ScreenMode } from '../pages/SignInPage';


const SignInForm = ({ onSwitchMode }) => {

    const [form] = Form.useForm();

    const formstyle = { background: "white", padding: "15px", borderRadius: "20px" }
    const regtext = { margin: "0 0 0 65px", width: "300px" }
    
    return (
        <section style={{ ...formstyle, margin: "180px 50px 0 50px" }}>
            <h3 style={{ textAlign: 'center', fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>Please enter your Voter ID And Password</h3>
            <Form form={form}>
                <Form.Item name='voterId'>
                    <Input style={{ margin: "20px 0 0 65px", width: "300px", borderRadius: "10px", height: "35px" }} placeholder='Enter 10 digit voter Id' required />
                </Form.Item>
                <Form.Item name='password'>
                    <Input.Password style={{ margin: "0 0 0 65px", width: "300px", borderRadius: "10px", height: "35px" }} placeholder='Enter password' required />
                </Form.Item>
                <Form.Item>
                    <button style={{ fontSize: "11px", marginLeft: "170px" }} htmlType='submit'>Login</button>
                </Form.Item>
                
            </Form>
            <h2><a href="#" onClick={() => onSwitchMode(ScreenMode.SIGN_UP)}>Register</a></h2>
        </section>
    );
}

export default SignInForm
