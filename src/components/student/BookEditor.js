import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import templates from './bookTemplates';
// import { createNewBook } from "../../store/reducers/editorSlice";

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
                <div className="page-selector-shelf-editor">
                    {/* {this can be done with bookshelf.js} */}
                    {pages.map(page =>
                        <div className="page-selector-editor" id={currentPage === page ? "selected-editor" : ""} key={page} onClick={()=>setCurrentPage(page)}>{page}</div>
                    )}
                    <div className="page-selector-editor"onClick={addPage}>+</div>
                    <div className="blank-page-editor"></div>
                </div>
                <div className="page-editor">
                    <templates.Template4
                    //should give prop of current page ID to be able to post 
                    />
                </div>
            </div>
    )
}


export default BookEditor;