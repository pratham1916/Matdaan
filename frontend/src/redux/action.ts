import axios from "axios";
import { Dispatch } from "redux";
import { message } from "antd";
import {
  ADD_CANDIDATE_FAIL, ADD_CANDIDATE_LOADING, ADD_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_FAIL,
  DELETE_CANDIDATE_LOADING,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_VOTERS_FAIL,
  DELETE_VOTERS_LOADING,
  DELETE_VOTERS_SUCCESS,
  GET_CANDIDATE_FAIL,
  GET_CANDIDATE_LOADING,
  GET_CANDIDATE_SUCCESS,
  GET_VOTERS_FAIL,
  GET_VOTERS_LOADING,
  GET_VOTERS_SUCCESS,
  LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS,
  REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS,
  UPDATE_CANDIDATE_STATUS_FAIL,
  UPDATE_CANDIDATE_STATUS_LOADING,
  UPDATE_CANDIDATE_STATUS_SUCCESS,
  UPDATE_VOTERS_STATUS_FAIL,
  UPDATE_VOTERS_STATUS_LOADING,
  UPDATE_VOTERS_STATUS_SUCCESS
} from "./actionTypes";

export const BaseURL = "http://localhost:8080";
export const UPLOAD_URL = `${BaseURL}/uploads`

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

export const getCandidates = (filters: any, page: number) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_CANDIDATE_LOADING });
  try {
    const axiosAuth = getAxiosAuth();
    const response = await axiosAuth.get(`${BaseURL}/candidate?page=${page}`, {
      headers: { filters: JSON.stringify(filters) },
    });
    dispatch({ type: GET_CANDIDATE_SUCCESS, payload: { candidates: response.data.candidates} });
  } catch (error) {
    dispatch({ type: GET_CANDIDATE_FAIL });
  }
};

export const updateCandidateStatus = (id: string, status: string) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_CANDIDATE_STATUS_LOADING });
  try {
    const axiosAuth = getAxiosAuth();
    await axiosAuth.put(`${BaseURL}/candidate/${id}`, { status });
    dispatch({ type: UPDATE_CANDIDATE_STATUS_SUCCESS });
  } catch (error) {
    dispatch({ type: UPDATE_CANDIDATE_STATUS_FAIL });
  }
};

export const deleteCandidate = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_CANDIDATE_LOADING });
  try {
    const axiosAuth = getAxiosAuth();
    await axiosAuth.delete(`${BaseURL}/candidate/${id}`);
    dispatch({ type: DELETE_CANDIDATE_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_CANDIDATE_FAIL });
  }
};

export const getVoters = (filters: any, page: number) => async (dispatch: Dispatch) => {
  dispatch({ type: GET_VOTERS_LOADING});
  try {
    const axiosAuth = getAxiosAuth();
    const response = await axiosAuth.get(`${BaseURL}/voters?page=${page}`, {
      headers: { filters: JSON.stringify(filters) },
    });
    dispatch({ type: GET_VOTERS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_VOTERS_FAIL });
  }
};

export const updateVoterStatus = (id: string, status: string, voterId: string, email: string) => async (dispatch: Dispatch) => {
  dispatch({ type: UPDATE_VOTERS_STATUS_LOADING });
  try {
      const response = await axios.put(`${BaseURL}/voters/${id}`, { status, voterId, email });
      dispatch({ type: UPDATE_VOTERS_STATUS_SUCCESS, payload: response.data });
  } catch (error) {
      dispatch({ type: UPDATE_VOTERS_STATUS_FAIL});
  }
};

export const deleteVoters = (id: string) => async (dispatch: Dispatch) => {
  dispatch({ type: DELETE_VOTERS_LOADING });
  try {
    const axiosAuth = getAxiosAuth();
    await axiosAuth.delete(`${BaseURL}/voters/${id}`);
    dispatch({ type: DELETE_VOTERS_SUCCESS });
  } catch (error) {
    dispatch({ type: DELETE_VOTERS_FAIL });
  }
};




