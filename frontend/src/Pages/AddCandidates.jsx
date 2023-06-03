import React, {useState, useEffect} from "react";
import { Button, Form, Input, Radio, Select, DatePicker, Alert, message, Upload } from 'antd'
import {State,City} from 'country-state-city'
import {keyBy} from 'lodash'
import {PlusOutlined} from '@ant-design/icons';
import section from '../css/Section.module.css'
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
        width: "45%",
        height: "70vh",
        borderRadius:"25px"
    };

    const textfield = {margin:"0 0 0 50px", width:"347px",border:"1px solid orange"}

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
        <section className={section.sec}>
            <div className={section.section_title}>
                <h2>hhh</h2>
                <p>Add Candidate</p>
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
				<div style={image}></div>
                <div style={{width: "45%",border:"1px solid red"}}>

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
                                <Form.Item name='name' rules={[{required: true, message: "Please add Your Name"}]}>
                                    <Input style={{...textfield,marginTop:"30px"}} placeholder="Full Name" />
                                </Form.Item>
                                <Form.Item name='email' rules={[{ required: true, message: "Please enter a valid email"}]} >
                                    <Input style={{...textfield}} placeholder='Enter Email' />
                                </Form.Item>
                                <Form.Item name="dob" rules={[{required: true, message: "Please add Profile"}]}>
                                    <DatePicker style={{...textfield}}  format='DD/MM/YYYY' placeholder='Date OF Birth' />
                                </Form.Item>
                            </div>
                        </div>

                        <div style={{display: "flex", justifyContent:"space-around"}}>
                            <Form.Item name="voterId" rules={[{required: true, message: "Please add Profile"}]}>
                                <Input style={{border:"1px solid orange",width: "250px",margin:"0"}} placeholder='Voter Id' />
                            </Form.Item>
                            <Form.Item name="aadhar" rules={[{required: true, message: "Please add Profile"}]}>
                                <Input style={{border:"1px solid orange",width: "250px"}} placeholder='Aadhar' />
                            </Form.Item>
                        </div>
                        <Form.Item
                            name='phone' rules={[{required: true, message: "Please add Profile"}]}>
                            <Input style={{...textfield,width:"537px",marginLeft:"20px"}} placeholder='Enter Contact no.' maxLength={10} minLength={10} />
                        </Form.Item>

                        <Form.Item style={{width:"320px",margin:"0 0 0 100px"}}
                            name='gender'
                            label='Gender' rules={[{required: true, message: "Please add Profile"}]}>
                            <Radio.Group onChange={(e) => e}>
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
                                <Radio value="Other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <div style={{display: "flex", justifyContent:"space-around"}}>
                            <Form.Item name="state" rules={[{required: true, message: "Please add Profile"}]}>
                                <Select style={{width: "250px"}} onChange={(e)=>setCurrentState(e)} showSearch placeholder='Select State'>
                                    {allStates.map((e)=> (
                                        <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                            <Form.Item name="city" rules={[{required: true, message: "Please add Profile"}]}>
                                <Select style={{width: "250px"}} showSearch placeholder='Select City'>
                                {allCities.map((e)=> (
                                    <Select.Option value={e.name} key={e.name}>{e.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <Form.Item name="party" rules={[{required: true, message: "Please add Profile"}]}>
                            <Select style={{...textfield}} placeholder="Party">
                                <Select.Option value="BJP">BJP</Select.Option>
                                <Select.Option value="AAP">AAP</Select.Option>
                                <Select.Option value="Congress">Congress</Select.Option>
                                <Select.Option value="Other">Other</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="position" rules={[{required: true, message: "Please add Profile"}]}>
                            <Input style={{...textfield}} placeholder='possition' />
                        </Form.Item>
                        <Form.Item>
                            <Button style={{fontSize:"11px",marginLeft:"170px"}} className={styles.btn} htmlType='submit' >Register</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
        </>
    )
}

export default AddCandidate;