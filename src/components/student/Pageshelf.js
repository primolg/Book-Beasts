import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { fetchBook, addNewPage, setCurrentPage } from "../../store/reducers/editorSlice";
import templates from "./bookTemplates";

const Pageshelf = () => {
    const currentBook = useSelector(state => state.editor.currentBook);
    const pages = currentBook?.pages;
    const currentPage = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    const shelf = useRef();

    const addPage = async (templateId) => {
        const updatedBook = await dispatch(addNewPage(currentPage.bookId, templateId));
        if (!updatedBook) {
            // alert("Could not add new page!");
        } else {
            shelf.current.scrollLeft = 10000;
            dispatch(setCurrentPage(updatedBook.pages[updatedBook.pages.length-1]));
        }
    };

    return(
        <div className="page-selector-shelf-editor" ref={shelf}>
            {pages.map(page =>
                <div className="page-selector-editor" id={currentPage?.id === page.id ? "selected-editor" : ""} key={page.id || page} onClick={()=>dispatch(setCurrentPage(page))}>{page.pageNumber}</div>
            )}
            <Popup
                modal
                className="new-book"
                trigger={
                    <div className="page-selector-editor" onClick={addPage}>
                        +
                    </div>
                }
            >
                {close => (
                    <div className="new-book-popup-form">
                        <h3 id="temp-selection-header">Select a template for your new page:</h3>
                        <div className="template-selection" onClick={close}>
                        {templates.map((t, i) => 
                            <div key={i} className="template-single" onClick={(e) => addPage(i+1)}>
                                <p>{`Template ${i + 1}`}</p>
                                <img src={`/templates/temp${i+1}.png`}/>
                            </div>
                        )}
                        </div>
                    </div>
                )}
            </Popup>

            <div className="blank-page-editor"></div>
        </div>
    )
}

export default Pageshelf;
