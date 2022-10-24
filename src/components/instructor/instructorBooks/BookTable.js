import React, { useEffect } from 'react';
import BookRow from './BookRow';
import { fetchStudentData } from '../../../store/reducers/instructorSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';


const BookTable = () => {
    const dispatch = useDispatch();
    const params = useParams();
    // const navigate = useNavigate();
    const student = useSelector((state) => state.instructorList.currentStudent)
    const books= student.books;
    // //
    useEffect(() => {
        dispatch(fetchStudentData(params.id, params.studentId))
    }, []);

   console.log('BOOKLIST', student)
   console.log("BOOKLIST", books)
    return(
        <div className='table-container'>
      <div className='booksTable' id="book-table">

            {books.length !==0 ? (
                <div className='bookList'>
                    <div className='table-title'>
                    <h1> Book List</h1>
                    </div>
                    <table className='table-fill' id="booksTable">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Total Pages</th>
                                <th>Genre</th>
                                <th>Published</th>
                                <th>Completion Time</th>
                                <th>Incomplete</th>
                                <th>Last Changed</th>
                                <th>View Book</th>
                            </tr>
                        </thead>
                        <tbody className='table-hover'>
                          {books.map((book) => (
                            <BookRow key={book.id} singleBook={book} />
                          ))}
                        </tbody>
                    </table>
                    </div>
            ): (
                <div>
                <h3>This student hasn't created any books yet!</h3>
                <button className='small-btn' onClick={() => navigate(-1)}>Back To Roster</button>
                </div>
            )}
        </div>
       
        
        </div>
       
    )
}

export default BookTable;