import { Button, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/login-register.css";
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/action';

const { Text } = Typography;

interface LoginValues {
  voterId: string;
  password: string;
}

interface LoginFormProps {
  setIsUser: (value: boolean) => void;
}

const LoginForm = ({ setIsUser }: LoginFormProps) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (formData: LoginValues) => {
    dispatch(loginUser(formData, navigate, setIsUser));
  };

  return (
    <div className='login-form-container'>
      <div className="login-image-container"></div>
      <div className="form-content">
        <h1 className="form-title">Welcome to Your मतदान !</h1>
        <p className="form-description">
          Join the democratic journey by entering your Voter ID and password to cast your vote. Every vote is a voice that shapes the future.
        </p>
        <Form name="signInForm" form={form} onFinish={onFinish}>
          <Form.Item name="voterId" rules={[{ required: true, message: 'Please enter your Voter ID!' }]}>
            <Input className="form-input" placeholder="Enter Your Voter ID" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password!' }]}>
            <Input.Password className="form-input" placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button className="form-button" htmlType="submit">Login</Button>
          </Form.Item>
          <Text className="account-link-text">Already have an account ? </Text>
          <Link to="/register" className='form-link-btn'>Register</Link>  
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
