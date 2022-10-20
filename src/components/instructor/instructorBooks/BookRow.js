import React from 'react';
import { NavLink, useParams } from 'react-router-dom';


const BookRow = ({ singleBook }) => {
    const updatedAt = singleBook.updatedAt;
    const createdAt = singleBook.createdAt;
    const params = useParams();
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
   

    const workTime = () => {
        let [ upYear, upMonth, upDay ] = updatedAt.split('-');
        let [ crYear, crMonth, crDay ] = createdAt.split('-');
        let [ toYear, toMonth, toDay ] = date.split('-');
    
        if(singleBook.isPublished === true) {
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
        if(singleBook.isPublished === false) {
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
    console.log("SINGLE BOOK", singleBook)
    return(
        <>
         {singleBook && (
                <tr>
                    <td>{singleBook.title}</td>
                    <td>{singleBook.totalPages}</td>
                    <td>{singleBook.genre}</td>
                    <td>{singleBook.isPublished === true &&
                    <div>X</div>}
                    </td>
                    <td>{singleBook.isPublished === true &&
                    <div>{workTime()}</div>}
                    </td>
                    <td>{singleBook.isPublished === false &&
                    <div>X</div>}
                    </td>
                    <td>{singleBook.isPublished === false &&
                    <div>{workTime()}</div>}</td>
                    <td>
                    <NavLink to={`/instructorPortal/${params.id}/students/${params.studentId}/books/${singleBook.id}`}>
                        <button className='small-btn draw-border'>{`View ${singleBook.title}`}</button>
                    </NavLink> 
                    </td>
                </tr>
            )}
        </>
    )
}

export default BookRow;

