import React, {useState, useEffect} from "react";
import { Button, Form, Input, Radio, Select, DatePicker, Alert, message, Upload } from 'antd'
import {State,City} from 'country-state-city'
import {keyBy} from 'lodash'
import {PlusOutlined} from '@ant-design/icons';
import Heading from '../css/Heading.module.css'
import styles from '../css/AddCandidate.module.css'
import election from '../img/election.png'
import axios from "axios";
    

const AddCandidate = () => {
    const [form] = Form.useForm();
    const [allStates, setAllStates] = useState([]);
    const [currentState, setCurrentState] = useState(null);
    const [stateById, setStateById] = useState({});
    const [allCities, setAllCities] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
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

    const onFinish = async (values) => {
        setLoading(true);
        setError(null);
        try {
            const data = {
                name: values.name,
                email: values.email, 
                dob: values.dob,
                gender: values.gender,
                voterId: values.voterId,
                aadhar: values.aadhar,
                phone: values.phone,
                state: values.state,
                city: values.city,
                party: values.party,
                position: values.position
            }
            let res;
            if(values.profilePic) {
                const imageData = new FormData();
                imageData.append('profilePic', values.profilePic[0].originFileObj);
                Object.keys(data).forEach((key) => {
                    imageData.append(key, data[key]);
                });
                res = await axios.post("http://localhost:8080/candidate/add",  imageData);
            } else {
                res = await axios.post("http://localhost:8080/candidate/add", data);
            }

            if (res.data.status === 'error') {
                message.error(res.data.message)
                return setLoading(false)
            };
            message.success(res.data.message)
            form.resetFields();
            setImagePreview(null)
            setError(null)
        } catch (err) {
            message.error("Invalid Error");
        }
        setLoading(false);
    }
    const image = {
        backgroundImage: `url(${election})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        width: "50%",
        height: "77vh",
        borderRadius:"25px"
    };

    const textfield = {margin:"0 0 0 50px", width:"347px",border:"1px solid orange"}
    const errormes = {textAlign:"center"}

    const getFile = (event) =>{
        if(Array.isArray(event)) {
            return event;
        }
        return event && event.fileList;
    }

    const getImagePreview = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setImagePreview(reader.result);
        return false;
    }


    return (
        <>
        <section className={Heading.sec}>
            <div className={Heading.section_title}>
                <h2>Add Candidate</h2>
                <p>Add Election Nominee</p>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
				<div style={image}></div>
                <div style={{width: "45%",backgroundColor:"#2d2f3d",borderRadius:"20px"}}>

                <Form form={form} onFinish={onFinish}>
                        <div style={{display:"flex"}}>
                            <Form.Item style={{padding:"53px 20px 0 30px"}} name='profilePic' getValueFromEvent={getFile} rules={[{required: true, message: "Please add Profile"}]}>
                                <Upload listType="picture-card" showUploadList={false} beforeUpload={getImagePreview} maxCount={1} accept="image/*">
                                    {imagePreview ? 
                                    <img src={imagePreview} alt="avatar" style={{width: "100%"}}/> :
                                    (
                                        <div>
                                            <PlusOutlined/>
                                            <div style={{marginTop: 8}}>Upload</div>
                                        </div>
                                    )
                                }
                                </Upload>
                            </Form.Item> 
                            <div>
                                <Form.Item name='name' style={{...errormes}} rules={[{required: true, message: "Please Enter Your Name"}]}>
                                    <Input style={{...textfield,marginTop:"30px"}} placeholder="Full Name" />
                                </Form.Item>
                                <Form.Item name='email' style={{...errormes}} rules={[{ required: true, message: "Please Enter Your Email"}]} >
                                    <Input style={{...textfield}} placeholder='Enter Email' />
                                </Form.Item>
                                <Form.Item name="dob" style={{...errormes}} rules={[{required: true, message: "Please Enter Your DOB"}]}>
                                    <DatePicker style={{...textfield}}  format='DD/MM/YYYY' placeholder='Date OF Birth' />
                                </Form.Item>
                            </div>
                        </div>

                        <div style={{display: "flex", justifyContent:"space-around"}}>
                            <Form.Item name="voterId" style={{...errormes}} rules={[{required: true, message: "Please Enter Your Voter ID"}]}>
                                <Input style={{border:"1px solid orange",width: "250px",margin:"0"}} placeholder='Voter ID' />
                            </Form.Item>
                            <Form.Item name="aadhar" style={{...errormes}} rules={[{required: true, message: "Please Enter Your Adhar No."}]}>
                                <Input style={{border:"1px solid orange",width: "250px"}} placeholder='Aadhar' />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name='phone' style={{...errormes}} rules={[{required: true, message: "Please Enter Your Contact No."}]}>
                            <Input style={{...textfield,width:"537px",margin:"0"}} placeholder='Enter Contact no.' maxLength={10} minLength={10} />
                        </Form.Item>

                        <Form.Item style={{width:"320px",margin:"0 0 20px 180px",fontWeight:"500",color:"white"}}
                            name='gender' rules={[{required: true, message: "Please Select Gender"}]}>
                            <Radio.Group onChange={(e) => e}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div style={{display: "flex", justifyContent:"space-around"}}>
                            <Form.Item name="state" style={{...errormes}} rules={[{required: true, message: "Please Select State"}]}>
                                <Select style={{width: "250px",border:"1px solid orange",borderRadius:"6px"}} onChange={(e)=>setCurrentState(e)} showSearch placeholder='Select State'>
                                    {allStates.map((e)=> (
                                        <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="city" style={{...errormes}} rules={[{required: true, message: "Please Select City"}]}>
                                <Select style={{width: "250px",border:"1px solid orange",borderRadius:"6px"}} showSearch placeholder='Select City'>
                                {allCities.map((e)=> (
                                    <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={{display: "flex", justifyContent:"space-around"}}>
                            <Form.Item name="party" style={{...errormes}} rules={[{required: true, message: "Please Select Party"}]}>
                                <Select style={{width: "250px",border:"1px solid orange",borderRadius:"6px"}} placeholder="Party">
                                    <Select.Option value="BJP">BJP</Select.Option>
                                    <Select.Option value="AAP">AAP</Select.Option>
                                    <Select.Option value="Congress">Congress</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="position" style={{...errormes}} rules={[{required: true, message: "Please Enter Your Position"}]}>
                                <Input style={{border:"1px solid orange",width: "250px"}} placeholder='Position' />
                            </Form.Item>
                        </div>
                        
                        <Form.Item>
                            <button style={{fontSize:"11px",marginLeft:"250px",fontWeight:"700"}} className={styles.btn} htmlType='submit' >Register</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
        </>
    )
}

export default AddCandidate;