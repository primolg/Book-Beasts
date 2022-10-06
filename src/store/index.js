import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import studentReducer from "./reducers/studentSlice";
import instructorReducer from "./reducers/instructorSlice";
import authReducer from './reducers/authSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";

export default configureStore ({
    reducer: {
        instructor: instructorReducer,
        student: studentReducer,
        user: authReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loggerMiddleware),
});
