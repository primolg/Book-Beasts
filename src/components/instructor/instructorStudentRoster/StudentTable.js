import React from 'react';
import StudentRow from './StudentRow';

const StudentTable = ({ studentList, activeTab, setActiveTab }) => {

    return(
       <>          
        {studentList.length !==0 ? (
            <div className='studentRoster'>
                <div className='table-title'>
                <h3>Student Roster</h3>
                </div>
                <table className='table-fill' role="table" area-label="students">
                    <thead>
                        <tr class="flex-table header" role="rowgroup">
                            <th className='flex-row first' role='columnheader'>First Name</th>
                            <th className='flex-row' role='columnheader'>Last Name</th>
                            <th className='flex-row' role='columnheader'>Username</th>
                            <th className='flex-row' role='columnheader'>Color</th>
                            <th className='flex-row' role='columnheader'>Book List</th>
                            <th className='flex-row' role='columnheader'>Email</th>
                            <th className='flex-row' role='columnheader'>Edit Student</th>
                            <th className='flex-row' role='columnheader'>Delete Student</th>
                        </tr>
                    </thead>
                    <tbody className='table-hover'>
                        {studentList.map((student) => (
                        <StudentRow key={student.id} student={student} activeTab={activeTab} setActiveTab={setActiveTab}/>
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