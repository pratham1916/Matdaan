import { useEffect, useState, FC } from 'react';
import { Form, Input, Radio, Select, DatePicker, Row, Col, Button } from 'antd';
import { State, City, IState, ICity } from 'country-state-city';
import { keyBy } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import registerImage from "../images/login.jpg";
import "../styles/login-register.css";
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/action';

interface RegisterValues {
    fullname: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    state: string;
    city: string;
    dob: string;
    password: string;
}

const RegisterForm: FC = () => {
    const [form] = Form.useForm();
    const [allStates, setAllStates] = useState<IState[]>([]);
    const [currentState, setCurrentState] = useState<string | null>(null);
    const [stateById, setStateById] = useState<{ [key: string]: IState }>({});
    const [allCities, setAllCities] = useState<ICity[]>([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const sts = State.getStatesOfCountry("IN");
        setStateById(keyBy(sts, "name"));
        setAllStates(sts);
    }, []);

    useEffect(() => {
        if (currentState) {
            const stateIsoCode = stateById[currentState]?.isoCode;
            if (stateIsoCode) {
                const cities = City.getCitiesOfState("IN", stateIsoCode);
                setAllCities(cities);
            }
        }
    }, [currentState, stateById]);

    const onFinish = (formData: RegisterValues) => {
        dispatch(registerUser(formData, navigate));
    };

    return (
        <div className='register-form-container'>
            <div className="register-image-container"></div>
            <div className="form-content">
                <h3 className="form-title">Vote: Your voice, your future.</h3>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item name='fullname' rules={[{ required: true, message: 'Please add FullName' }]}>
                        <Input className="form-input" placeholder="Full Name" />
                    </Form.Item>

                    <Form.Item name='email' rules={[{ required: true, type: 'email', message: 'Please add valid Email' }]}>
                        <Input className="form-input" placeholder='Enter Email' />
                    </Form.Item>
                    <Row gutter={6}>
                        <Col span={12}>
                            <Form.Item name='gender' rules={[{ required: true, message: 'Please select Gender' }]}>
                                <Select placeholder="Select your gender">
                                    <Select.Option value="Male">Male</Select.Option>
                                    <Select.Option value="Female">Female</Select.Option>
                                    <Select.Option value="Other">Other</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name='phone' rules={[{ required: true, message: 'Please add Ph-Number', len: 10 }]}>
                                <Input className="form-input" placeholder='Enter 10 Digit Contact no.' maxLength={10} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={6}>
                        <Col span={12}>
                            <Form.Item name="state" rules={[{ required: true, message: 'Please select State' }]}>
                                <Select className="form-input" onChange={value => setCurrentState(value)} showSearch placeholder='Select State'>
                                    {allStates.map(state => (
                                        <Select.Option value={state.name} key={state.isoCode}>{state.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="city" rules={[{ required: true, message: 'Please select City' }]}>
                                <Select className="form-input" showSearch placeholder='Select City'>
                                    {allCities.map(city => (
                                        <Select.Option value={city.name} key={city.name}>{city.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={6}>
                        <Col span={12}>
                            <Form.Item name="dob" rules={[{ required: true, message: 'Please select DOB' }]}>
                                <DatePicker className="form-input" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item name="password" rules={[{ required: true, message: 'Please enter Password' }]}>
                                <Input.Password className="form-input" placeholder="Enter password" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button className="form-button" htmlType="submit">Register</Button>
                    </Form.Item>
                    <p className="account-link-text">Already registered? </p>
                    <Link to="/login" className='form-link-btn'>Login Here</Link>
                </Form>
            </div>
        </div>
    );
};

export default RegisterForm;
