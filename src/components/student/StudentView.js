import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentData } from '../../store/reducers/studentSlice';
import { fetchBookData } from '../../store/reducers/bookSlice';
import Bookshelf from './Bookshelf';

const StudentView = () => {
    const params = useParams();
    const studentData = useSelector((state) => state.student.studentData)
    const dispatch = useDispatch();
    console.log(studentData);
    useEffect(() => {
        dispatch(fetchStudentData(params.id));
    }, []);

    return(
        <div>
            <p>Student:</p>
            <h4>{studentData? studentData.student.firstName + " " + studentData.student.lastName : "not found" }</h4>
            <p>Books:</p>
            {studentData ? (
                <Bookshelf books={studentData.books} />
            ): <p>not working</p>}
        </div>      
    )
};

export default StudentView;