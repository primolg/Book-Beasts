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
                <tr className='flex-table row' role="rowgroup">
                    <td className='flex-row first text-center' role="cell">{student.firstName}</td>
                    <td className='flex-row text-center' role="cell">{student.lastName}</td>
                    <td className='flex-row text-center' role="cell">{student.username}</td>
                    <td className='flex-row text-center' role="cell">{student.color}</td>
                    <td className='flex-row text-center' role="cell"> 
                    <Link to={`/instructorPortal/${params.id}/students/${student.id}/books`} student={student}>
                        <button className="small-btn draw-border" id="view">View Books</button>
                    </Link>
                        </td>
                
                    <td className='flex-row text-center' role="cell">{student.email}</td>
                    <td className='flex-row text-center' role="cell">
                        <EditStudent id="view" student={student} />
                    </td>
                    <td className='flex-row text-center' role="cell">
                        <DeleteStudent id="view" student={student} />
                    </td>
                </tr>
            )}
        </>
    )
};

export default StudentRow;