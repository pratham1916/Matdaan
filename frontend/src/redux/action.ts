import axios from "axios";
import { LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS } from "./actionTypes";
import { Dispatch } from "redux";
import { message } from "antd";


const BaseURL = "http://localhost:8080";

// const axiosAuth = () => {
//   const token = localStorage.getItem('token');
//   return axios.create({
//     headers: {
//       'Authorization': token
//     }
//   });
// }

export const registerUser = (formData: any,navigate:any) => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_LOADING });
  try {
    const response = await axios.post(`${BaseURL}/register`, formData);
    if (response.data.status === "success") {
      dispatch({ type: REGISTER_SUCCESS });
      console.log(response.data);
      message.success(response.data.message);
      navigate('/login')
    } else {
      dispatch({ type: REGISTER_FAIL });
      message.error(response.data.message);
    }
  } catch (error: any) {
    dispatch({ type: REGISTER_FAIL });
    message.error(error);
    console.log(error);
  }
};


export const loginUser = (formData: any,navigate:any,setIsUser:any) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const response = await axios.post(`${BaseURL}/login`, formData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("User", JSON.stringify(response.data.user));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      message.success(response.data.message);
      setIsUser(true);
      navigate("/home")
    } else {
      dispatch({ type: LOGIN_FAIL });
      message.error(response.data.message);
    }
  } catch (error: any) {
    dispatch({ type: LOGIN_FAIL });
    message.error(error.response?.data.message);
  }
};