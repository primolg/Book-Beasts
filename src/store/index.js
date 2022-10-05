// redux toolkit
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
import studentReducer from "./reducers/studentSlice";
import instructorReducer from "./reducers/instructorSlice";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";

export default configureStore ({
    reducer: {
        instructor: instructorReducer,
        student: studentReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loggerMiddleware),
});