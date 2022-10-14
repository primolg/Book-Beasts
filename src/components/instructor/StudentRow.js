import React, { useState } from 'react';
import { useNavigate, useParams, Link, useLocation, Navigate } from 'react-router-dom';
import  DeleteStudent  from "./DeleteStudent";
import  EditStudent  from "./EditStudent";
import BookTable from './BookTable';





const StudentRow = ( {student}) => {
    const params = useParams();
    const navigate = useNavigate()
    const [ state, setState ] = useState({data: ''})
    const handleState = (event) => {
        event.preventDefault();
        setState({ data: student });
        navigate(`/instructorPortal/${params.id}/students/${student.id}/books`)
    };
    
   
    return(
        <>
            {student && (
                <tr>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.username}</td>
                    <td>{student.color}</td>
                    <td> <button onClick={handleState}>View Books</button>
                        </td>
                
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