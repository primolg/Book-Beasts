import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import  DeleteStudent  from "./DeleteStudent";
import  EditStudent  from "./EditStudent";



const StudentRow = ({ student }) => {

   
    return(
        <>
            {student && (
                <tr>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.username}</td>
                    <td>{student.color}</td>
                    <td>Book List Placeholder</td>
                    <td>{student.email}</td>
                        <td>
                        <EditStudent student={student} />
                    </td>
                    
                    <td>
                        <DeleteStudent student={student} />
                    </td>
                </tr>
            )}
        </>
    )
};

export default StudentRow;