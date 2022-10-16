import React, { useState } from "react";
import { useDispatch, Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { InstructorPortal, InstructorStudents, EditInstructor, BookTable, ViewSingleBook } from "./components/instructor";
import { LoginPage, SignupPage, UserStatus } from "./components/authentication";
import StudentView from "./components/student/StudentView";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import BookView from "./components/books/BookView";


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
            <Route path="/instructorPortal/:id/edit" element={<EditInstructor />}/>
            <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
            <Route path="/instructorPortal/:id/students/:studentId/books" element={<BookTable/>}/>
            <Route path="/instructorPortal/:id/students/:studentId/books/:bookId" element={<ViewSingleBook />}/>
            <Route path="/student/:id" element={<StudentView />} />
        </Routes>
    </>
    )
}

export default App;