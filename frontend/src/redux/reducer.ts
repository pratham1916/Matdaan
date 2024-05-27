import { ADD_CANDIDATE_FAIL, ADD_CANDIDATE_LOADING, ADD_CANDIDATE_SUCCESS, ADMIN_RESULT_FAIL, ADMIN_RESULT_LOADING, ADMIN_RESULT_SUCCESS, CANDIDATE_FAIL, CANDIDATE_LOADING, CANDIDATE_SUCCESS, CAST_VOTE_FAIL, CAST_VOTE_LOADING, CAST_VOTE_SUCCESS, DELETE_CANDIDATE_FAIL, DELETE_CANDIDATE_LOADING, DELETE_CANDIDATE_SUCCESS, DELETE_VOTERS_FAIL, DELETE_VOTERS_LOADING, DELETE_VOTERS_SUCCESS, GET_CANDIDATE_FAIL, GET_CANDIDATE_LOADING, GET_CANDIDATE_SUCCESS, GET_VOTERS_FAIL, GET_VOTERS_LOADING, GET_VOTERS_SUCCESS, IS_VOTING_START_FAIL, IS_VOTING_START_LOADING, IS_VOTING_START_SUCCESS, LOGIN_FAIL, LOGIN_LOADING, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS, START_END_VOTING_FAIL, START_END_VOTING_LOADING, START_END_VOTING_SUCCESS, UPDATE_CANDIDATE_STATUS_FAIL, UPDATE_CANDIDATE_STATUS_LOADING, UPDATE_CANDIDATE_STATUS_SUCCESS, UPDATE_VOTERS_STATUS_FAIL, UPDATE_VOTERS_STATUS_LOADING, UPDATE_VOTERS_STATUS_SUCCESS, USER_RESULT_FAIL, USER_RESULT_LOADING, USER_RESULT_SUCCESS } from "./actionTypes";

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

interface CandidateState {
  isLoading: boolean;
  success: boolean;
  isError: boolean;
  candidates: any;
  total: number;
  pages: number;
}

interface VotersState {
  isLoading: boolean;
  success: boolean;
  isError: boolean;
  voters: any;
  total: number;
  pages: number;
}

interface CastVoteState {
  isLoading: boolean;
  isVoteStart: boolean;
  isError: boolean;
  success: boolean;
  candidates: any;
  adminResult: any;
  userResult: any;
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

const initialState_Candidate: CandidateState = {
  isError: false,
  success: false,
  isLoading: false,
  candidates: [],
  total: 0,
  pages: 0
}

const initialState_Voters: VotersState = {
  isError: false,
  success: false,
  isLoading: false,
  voters: [],
  total: 0,
  pages: 0,
}

const initialState_CastVote: CastVoteState = {
  isLoading: false,
  isVoteStart: localStorage.getItem("isVoteStart") === "true" ? false : true,
  isError: false,
  success: false,
  candidates: [],
  adminResult: [],
  userResult: [],
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
      return { ...state, isLoading: false, isError: false, success: true };
    case ADD_CANDIDATE_FAIL:
      return { ...state, isLoading: false, isError: true };
    case GET_CANDIDATE_LOADING:
      return { ...state, isLoading: true, isError: false };
    case GET_CANDIDATE_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, candidates: action.payload.candidates, total: action.payload.total, pages: action.payload.pages };
    case GET_CANDIDATE_FAIL:
      return { ...state, isLoading: false, isError: true };
    case UPDATE_CANDIDATE_STATUS_LOADING:
      return { ...state, isLoading: true, isError: false };
    case UPDATE_CANDIDATE_STATUS_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true };
    case UPDATE_CANDIDATE_STATUS_FAIL:
      return { ...state, isLoading: false, isError: true };
    case DELETE_CANDIDATE_LOADING:
      return { ...state, isLoading: true, isError: false };
    case DELETE_CANDIDATE_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true };
    case DELETE_CANDIDATE_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const VotersReducer = (state: VotersState = initialState_Voters, action: Action): VotersState => {
  switch (action.type) {
    case GET_VOTERS_LOADING:
      return { ...state, isLoading: true, isError: false };
    case GET_VOTERS_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, voters: action.payload.voters, total: action.payload.total, pages: action.payload.pages };
    case GET_VOTERS_FAIL:
      return { ...state, isLoading: false, isError: true };
    case UPDATE_VOTERS_STATUS_LOADING:
      return { ...state, isLoading: true, isError: false };
    case UPDATE_VOTERS_STATUS_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true };
    case UPDATE_VOTERS_STATUS_FAIL:
      return { ...state, isLoading: false, isError: true };
    case DELETE_VOTERS_LOADING:
      return { ...state, isLoading: true, isError: false };
    case DELETE_VOTERS_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true };
    case DELETE_VOTERS_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export const CastVoteReducer = (state: CastVoteState = initialState_CastVote, action: Action): CastVoteState => {
  switch (action.type) {
    case START_END_VOTING_LOADING:
      return { ...state, isLoading: true, isError: false };
    case START_END_VOTING_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, isVoteStart: action.payload };
    case START_END_VOTING_FAIL:
      return { ...state, isLoading: false, isError: true };
    case IS_VOTING_START_LOADING:
      return { ...state, isLoading: true, isError: false };
    case IS_VOTING_START_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, isVoteStart: action.payload };
    case IS_VOTING_START_FAIL:
      return { ...state, isLoading: false, isError: true };
    case CANDIDATE_LOADING:
      return { ...state, isLoading: true, isError: false };
    case CANDIDATE_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, candidates: action.payload };
    case CANDIDATE_FAIL:
      return { ...state, isLoading: false, isError: true };
    case CAST_VOTE_LOADING:
      return { ...state, isLoading: true, isError: false };
    case CAST_VOTE_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true };
    case CAST_VOTE_FAIL:
      return { ...state, isLoading: false, isError: true };
    case ADMIN_RESULT_LOADING:
      return { ...state, isLoading: true, isError: false };
    case ADMIN_RESULT_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, adminResult: action.payload };
    case ADMIN_RESULT_FAIL:
      return { ...state, isLoading: false, isError: true };
    case USER_RESULT_LOADING:
      return { ...state, isLoading: true, isError: false };
    case USER_RESULT_SUCCESS:
      return { ...state, isLoading: false, isError: false, success: true, userResult: action.payload };
    case USER_RESULT_FAIL:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};  