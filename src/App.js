import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { InstructorPortal, InstructorStudents} from "./components/instructor";
import { LoginPage, SignupPage, UserStatus } from "./components/authentication";

function App() {
    return (
    <>
        <UserStatus />
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
            <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
        </Routes>
    </>
    )
}

export default App;
