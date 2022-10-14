import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentData } from '../../store/reducers/studentSlice';
import { fetchBookData } from '../../store/reducers/bookSlice';
import Bookshelf from './Bookshelf';

const StudentView = () => {

    //right now it's pulling the id from the "user" in state, and then adding studentData to state, to access the users books.
    //I'd like to change this so that the books are added upon the initial user login to avoid having to do any authentication or axios get calls after login!

    //right now it will pull based on id, so there is a bug that it'll pull student 1, if an admin with id 1 is logged in.

    const params = useSelector((state) => state.user.isAdmin ? 0 : state.user.id);
    const studentData = useSelector((state) => state.student.studentData)
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchStudentData(params));
    }, [params]); 
    console.log(studentData)

    return(
        <div>
            <p>Student:</p>
            <h4>{studentData ? studentData.student.firstName + " " + studentData.student.lastName : "not found" }</h4>
            <p>Books:</p>
            {studentData ? (
                <Bookshelf books={studentData.books} />
            ): <p>not working</p>}
        </div>      
    )
};

export default StudentView;