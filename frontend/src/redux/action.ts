import axios from "axios";
import { Dispatch } from "redux";
import { message } from "antd";
import {
  ADD_CANDIDATE_FAIL, ADD_CANDIDATE_LOADING, ADD_CANDIDATE_SUCCESS,
  LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS,
  REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS
} from "./actionTypes";

const BaseURL = "http://localhost:8080";

const getAxiosAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    headers: {
      'Authorization': token
    }
  });
}

export const registerUser = (formData: any, navigate: any) => async (dispatch: Dispatch) => {
  dispatch({ type: REGISTER_LOADING });
  try {
    const response = await axios.post(`${BaseURL}/register`, formData);
    if (response.data.status === "success") {
      dispatch({ type: REGISTER_SUCCESS });
      message.success(response.data.message);
      navigate('/login');
    } else {
      dispatch({ type: REGISTER_FAIL });
      message.error(response.data.message);
    }
  } catch (error: any) {
    dispatch({ type: REGISTER_FAIL });
    message.error(error.response?.data.message || error.message);
  }
};

export const loginUser = (formData: any, navigate: any, setIsUser: any) => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_LOADING });
  try {
    const response = await axios.post(`${BaseURL}/login`, formData);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("User", JSON.stringify(response.data.user));
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      message.success(response.data.message);
      setIsUser(true);
      navigate("/home");
    } else {
      dispatch({ type: LOGIN_FAIL });
      message.error(response.data.message);
    }
  } catch (error: any) {
    dispatch({ type: LOGIN_FAIL });
    message.error(error.response?.data.message || error.message);
  }
};

export const addCandidate = (formData: any) => async (dispatch: Dispatch) => {
  dispatch({ type: ADD_CANDIDATE_LOADING });
  try {
    console.log(formData);
    
    const axiosAuth = getAxiosAuth();
    const response = await axiosAuth.post(`${BaseURL}/candidate`, formData);
    if (response.data.status === "success") {
      dispatch({ type: ADD_CANDIDATE_SUCCESS });
      message.success(response.data.message);
    } else {
      dispatch({ type: ADD_CANDIDATE_FAIL });
      message.error(response.data.message);
      console.log(response.data);
      
    }
  } catch (error: any) {
    dispatch({ type: ADD_CANDIDATE_FAIL });
    message.error(error.response?.data.message || error.message);
  }
};
