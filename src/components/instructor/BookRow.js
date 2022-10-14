import React from 'react';
import ViewSingleBook from './ViewSingleBook';

const BookRow = ({ book }) => {
    console.log('BOOK ROW BOOK', book);

    return(
        <>
         {book && (
                <tr>
                    <td>{book.title}</td>
                    <td>{book.totalPages}</td>
                    <td>{book.genre}</td>
                    <td>{book.isPublished}</td>
                    <td>Completion Time</td>
                    <td>{book.isPublished}</td>
                    <td>{book.lastUpdated}</td>
                    <td>
                        <ViewSingleBook book={book} />
                    </td>
                </tr>
            )}
        </>
    )
}

export default BookRow;