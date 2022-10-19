import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BookTable } from '../instructorBooks';

const BookRow = ({ book, student }) => {
    const updatedAt = book.updatedAt;
    const createdAt = book.createdAt;
    const params = useParams();
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
   

    const workTime = () => {
        let [ upYear, upMonth, upDay ] = updatedAt.split('-');
        let [ crYear, crMonth, crDay ] = createdAt.split('-');
        let [ toYear, toMonth, toDay ] = date.split('-');
    
        if(book.isPublished === true) {
        const yearDiff = upYear - crYear;
        const monthDiff = upMonth - crMonth;
        const dayDiff = upDay - crDay;
   
        if (yearDiff > 0 && monthDiff > 0 && dayDiff > 0){
            return `${yearDiff} year(s), ${monthDiff} month(s) & ${dayDiff} day(s)`;
        } else if (monthDiff > 0 && dayDiff > 0){
            return `${monthDiff} month(s) & ${dayDiff} day(s)`;
        }else if (dayDiff > 0){
            return `${dayDiff} day(s)`;
        }else
        
        if (yearDiff === 0 && monthDiff === 0 && dayDiff === 0 ){
            return 'Book completed today!'
        }
        }
        if(book.isPublished === false) {
            const yearDiff = toYear - crYear;
            const monthDiff = toMonth - crMonth;
            const dayDiff = toDay - crDay;
      
            if (yearDiff > 0 && monthDiff > 0 && dayDiff > 0){
                return `${yearDiff} year(s), ${monthDiff} month(s) & ${dayDiff} day(s)`;
            } else if (monthDiff > 0 && dayDiff > 0){
                return `${monthDiff} month(s) & ${dayDiff} day(s)`;
            }else if (dayDiff > 0){
                return `${dayDiff} day(s)`;
            }else
            
            if (yearDiff === 0 && monthDiff === 0 && dayDiff === 0 ){
                return 'Last Updated Today!'
            }
        }
    }

    return(
        <>
         {book && (
                <tr>
                    <td>{book.title}</td>
                    <td>{book.totalPages}</td>
                    <td>{book.genre}</td>
                    <td>{book.isPublished === true &&
                    <div>X</div>}
                    </td>
                    <td>{book.isPublished === true &&
                    <div>{workTime()}</div>}
                    </td>
                    <td>{book.isPublished === false &&
                    <div>X</div>}
                    </td>
                    <td>{book.isPublished === false &&
                    <div>{workTime()}</div>}</td>
                    <td>
                        <BookTable/>
                    {/* <NavLink to={`/instructorPortal/${params.id}/students/${student.id}/books/${book.id}`}>
                        <button>{`View ${book.title}`}</button>
                    </NavLink>  */}
                    </td>
                </tr>
            )}
        </>
    )
}

export default BookRow;

