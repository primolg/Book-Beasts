import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import InstructorPortal from "./components/instructor/InstructorPortal";

function App() {
    return (
    <div>Hello world
    <Routes>
        <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
    </Routes>

    </div>
    
    

    )
}

export default App;
