import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import InstructorPortal from "./components/instructor/InstructorPortal";
import Home from "./components/Home/Home";

function App() {
    return (
    <div>
        <Home/>
    <Routes>
        <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
    </Routes>

    </div>
    
    

    )
}

export default App;
