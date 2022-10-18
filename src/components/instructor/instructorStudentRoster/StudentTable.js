import React from 'react';
import StudentRow from './StudentRow';

const StudentTable = ({ studentList }) => {

    return(
       <>          
        {studentList.length !==0 ? (
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
            ) : (
                <h3>No Students are enrolled yet.
                Click 'Add Student' button to get started!</h3>
        )}           
        </>     
        );
    };

export default StudentTable;