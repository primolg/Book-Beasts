import React from 'react';
import { useParams, Link } from 'react-router-dom';
import  DeleteStudent  from "./DeleteStudent";
import  EditStudent  from "./EditStudent";

const StudentRow = ( {student}) => {
    const params = useParams();
    
    return(
        <>
            {student && (
                <tr>
                    <td>{student.firstName}</td>
                    <td>{student.lastName}</td>
                    <td>{student.username}</td>
                    <td>{student.color}</td>
                    <td> <Link to={`/instructorPortal/${params.id}/students/${student.id}/books`}>
                        <button>View Books</button>
                    </Link>
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