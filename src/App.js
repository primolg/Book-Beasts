import React from "react";
import { useDispatch, Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import InstructorPortal from "./components/instructor/InstructorPortal";
import InstructorStudents from "./components/instructor/InstructorStudents";
import { LoginPage, SignupPage, UserStatus } from "./components/authentication";
import StudentView from "./components/student/StudentView";
import Home from "./components/home/Home";
import AllBooks from "./components/books/AllBooks";
import SingleBook from "./components/books/SingleBook";
import Footer from "./components/footer/Footer";
import Team from "./components/footer/Team";
import BookView from "./components/books/BookView";

function App() {
    return (
    <>
        <UserStatus />
        <Footer />
        <Routes>
            <Route index path="/" element={<Home />} />
            <Route index path="/books" element={<AllBooks />} />
            <Route index path="/books/:id" element={<BookView />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/instructorPortal/:id" element={<InstructorPortal />}/>
            <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
            <Route path="/team" element={<Team />} />
            <Route path="/student/:id" element={<StudentView />} />
        </Routes>
    </>
    )
}

export default App;
