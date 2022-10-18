import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchBook } from "../../store/reducers/editorSlice";
// components
import templates from './bookTemplates';
import { EditorBookInfo } from "./";

const BookEditor = () => {
    const bookId = useParams().id;
    const currentBook = useSelector(state => state.editor);
    const dispatch = useDispatch();

    const [pages, setPages] = useState([1]);
    const [currentPage, setCurrentPage] = useState({});

    const addPage = () => {
        //this should be calling a the add page prototype function on the db model 
        const newPages = pages;
        newPages.push(pages.length ? pages[pages.length - 1] + 1 : 1);
        setPages(newPages);
        setCurrentPage(pages[pages.length - 1]);
    };

    // if creating a new book, gets the info from state
    // if navigating directly to this page, fetch the book from db (needs auth)
    useEffect(() => {
        if (currentBook.pages) {
            setPages(currentBook.pages);
            setCurrentPage(currentBook.pages[0]);
        } else if (!currentBook.id) {
            dispatch(fetchBook(bookId));
        }
    }, [currentBook.pages]);

    const autosave = () => {

    };

    if (currentBook.isPublished) {
        return (
            <h2>Cannot edit published book!</h2>
        )
    } else if (!currentBook.title) {
        return (
            <h3>Loading...</h3>
        )
    } else {
        return (
                <div className="outer-div-book-view">
                    <EditorBookInfo book={currentBook} />
                    <div className="page-selector-shelf-editor">
                        {/* {this can be done with bookshelf.js} */}
                        {pages.map(page =>
                            <div className="page-selector-editor" id={currentPage.id === page.id ? "selected-editor" : ""} key={page.id || page} onClick={()=>setCurrentPage(page)}>{page.pageNumber}</div>
                        )}
                        <div className="page-selector-editor"onClick={addPage}>+</div>
                        <div className="blank-page-editor"></div>
                    </div>

                    <div className="page-editor">
                        <templates.Template1 page={currentPage} />
                    </div>
                </div>
        )
    }
}

export default BookEditor;
