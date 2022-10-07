import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import InstructorPortal from "./components/instructor/InstructorPortal";
import InstructorStudents from "./components/instructor/InstructorStudents";

function App() {
    return (
    <div>Hello world
    <Routes>
        <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
        <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
    </Routes>

    </div>
    
    

    )
}

export default App;
