import { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Select, Upload, Drawer } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import { State, City } from "country-state-city";
import { keyBy } from "lodash";
import { IState, ICity } from "country-state-city";
import "../styles/Candidate.css"
import { useDispatch } from "react-redux";
import { addCandidate } from "../redux/action";
import CandidateList from "./CandidateList";

interface CandidateValues {
  profilePic: any;
  signature: any;
  fullname: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  voterId: string;
  adharId: string;
  state: string;
  city: string;
  party: string;
  position: string;
}

const Candidate = () => {
  const [form] = Form.useForm();
  const [allStates, setAllStates] = useState<IState[]>([]);
  const [currentState, setCurrentState] = useState<string | null>(null);
  const [stateById, setStateById] = useState<{ [key: string]: IState }>({});
  const [allCities, setAllCities] = useState<ICity[]>([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const states = State.getStatesOfCountry("IN");
    setStateById(keyBy(states, "name"));
    setAllStates(states);
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

  const getFile = (event: any) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event && event.fileList;
  };

  const getImagePreview = async (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImagePreview(reader.result);
      } else {
        setImagePreview(null);
      }
    };
    return false;
  };

  const getSignaturePreview = async (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSignaturePreview(reader.result);
      } else {
        setSignaturePreview(null);
      }
    };
    return false;
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const onFinish = async (values: CandidateValues) => {
    const formData = new FormData();
    formData.append('fullname', values.fullname);
    formData.append('email', values.email);
    formData.append('gender', values.gender);
    formData.append('dob', values.dob);
    formData.append('voterId', values.voterId);
    formData.append('adharId', values.adharId);
    formData.append('phone', values.phone);
    formData.append('state', values.state);
    formData.append('city', values.city);
    formData.append('party', values.party);
    formData.append('position', values.position);
    formData.append('profilePic', values.profilePic[0].originFileObj);
    formData.append('signature', values.signature[0].originFileObj);
  
    dispatch(addCandidate(formData));
  };


  return (
    <section className="candidate">
      <div className="candidate-banner"></div>
      <Button className="addCandidate-button" onClick={showDrawer}>Add Candidate</Button>
      <Drawer
        title="Add Candidate"
        width={600}
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <section className="candidate-form">
          <Form form={form} onFinish={onFinish} className="form-main">
            <div className="form-section ">
              <Form.Item className="upload-item" name='profilePic' getValueFromEvent={getFile} rules={[{ required: true, message: "Please upload a profile picture" }]}>
                <Upload className="upload-control" listType="picture-card" showUploadList={false} beforeUpload={getImagePreview} maxCount={1} accept="image/*">
                  {imagePreview ?
                    <img src={imagePreview} alt="avatar" style={{ width: "100%" }} className="avatar-preview" /> :
                    <div>
                      <PlusOutlined />
                      <div>Upload Picture</div>
                    </div>
                  }
                </Upload>
              </Form.Item>
              <Form.Item className="upload-item" name='signature' getValueFromEvent={getFile} rules={[{ required: true, message: "Please upload a signature" }]}>
                <Upload className="upload-control" listType="picture-card" showUploadList={false} beforeUpload={getSignaturePreview} maxCount={1} accept="image/*">
                  {signaturePreview ?
                    <img src={signaturePreview} alt="signature" style={{ width: "100%" }} className="avatar-preview" /> :
                    <div>
                      <PlusOutlined />
                      <div>Upload Signature</div>
                    </div>
                  }
                </Upload>
              </Form.Item>
            </div>

            <Form.Item name='fullname' rules={[{ required: true, message: "Please Enter Your Name" }]} className="input-field">
              <Input placeholder="Full Name" />
            </Form.Item>
            <Form.Item name='email' rules={[{ required: true, message: "Please Enter Your Email" }]} className="input-field">
              <Input placeholder='Enter Email' />
            </Form.Item>

            <Form.Item name='gender' rules={[{ required: true, message: 'Please select Gender' }]} className="input-field">
              <Select placeholder="Select your gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>

            <div className="form-row">
              <Form.Item name="dob" rules={[{ required: true, message: "Please Enter Your DOB" }]} className="input-field">
                <DatePicker style={{ width: "100%" }} format='DD/MM/YYYY' placeholder='Date OF Birth' />
              </Form.Item>
              <Form.Item name='phone' rules={[{ required: true, message: "Please Enter Your Contact No." }]} className="input-field">
                <Input placeholder='Enter Contact no.' maxLength={10} minLength={10} />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item name="voterId" rules={[{ required: true, message: "Please Enter Your Voter ID" }]} className="input-field">
                <Input placeholder='Voter ID' />
              </Form.Item>
              <Form.Item name="adharId" rules={[{ required: true, message: "Please Enter Your Aadhar No." }]} className="input-field">
                <Input placeholder='Aadhar' />
              </Form.Item>
            </div>

            <div className="form-row">
              <Form.Item name="state" rules={[{ required: true, message: "Please Select State" }]} className="input-field">
                <Select onChange={(e) => setCurrentState(e)} showSearch placeholder='Select State'>
                  {allStates.map(state => (
                    <Select.Option value={state.name} key={state.name}>{state.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="city" rules={[{ required: true, message: "Please Select City" }]} className="input-field">
                <Select showSearch placeholder='Select City'>
                  {allCities.map(city => (
                    <Select.Option value={city.name} key={city.name}>{city.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="form-row">
              <Form.Item name="party" rules={[{ required: true, message: "Please Select Party" }]} className="input-field">
                <Select placeholder="Party">
                  <Select.Option value="BJP">BJP</Select.Option>
                  <Select.Option value="AAP">AAP</Select.Option>
                  <Select.Option value="Congress">Congress</Select.Option>
                  <Select.Option value="Other">Other</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item name="position" rules={[{ required: true, message: "Please Enter Your Position" }]} className="input-field">
                <Input placeholder='Position' />
              </Form.Item>
            </div>

            <Form.Item className="form-submit">
              <Button htmlType='submit' className="submit-button">Register</Button>
            </Form.Item>
          </Form>
        </section>
      </Drawer>
      <CandidateList/>
    </section>
  );
}

export default Candidate;
