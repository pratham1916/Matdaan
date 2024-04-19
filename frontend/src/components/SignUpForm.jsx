import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Select, DatePicker, message } from 'antd';
import { State, City } from 'country-state-city';
import { keyBy } from 'lodash';
import axios from 'axios';
import { Link } from 'react-router-dom';
import login from "../images/login.jpg"
import "../Styles/login-register.css";

const SignUpForm = () => {
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
            const { name, ...formData } = values;
            formData.fullname = name;

            const response1 = await axios.post('http://localhost:8080/register', formData);
            console.log(response1.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (

        <div className='container'>
            <div className="left-container">
                <img src={login} alt="login-img" />
            </div>
            <div className="right-container">
                <h3 className="title"> आपकी आवाज़, आपका वोट: अभी पंजीकरण करें </h3>
                <Form form={form} onFinish={onFinish}   >
                    <Form.Item name='name' rules={[{ required: true, message: 'Please input your full name!' }]}>
                        <Input className="input" placeholder="Full Name" />
                    </Form.Item>

                    <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                        <Input className="input" placeholder='Enter Email' />
                    </Form.Item>

                    <Form.Item name='phone' rules={[{ required: true, message: 'Please input your contact number!', len: 10 }]}>
                        <Input className="input" placeholder='Enter Contact no.' maxLength={10} />
                    </Form.Item>

                    <Form.Item name='gender' rules={[{ required: true, message: 'Please select your gender!' }]}>
                        <Radio.Group>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item name="state" rules={[{ required: true, message: 'Please select your state!' }]}>
                        <Select className="input" onChange={setCurrentState} showSearch placeholder='Select State'>
                            {allStates.map(state => (
                                <Select.Option value={state.name} key={state.isoCode}>{state.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="city" rules={[{ required: true, message: 'Please select your city!' }]}>
                        <Select className="input" showSearch placeholder='Select City'>
                            {allCities.map(city => (
                                <Select.Option value={city.name} key={city.name}>{city.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="dob" rules={[{ required: true, message: 'Please select your date of birth!' }]}>
                        <DatePicker className="input" format='DD/MM/YYYY' placeholder='Date OF Birth' />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password className="input" placeholder='Password' />
                    </Form.Item>

                    <p className="signup-already-account">Already have an account?
                        <Link to="/login">Login</Link>
                    </p>
                    <Form.Item>
                        <button className="button btn">Register</button>
                    </Form.Item>
                </Form>

            </div>
        </div>

    );
};

export default SignUpForm;
