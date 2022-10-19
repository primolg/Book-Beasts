import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import { LoginPage, SignupPage } from "./components/authentication";
import { BookEditor, StudentView } from "./components/student";
import Home from "./components/home/Home";
import Team from "./components/footer/Team";

import{
    AllBooks,
    SingleBook,
    BookView
} from "./components/books";

import {
    InstructorPortal,
    InstructorStudents,
    EditInstructor,
    BookTable,
    ViewSingleBook,
    InstructorNav,
    InstructorHeader,
} from "./components/instructor";

const Router = () => {
    return(
        <Routes>
            <Route index path="/" element={<AllBooks />} />
            <Route index path="/books" element={<AllBooks />} />
            <Route index path="/books/:id" element={<BookView />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/editor/:id" element={<BookEditor />} />
            <Route path="/team" element={<Team />} />
            <Route path="/student" element={<StudentView />} />
            <Route path="/instructorPortal/:id" element={<InstructorNav/>}/>
            {/* <Route path="/instructorPortal/:id/edit" element={<EditInstructor />} />
            <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} /> */}
            <Route path="/instructorPortal/:id/students/:studentId/books" element={<BookTable />} />
            <Route path="/instructorPortal/:id/students/:studentId/books/:bookId" element={<ViewSingleBook />} />
        </Routes>
    )
}

export default Router;


