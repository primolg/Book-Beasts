import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookTable } from '../instructorBooks';
import  DeleteStudent  from "./DeleteStudent";
import  EditStudent  from "./EditStudent";

const StudentRow = ( {student}) => {
    const params = useParams();
    console.log('STUDENT ROW STUDENT', student)
    
    return(
        <>
            {student && (
                <tr>
                    <td className='text-center'>{student.firstName}</td>
                    <td className='text-center'>{student.lastName}</td>
                    <td className='text-center'>{student.username}</td>
                    <td className='text-center'>{student.color}</td>
                    <td className='text-center'> 
                    <Link to={`/instructorPortal/${params.id}/students/${student.id}/books`} student={student}>
                        <button className="small-btn draw-border">View Books</button>
                    </Link>
                        </td>
                
                    <td className='text-center'>{student.email}</td>
                    <td className='text-center'>
                        <EditStudent student={student} />
                    </td>
                    <td className='text-center'>
                        <DeleteStudent student={student} />
                    </td>
                </tr>
            )}
        </>
    )
};

export default StudentRow;