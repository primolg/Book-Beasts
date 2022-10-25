import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentData } from '../../store/reducers/studentSlice';
import { fetchBookData } from '../../store/reducers/bookSlice';
import Bookshelf from './Bookshelf';

const StudentView = () => {
    //right now it's pulling the id from the "user" in state, and then adding studentData to state, to access the users books.
    //I'd like to change this so that the books are added upon the initial user login to avoid having to do any authentication or axios get calls after login!

    const params = useSelector((state) => state.user.id);
    //const params = useParams();
    const studentData = useSelector((state) => state.student.studentData)
    const dispatch = useDispatch();
    const themes = ["general fiction", "autobiography", "sci-fi", "fantasy", "poetry", "historical", "adventure", "mystery"];

    
    useEffect(() => {
        if (params) dispatch(fetchStudentData(params));
    }, [params]);

    return studentData ? (
        <div className="outer-div-student">
            <div className="my-books">
                <div className="shelf-and-text">  
                    {studentData?.books?.length ?
                        <>
                        <p>My Books ({studentData.books.length})</p>
                        <Bookshelf books={studentData.books} />
                        <br></br>
                        </> :
                        <></>
                    }
                </div>
            </div>
            <div className="shelf-and-text">
                <p>Create New Book</p>
                <Bookshelf themes={themes} />
            </div>
        </div>      
    ) : (
        <div className="outer-div-student">
            <p>you aren't logged in</p>  
            <Link to="/login">Login</Link>
        </div>
    )
};

export default StudentView;
