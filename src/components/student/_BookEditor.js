import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { fetchBook, addNewPage } from "../../store/reducers/editorSlice";
// components
import templates from './bookTemplates';
import { EditorBookInfo, PublishDeleteButtons } from "./";

const BookEditor = () => {
    const bookId = useParams().id;
    const currentBook = useSelector(state => state.editor);
    const dispatch = useDispatch();

    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState({});

    const addPage = async () => {
        const updatedBook = await dispatch(addNewPage(bookId));
        if (!updatedBook) {
            alert("Could not add new page!");
        } else {
            setCurrentPage(updatedBook.pages[updatedBook.pages.length-1]);
        }
    };

    // if creating new book, gets info from state; if navigating directly to page, fetch from db
    useEffect(() => {
        if (currentBook.pages) {
            setPages(currentBook.pages);
            // only selects 1st page if no page is selected
            if (currentPage !== {}) {
                setCurrentPage(currentBook.pages[0]);
            }
        } else if (!currentBook.id) {
            dispatch(fetchBook(bookId));
        }
    }, [currentBook.pages]);

    // need to fix bug where this will fetch nothing after deleting a book
    useEffect(() => {
        if (currentBook?.id !== bookId) {
            dispatch(fetchBook(bookId));
        }
    }, [bookId]);

    // const autosave = () => {};

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

                    <PublishDeleteButtons bookId={currentBook?.id} />
                </div>
        )
    }
}

export default BookEditor;
