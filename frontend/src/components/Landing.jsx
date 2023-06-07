import React, { useState,useEffect } from 'react';
import landing from '../img/landing.jpeg'
import { Form, Input, Radio, Select, DatePicker, Alert, message } from 'antd'
import styles from '../css/Landing.module.css'
import {State,City} from 'country-state-city'
import {keyBy} from 'lodash'
import axios from 'axios';
import {motion} from "framer-motion";
import {useNavigate} from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [right, setRight] = useState("Rules");
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

    useEffect(() => {
        form.resetFields();
        setError(null)
    },[right])

    const left = {
        backgroundImage: `url(${landing})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        position: "absolute",
        top: 0,
        left: 0,
        width: "60vw",
        height: "100vh",
    };

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
        try{
            if (right === "Login") {
                const data = {
                    voterId: values.voterId,
                    password: values.password
                }
                const res = await axios.post("http://localhost:8080/user/login", data);
                if (res.data.status === 'error') {
                    setError(res.data.message)
                    return setLoading(false)
                }
                localStorage.setItem("matdaan", JSON.stringify(res.data.user))
                message.success(res.data.message)
                form.resetFields();
                navigate("/home")
                setError(null)
            } else if (right === "Signup"){
                const data = {
                    name: values.name,
                    email: values.email, 
                    password: values.password,
                    dob: values.dob,
                    gender: values.gender,
                    phone: values.phone,
                    state: values.state,
                    city: values.city
                }
                const res = await axios.post("http://localhost:8080/user/signup", data);
                if (res.data.status === 'error') {
                    setError(res.data.message)
                    form.resetFields();
                    return setLoading(false)
                };
                message.success(res.data.message)
                form.resetFields();
                setError(null)
                setRight("Login")
            }
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    const formstyle = {background: "white", padding: "15px", borderRadius: "20px"}
    const regtext = {margin:"0 0 0 65px", width:"300px"}

    return (
        //main component
        <div>
            {/* left components */}
            <div style={left}>
                <h1 style={{ margin: "400px 0 20px 500px", color: "white" , fontSize:"35px" }}><b>मतदान !</b></h1>
                <p style={{ color: "white" , marginLeft:"360px" }}>Young or Old, Black or White, Cast your Vote, Its your right.</p>
                <span>
                    <button className={styles.btn} style={{margin:"10px 35px 10px 400px"}} onClick={() => setRight("Login")}>Login</button>
                </span>
                <span class="registerlb">
                    <button className={styles.btn} onClick={() => setRight("Signup")}>Register</button>
                </span>
                <span class="rulelb">
                    <button className={styles.btn} style={{margin:"0 0 0 40px"}} onClick={() => setRight("Rules")}>Rules</button>
                </span>
                
            </div>

            {/* right component */}
            <div className={styles.right}>

                {right === "Rules" && 
                <section className={styles.rulesection}>
                    <h3> Registration Process </h3>
                    <p><strong>1. </strong> For casting the vote user needs to first register himself.
                        For this registration purpose , the user will be provided a voter
                        registration form on this website.
                    </p>
                    <p><strong>2. </strong>The voter can only register in the registration phase.
                        After the registration phase is over the user can not register and
                        thus will not be able to vote.
                    </p>
                    <p><strong>3. </strong>For registration , the user will have to enter his Aadhar
                        card number and the account address which the user will be using
                        for voting purpose.
                    </p>
                    <p><strong>4. </strong>At the first stage the users age will be checked. If the
                        user is 18 or above 18 years of age then only he is eligible to
                        vote.
                    </p>
                    <p><strong>5. </strong>The second stage is OTP verification. This stage is
                        required to validate the voter itself. After entering the aadhar
                        number and successful age verification.
                    </p>
                    <p><strong>6. </strong>After entering correct OTP user will get successfully
                        registered.
                    </p>
                </section>}

                {right === "Login" && 
                <section style={{...formstyle,margin:"180px 50px 0 50px"}}>
                    <h3 style={{textAlign:'center',fontWeight:"700", fontSize:"20px",marginTop:"20px"}}>Please enter your Voter ID And Password</h3>
                    <Form form={form} onFinish={onFinish}>
                        <Form.Item name='voterId'>
                            <Input style={{margin:"20px 0 0 65px", width: "300px",borderRadius:"10px",height:"35px"}} placeholder='Enter 10 digit voter Id' required />
                        </Form.Item>
                        <Form.Item name='password'>
                            <Input.Password style={{margin:"0 0 0 65px", width: "300px",borderRadius:"10px",height:"35px"}} placeholder='Enter password' required />
                        </Form.Item>
                        <Form.Item>
                            <button style={{fontSize:"11px",marginLeft:"170px"}} className={styles.btn} htmlType='submit' loading={loading}>Login</button>
                        </Form.Item>
                        <motion.div initial={{opacity: 0, marginBottom: 0}}
                        animate={{
                            opacity: error ? 1 : 0,
                            marginTop: error ? 20 : 0,
                            marginBottom: error ? 40 : 0,
                        }}
                        >
                            <Alert type='error' showIcon message={error}></Alert>
                        </motion.div>
                    </Form>
                </section>}

                {right === "Signup" && 
                <section style={{...formstyle,margin:"30px 50px 0 50px"}}>
                    <h3 style={{marginTop:"15px",textAlign:"center",fontWeight:"700", fontSize:"20px",marginTop:"20px"}}>Please Enter your Valid Information</h3>

                    <Form form={form} onFinish={onFinish}>
                        <Form.Item name='name'>
                            <Input style={{...regtext,marginTop:"20px"}} placeholder="Full Name" required />
                        </Form.Item>
                        <Form.Item name='email' style={{textAlign:"center"}} rules={[{type: "email", message: "Please enter a valid email"}]}>
                            <Input style={{...regtext,marginRight:"70px"}} placeholder='Enter Email' required />
                        </Form.Item>
                        <Form.Item
                            name='phone'>
                            <Input style={{...regtext}} placeholder='Enter Contact no.' required maxLength={10} minLength={10} />
                        </Form.Item>
                        <Form.Item style={{...regtext,width:"320px",marginTop:"0"}}
                            name='gender'
                            label='Gender'>
                            <Radio.Group onChange={(e) => e}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="state">
                            <Select style={{...regtext,marginTop:"20px"}} onChange={(e)=>setCurrentState(e)} showSearch placeholder='Select State'>
                                {allStates.map((e)=> (
                                 <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="city">
                            <Select style={{...regtext}} showSearch placeholder='Select City'>
                            {allCities.map((e)=> (
                                 <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="dob">
                            <DatePicker style={{...regtext}}  format='DD/MM/YYYY' placeholder='Date OF Birth' />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password style={{...regtext}} placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Item>
                        <Form.Item>
                            <button style={{fontSize:"11px",marginLeft:"170px"}} className={styles.btn} htmlType='submit' >Register</button>
                        </Form.Item>
                    </Form>
                </section>
                }
            </div>
        </div>
    )
};
export default Landing;