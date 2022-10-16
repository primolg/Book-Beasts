import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookData } from '../../store/reducers/bookSlice';
import templates from './bookTemplates';

const BookEditor = () => {
    const [pages, setPages] = useState([1]);
    const [currentPage, setCurrentPage] = useState(1);

    const addPage = () => {
        //this should be calling a the add page prototype function on the db model 
        const newPages = pages;
        newPages.push(pages.length ? pages[pages.length - 1] + 1 : 1);
        setPages(newPages);
        setCurrentPage(pages[pages.length - 1]);
    }

    useEffect(() => {
        //grabbing the books pages and setPages() with those pages
    }, []);

    return (
            <div className="outer-div-book-view">
                <div className="page-selector-shelf">
                    {/* {this can be done with bookshelf.js} */}
                    {pages.map(page =>
                        <div className="page-selector" id={currentPage === page ? "selected" : ""} key={page} onClick={()=>setCurrentPage(page)}>{page}</div>
                    )}
                    <div className="page-selector"onClick={addPage}>+</div>
                    <div className="blank-page"></div>
                </div>
                <div className="page">
                    <templates.Template3
                    //should give prop of current page ID for 
                    />
                </div>
            </div>
    )
}


export default BookEditor;