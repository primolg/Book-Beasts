import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData, fetchStudentData } from '../../../store/reducers/instructorSlice';
import { InstructorHeader } from '../instructorTabs';
import HTMLFlipBook from 'react-pageflip';
import ViewSingleBook1 from './ViewSingleBook1';
import ViewSingleBook2 from './ViewSingleBook2';
import ViewSingleBook3 from './ViewSingleBook3';
import ViewSingleBook4 from './ViewSingleBook4';

//

const ViewSingleBook = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const student = useSelector((state) => state.instructorList.currentStudent);
    const book = useSelector((state) => state.instructorList.currentBook);
    const pages = book && book.pages ? filterPages(book.pages) : undefined;
    const [currentPage, setCurrentPage] = useState(0);

    function filterPages(pages){
        let orderedPages = [];
        let currentPage = pages.filter((page) => page.isFirstPage);
        orderedPages.push({pageNumber: 1, page : currentPage[0]});

        let counter = 0;
        while(orderedPages.length < pages.length){
            let nextPage = pages.filter((page) => page.id == orderedPages[counter].page.nextPage);
            orderedPages.push({pageNumber: (counter + 2), page : nextPage[0]});
            counter++;
        }
        return orderedPages;
    }

    useEffect(() => {
        dispatch(fetchBookData(params.id, params.studentId, params.bookId));
    }, []);

    console.log("BOOK STUDENT", book);

  return pages ? (
    <>
    <InstructorHeader/>
    <div className="content-container">
    <button className='book-back-btn' onClick={() => navigate(-1)}>Back</button>
    <h1>{`"${book.title}" by ${student.firstName} ${student.lastName}`}</h1>
        <HTMLFlipBook width={300} height={500}>
        {pages.map((page) => {
        switch(page.page.templateId){
            case 1:
                return (
            <div className="demoPage">
                <ViewSingleBook1 key={page.page.id} page={page}/>
            </div>)
            case 2:
                return (
            <div className="demoPage">
                <ViewSingleBook2 key={page.page.id} page={page}/>
            </div>)
            case 3:
                return (
            <div className="demoPage">
                <ViewSingleBook3 key={page.page.id} page={page}/>
            </div>
                )
            case 4:
                return (
            <div className="demoPage">
                <ViewSingleBook4 key={page.page.id} page={page}/>
            </div>
                )
            default:
                return (
            <div className="demoPage">
                <ViewSingleBook3 key={page.page.id} page={page}/>
            </div>)
            }
        }
    )}
        </HTMLFlipBook>
        <div className="book-view-instructions">Swipe or click to turn the page!</div>
    </div>
    </>
    ) : (
        <div>
        no book data
        </div>
    )   
}

export default ViewSingleBook;