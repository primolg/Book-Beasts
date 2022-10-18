import React from "react";
import { Routes, Route } from "react-router-dom";
// components
import { InstructorPortal, InstructorStudents, EditInstructor, BookTable, ViewSingleBook } from "./components/instructor";
import { LoginPage, SignupPage } from "./components/authentication";
import { BookEditor, StudentView } from "./components/student";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import SingleBook from "./components/books/SingleBook";
import Team from "./components/footer/Team";
import BookView from "./components/books/BookView";

const Router = () => {
    return(
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
            <Route path="/editor/:id" element={<BookEditor />} />
            <Route path="/team" element={<Team />} />
            <Route path="/student/:id" element={<StudentView />} />
            <Route path="/student" element={<StudentView />} />
        </Routes>
    )
}

export default Router;
