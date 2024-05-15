import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { CandidateReducer, LoginReducer, RegisterReducer } from "./reducer";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    register : RegisterReducer,
    login : LoginReducer,
    candidate:CandidateReducer
})

const store = legacy_createStore(rootReducer,applyMiddleware(thunk))


export default store;