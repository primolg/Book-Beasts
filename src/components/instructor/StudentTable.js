import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../../store/reducers/instructorSlice';
import StudentRow from './StudentRow';

const StudentTable = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const studentList = useSelector((state) => state.instructorList.studentList);
    
    console.log('STUDENT ROW LIST', studentList);

    useEffect(() => {
        dispatch(fetchStudents(params.id));
    }, []);

    
    


    return(
        <div className='studentTable'>
            
            
{studentList? (
    <div className='studentRoster'>
        <h1>Student Roster</h1>
        <table className='table' id="studentTable">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Color</th>
                    <th>Book List</th>
                    <th>Email</th>
                    <th>Edit Student</th>
                    <th>Delete Student</th>
                </tr>
            </thead>
            <tbody>
              {studentList.map((student) => (
                <StudentRow key={student.id} student={student} />
              ))}
            </tbody>
        </table>
        </div>
): (
    <h3>No Students are enrolled yet! PLACEHOLDER FOR ADD BUTTON</h3>
)}

            
        </div>
        
    )
};

export default StudentTable;