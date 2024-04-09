import React, { useEffect, useState } from 'react'
import { Form, Input, Radio, Select, DatePicker, Alert, message } from 'antd'
import { State, City } from 'country-state-city'
import { keyBy, values } from 'lodash'
import { ScreenMode } from '../pages/SignInPage'
import axios from 'axios'
import { Link } from 'react-router-dom';

const SignUpForm = ({ onSwitchMode }) => {
    const [form] = Form.useForm()

    const [allStates, setAllStates] = useState([])
    const [currentState, setCurrentState] = useState(null)
    const [stateById, setStateById] = useState({})
    const [allCities, setAllCities] = useState([])
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const sts = State.getStatesOfCountry("IN")
        // console.log(sts);
        setStateById(keyBy(sts, "name"))
        setAllStates(sts)
    }, [])

    useEffect(() => {
        const state = stateById[currentState]?.isoCode
        const city = City.getCitiesOfState("IN", `${state}`)
        setAllCities(city)
    }, [currentState])

    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#393E46"
    }

    const formStyle = {
        background: "#ffffff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        width: "500px"
    }

    const inputStyle = {
        borderRadius: "10px",
        height: "45px"
    }

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
    }

    const registerLinkStyle = {
        marginTop: "20px",
        textAlign: "center"
    }

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:8080/register', values);
            console.log(response.data);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };


    return (
        <div style={containerStyle}>
            <section style={formStyle}>
                <h3 style={{ textAlign: 'center', fontWeight: "bold", marginBottom: "30px", color: "#1890ff" }}>
                    भारतीय मतदाता बनने के लिए धन्यवाद
                </h3>
                <p style={{ textAlign: 'center', marginBottom: "20px", color: "#666666" }}>
                    Please provide your valid information to create an account.
                </p>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name='name'>
                        <Input style={{ ...inputStyle, marginBottom: "20px" }} placeholder="Full Name" required />
                    </Form.Item>
                    <Form.Item name='email'>
                        <Input style={{ ...inputStyle, marginBottom: "20px" }} placeholder='Enter Email' required />
                    </Form.Item>
                    <Form.Item name='phone'>
                        <Input style={{ ...inputStyle, marginBottom: "20px" }} placeholder='Enter Contact no.' required maxLength={10} minLength={10} />
                    </Form.Item>
                    <Form.Item name='gender'>
                        <Radio.Group onChange={(e) => e} style={{ marginBottom: "20px" }}>
                            <Radio value="Male">Male</Radio>
                            <Radio value="Female">Female</Radio>
                            <Radio value="Other">Other</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item name="state">
                        <Select onChange={(e) => setCurrentState(e)} showSearch placeholder='Select State'>
                            {allStates.map((e) => (
                                <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="city">
                        <Select showSearch placeholder='Select City'>
                            {allCities.map((e) => (
                                <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="dob">
                        <DatePicker style={{ ...inputStyle, marginBottom: "20px" }} format='DD/MM/YYYY' placeholder='Date OF Birth' />
                    </Form.Item>
                    <Form.Item name="password">
                        <Input.Password style={{ ...inputStyle, marginBottom: "20px" }} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <button style={buttonStyle} >Register</button>
                    </Form.Item>
                </Form>
                <p style={registerLinkStyle}>
                    Already have an account?
                    <Link to="/SignIn" className="nav-link login" onClick={() => onSwitchMode(ScreenMode.SIGN_IN)}>Login</Link>
                </p>
            </section>
        </div>
    )
}

export default SignUpForm
