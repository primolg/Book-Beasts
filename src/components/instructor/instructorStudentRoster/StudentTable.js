import React from 'react';
import StudentRow from './StudentRow';

const StudentTable = ({ studentList }) => {

    return(
       <>          
        {studentList.length !==0 ? (
            <div className='studentRoster'>
                <div className='table-title'>
                <h3>Student Roster</h3>
                </div>
                <table className='table-fill'>
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
                    <tbody className='table-hover'>
                        {studentList.map((student) => (
                        <StudentRow key={student.id} student={student} />
                        ))}
                    </tbody>
                </table>
            </div>
            ) : (
                <h3>No Students are enrolled yet</h3>
        )}           
        </>     
        );
    };

export default StudentTable;