import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { CandidateReducer, CastVoteReducer, LoginReducer, RegisterReducer, VotersReducer } from "./reducer";
import { thunk } from "redux-thunk";


const rootReducer = combineReducers({
    register : RegisterReducer,
    login : LoginReducer,
    candidate:CandidateReducer,
    voters:VotersReducer,
    castVote:CastVoteReducer
})

const store = legacy_createStore(rootReducer,applyMiddleware(thunk))

export default store;