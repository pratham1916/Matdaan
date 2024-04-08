import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, DatePicker, Alert, message } from 'antd'
import {State,City} from 'country-state-city'
import {keyBy} from 'lodash'
import { ScreenMode } from '../pages/SignInPage';
import axios from 'axios';


const SignUpForm = ({ onSwitchMode }) => {
    const [form] = Form.useForm();

    const [allStates, setAllStates] = useState([]);
    const [currentState, setCurrentState] = useState(null);
    const [stateById, setStateById] = useState({});
    const [allCities, setAllCities] = useState([]); 
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() =>{
        const sts = State.getStatesOfCountry("IN");
        setStateById(keyBy(sts, "name"));
        setAllStates(sts)
    },[])

    useEffect(() => {
        const state = stateById[currentState]?.isoCode;
        const city = City.getCitiesOfState("IN",`${state}`);
        setAllCities(city);
    },[currentState])

    const formstyle = { background: "white", padding: "15px", borderRadius: "20px" }
    const regtext = { margin: "0 0 0 65px", width: "300px" }

    return (
        <section style={{ ...formstyle, margin: "30px 50px 0 50px" }}>
            <h3 style={{ marginTop: "15px", textAlign: "center", fontWeight: "700", fontSize: "20px", marginTop: "20px" }}>Please Enter your Valid Information</h3>

            <Form form={form}>
                <Form.Item name='name'>
                    <Input style={{ ...regtext, marginTop: "20px" }} placeholder="Full Name" required />
                </Form.Item>
                <Form.Item name='email' style={{ textAlign: "center" }} rules={[{ type: "email", message: "Please enter a valid email" }]}>
                    <Input style={{ ...regtext, marginRight: "70px" }} placeholder='Enter Email' required />
                </Form.Item>
                <Form.Item
                    name='phone'>
                    <Input style={{ ...regtext }} placeholder='Enter Contact no.' required maxLength={10} minLength={10} />
                </Form.Item>
                <Form.Item style={{ ...regtext, width: "320px", marginTop: "0" }}
                    name='gender'
                    label='Gender'>
                    <Radio.Group onChange={(e) => e}>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                        <Radio value="Other">Other</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="state">
                    <Select style={{ ...regtext, marginTop: "20px" }} onChange={(e) => setCurrentState(e)} showSearch placeholder='Select State'>
                        {allStates.map((e) => (
                            <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="city">
                    <Select style={{ ...regtext }} showSearch placeholder='Select City'>
                        {allCities.map((e) => (
                            <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="dob">
                    <DatePicker style={{ ...regtext }} format='DD/MM/YYYY' placeholder='Date OF Birth' />
                </Form.Item>
                <Form.Item name="password">
                    <Input.Password style={{ ...regtext }} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <button style={{ fontSize: "11px", marginLeft: "170px" }} htmlType='submit' >Register</button>
                </Form.Item>
            </Form>
            <a href="#" onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}>Login</a>
        </section>
    );
}

export default SignUpForm
