import { ADD_CANDIDATE_FAIL, ADD_CANDIDATE_LOADING, ADD_CANDIDATE_SUCCESS, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS } from "./actionTypes";

interface Action {
  type: string;
  payload?: any;
}

interface RegisterState {
  isError: boolean;
  success: boolean;
  isLoading: boolean;
}

interface LoginState {
  isError: boolean;
  isAuth: boolean;
  userData: any;
  isLoading: boolean;
}

interface CandidateState{
  isLoading: boolean;
  success: boolean;
  isError: boolean;
}

const initialState_Register: RegisterState = {
  isError: false,
  success: false,
  isLoading: false
};

const initialState_Login: LoginState = {
  isError: false,
  isAuth: localStorage.getItem("User") ? true : false,
  userData: {},
  isLoading: false
};

const initialState_Candidate : CandidateState = {
  isError: false,
  success: false,
  isLoading: false
}

export const RegisterReducer = (state: RegisterState = initialState_Register, action: Action): RegisterState => {
  switch (action.type) {
    case REGISTER_LOADING:
      return { ...state, isLoading: true, isError: false };
    case REGISTER_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true };
    case REGISTER_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const LoginReducer = (state: LoginState = initialState_Login, action: Action): LoginState => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, isLoading: true, isError: false };
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, isError: false, isAuth: true, userData: action.payload };
    case LOGIN_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const CandidateReducer = (state: CandidateState = initialState_Candidate, action: Action): CandidateState => {
  switch (action.type) {
    case ADD_CANDIDATE_LOADING:
      return { ...state, isLoading: true, isError: false };
    case ADD_CANDIDATE_SUCCESS:
      return { ...state, isLoading: false, isError: false, success:true};
    case ADD_CANDIDATE_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
