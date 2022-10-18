import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    InstructorPortal,
    InstructorStudents,
    EditInstructor,
    BookTable,
    ViewSingleBook,
    InstructorNav,
    InstructorHeader,
} from "./components/instructor";

const InstructorRoutes = () => {
    
    return(
        <Routes>
                <Route path="/instructorPortal/:id" element={<InstructorNav />} />
                <Route path="/instructorPortal/:id/edit" element={<EditInstructor />} />
                <Route path="/instructorPortal/:id/students" element={<InstructorStudents />} />
                <Route path="/instructorPortal/:id/students/:studentId/books" element={<BookTable />} />
                <Route path="/instructorPortal/:id/students/:studentId/books/:bookId" element={<ViewSingleBook />} />
        </Routes>
       
    )
}

export default InstructorRoutes;

 {/* <Route path="/instructorPortal/:id" element={<InstructorPortal />}/> */}