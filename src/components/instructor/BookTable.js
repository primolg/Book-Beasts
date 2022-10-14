import React, { useEffect } from 'react';
import BookRow from './BookRow';
import { fetchStudentData } from '../../store/reducers/instructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';


const BookTable = (props) => {
    // const dispatch = useDispatch();
    // const params = useParams();
    // const student = useSelector((state) => state.instructorList.currentStudent);
    
    // console.log('BOOK TABLE LIST', student.books);
    // console.log('BOOK TABLE STUDENT', student)

    // useEffect(() => {
    //     dispatch(fetchStudentData(params.id, student.id));
    // }, []);
   

    console.log('BOOK TABLE STUDENT', props);
    return(

      <div className='booksTable'>
            <h1>PLACEHOLDER</h1>
     
                
{/* 
            {student.books == [] ? (
                <div className='studentBooklist'>
                    <h1>{`${student.firstName}'s`} Book List</h1>
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
                          {student.books.map((book) => (
                            <BookRow key={book.id} book={book} />
                          ))}
                        </tbody>
                    </table>
                    </div>
            ): (
                <h3>This student hasn't created any books yet! PLACEHOLDER FOR ADD BUTTON</h3>
            )} */}
        </div>
       
        
      
       
    )
}

export default BookTable;