import React from "react";
import { useDispatch, Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import InstructorPortal from "./components/instructor/InstructorPortal";
import InstructorStudents from "./components/instructor/InstructorStudents";
import { LoginPage, SignupPage, UserStatus } from "./components/authentication";
import Home from "./components/Home/Home";

function App() {
    return (
    <>
        <UserStatus />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
            <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
        </Routes>
    </>
    )
}

export default App;
