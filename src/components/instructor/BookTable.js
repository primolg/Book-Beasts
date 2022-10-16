import React, { useEffect } from 'react';
import BookRow from './BookRow';
import { fetchStudentData } from '../../store/reducers/instructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';


const BookTable = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const student = useSelector((state) => state.instructorList.currentStudent)
    const bookList = student.books
    
    useEffect(() => {
        dispatch(fetchStudentData(params.id, params.studentId))
    }, []);
   
    return(

      <div className='booksTable'>

            {bookList.length !== 0 ? (
                <div className='studentBooklist'>
                    <h2>{`${student.firstName}'s`} Book List</h2>
                    <table className='table' id="booksTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Page Total</th>
                                <th>Genre</th>
                                <th>Published</th>
                                <th>Completion Time</th>
                                <th>Incomplete</th>
                                <th>Last Changed</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                          {bookList.map((book) => (
                            <BookRow key={book.id} book={book} student={student}/>
                          ))}
                        </tbody>
                    </table>
                    </div>
            ): (
                <div>
                <h3>This student hasn't created any books yet!</h3>
                <Link to={`/instructorPortal/${params.id}/students`}>
                        <button>Back to Student Roster</button>
                    </Link>
                </div>
            )}
        </div>
       
        
      
       
    )
}

export default BookTable;