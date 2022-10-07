import React from "react";
import { useDispatch, Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import store from "../store";


function App() {
    return (
    <Provider store={store}>
        <Home/>
    </Provider>
    )
}

export default App;
