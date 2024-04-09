import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, DatePicker, message } from 'antd';
import { State, City } from 'country-state-city';
import { keyBy } from 'lodash';
import { ScreenMode } from '../pages/SignInPage';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../Styles/SignUpForm.css';

const SignUpForm = ({ onSwitchMode }) => {
    const [form] = Form.useForm();

    const [allStates, setAllStates] = useState([]);
    const [currentState, setCurrentState] = useState(null);
    const [stateById, setStateById] = useState({});
    const [allCities, setAllCities] = useState([]);

    useEffect(() => {
        const sts = State.getStatesOfCountry("IN");
        setStateById(keyBy(sts, "name"));
        setAllStates(sts);
    }, []);

    useEffect(() => {
        if (currentState) {
            const stateIsoCode = stateById[currentState]?.isoCode;
            const cities = City.getCitiesOfState("IN", stateIsoCode);
            setAllCities(cities);
        }
    }, [currentState, stateById]);

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/register', values);
            if (response.status === 200) {
                onSwitchMode(ScreenMode.SIGN_IN);
            }
        } catch (error) {
            message.error('Error registering user');
        }
    };

    return (
        <div className="signup-container">
            <section className="signup-form-section">
                <h3 className="signup-title">
                    भारतीय मतदाता बनने के लिए धन्यवाद
                </h3>
                <Form form={form} onFinish={onFinish} className="signup-form">
                    <Form.Item name='name' rules={[{ required: true, message: 'Please input your full name!' }]}>
                        <Input placeholder="Full Name" />
                    </Form.Item>

                    <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                        <Input placeholder='Enter Email' />
                    </Form.Item>

                    <Form.Item name='phone' rules={[{ required: true, message: 'Please input your contact number!', len: 10 }]}>
                        <Input placeholder='Enter Contact no.' maxLength={10} />
                    </Form.Item>

                    <Form.Item name='gender' rules={[{ required: true, message: 'Please select your gender!' }]}>
                        <Radio.Group>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="state" rules={[{ required: true, message: 'Please select your state!' }]}>
                        <Select onChange={setCurrentState} showSearch placeholder='Select State'>
                            {allStates.map(state => (
                                <Select.Option value={state.name} key={state.isoCode}>{state.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="city" rules={[{ required: true, message: 'Please select your city!' }]}>
                        <Select showSearch placeholder='Select City'>
                            {allCities.map(city => (
                                <Select.Option value={city.name} key={city.name}>{city.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="dob" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
                        <DatePicker format='DD/MM/YYYY' placeholder='Date OF Birth' />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password placeholder='Password' />
                    </Form.Item>

                    <Form.Item>
                        <button className="signup-submit-button">Register</button>
                    </Form.Item>
                </Form>
                <p className="signup-already-account">
                    Already have an account?
                    <Link to="/SignIn" onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}>Login</Link>
                </p>
            </section>
        </div>
    );
};

export default SignUpForm;
