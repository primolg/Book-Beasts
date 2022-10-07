// redux toolkit
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from "redux-thunk";
//import studentReducer from "./reducers/studentSlice";
import instructorReducer from "./reducers/instructorSlice";
import bookReducer from './reducers/bookSlice';
import studentReducer from './reducers/studentSlice'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loggerMiddleware from "redux-logger";

export default configureStore ({
    reducer: {
        instructor: instructorReducer,
        student: studentReducer,
        book: bookReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(loggerMiddleware),
});