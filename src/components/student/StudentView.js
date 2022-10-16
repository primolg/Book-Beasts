import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentData } from '../../store/reducers/studentSlice';
import { fetchBookData } from '../../store/reducers/bookSlice';
import Bookshelf from './Bookshelf';

const StudentView = () => {

    //right now it's pulling the id from the "user" in state, and then adding studentData to state, to access the users books.
    //I'd like to change this so that the books are added upon the initial user login to avoid having to do any authentication or axios get calls after login!

    const params = useSelector((state) => state.user.isAdmin ? 0 : state.user.id);
    const studentData = useSelector((state) => state.student.studentData)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchStudentData(params));
    }, [params]); 
    console.log(studentData)

    return studentData ? (
        <div>
            <p>Student:</p>
            <h4>{studentData.student.firstName + " " + studentData.student.lastName}</h4>
            <p>Books:</p>
            <Bookshelf books={studentData.books} />
        </div>      
    ) : (
        <div>
            <Link to="/login">Login</Link>
        </div>
    )
};

export default StudentView;