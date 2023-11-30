
import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {questionsReducer} from "./reducers"

const rootReducer = combineReducers({questionsReducer});
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));