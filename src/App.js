import React, { useState } from "react";
import { useDispatch, Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { InstructorPortal, InstructorStudents} from "./components/instructor";
import { LoginPage, SignupPage, UserStatus } from "./components/authentication";
import StudentView from "./components/student/StudentView";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import BookView from "./components/books/BookView";
import BookTest from "./components/student/BookTest";
import BookEditor from "./components/student/BookEditor";


function App() {


    return (
    <>
    
        <UserStatus />
    
        
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/books" element={<AllBooks />} />
            <Route index path="/books/:id" element={<BookView />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
            <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
            <Route path="/student" element={<StudentView />} />
            <Route path="/booktest" element={<BookTest />} />
            <Route path="/bookedit" element={<BookEditor />} />
        </Routes>
    </>
    )
}

export default App;