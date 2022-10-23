import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { FaPencilAlt, FaCog } from "react-icons/fa";
import { updateBook, deleteBook, clearUploadImg } from "../../store/reducers/editorSlice";
import { ImageWidget } from "./";
const defaultCoverArt = "https://res.cloudinary.com/ddqp7dojc/image/upload/v1665424523/capstone/book-covers-big-2019101610_nlctt9.jpg"

// need to separate popup forms into separate component at some point
const EditorBookInfo = () => {
    // TEMPORARY THEMES
    const themes = ["general fiction", "autobiography", "sci-fi", "fantasy", "poetry", "historical", "adventure", "mystery"];

    const book = useSelector(state => state.editor.currentBook);
    const uploadedImg = useSelector(state => state.editor.uploadedImg);
    const student = useSelector(state => state.user);
    const titleRef = useRef();
    const genreRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [hideOldCover, setHideOldCover] = useState(false);
    const [hasCover, setHasCover] = useState(book?.coverArt!==defaultCoverArt);

    const handleDelete = async (e) => {
        if (e.target.name==="delete") {
            if (confirm("Are you sure you want to delete this book? Once you do, there's no going back!")) {
                const res = await dispatch(deleteBook(book.id));
                if (res) {
                    alert("Book successfully deleted!");
                    navigate(`/student`);
                }
            }
        } else {
            // console.log("Unable to process request");
            return;
        }
    }

    useEffect(() => {
        if (hasCover && uploadedImg) {
            setHideOldCover(true);
        }
    }, [uploadedImg]);

    const handleSubmit = async (e, close) => {
        const updated = { id: book.id };
        if (titleRef.current?.value) updated.title = titleRef.current.value;
        if (genreRef.current?.value) updated.genre = genreRef.current.value;
        if (uploadedImg) {
            updated.coverArt = uploadedImg;
            setHasCover(true);
            setHideOldCover(false);
        }

        await dispatch(updateBook(updated));
        close();
    };

    if (!book?.id) {
        return("Loading...");
    } else {
        return(
            <div id="basic-info-container">
                <div className="attribute">
                    <h2>{`"${book.title}"`}</h2>
                    <Popup modal className="edit-book-attribute" trigger={<div id="book-settings-btn">{/*<p>Book Settings</p>*/}<FaCog size={20}/></div>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h2>Book Options</h2>
                                <div id="edit-form">
                                    <label htmlFor="title">Title:
                                        <input type="text"
                                            name="title"
                                            ref={titleRef}
                                            defaultValue={book.title}>
                                        </input>
                                    </label>
                                    
                                    <label htmlFor="genre" id="form-genre">Genre:
                                        <select name="genre" ref={genreRef} defaultValue={book.genre}>
                                            {themes.map((theme, i) => 
                                                <option value={theme} key={i}>
                                                    {theme}
                                                </option>    
                                            )}
                                        </select>
                                    </label>
                                    {!hasCover? (
                                            <ImageWidget isCover={true} hasCover={false} croppingRatio={0.9}/>
                                        ) : (
                                            <>
                                                <img src={book.coverArt} className="book-form-coverart" hidden={hideOldCover}/>
                                                <ImageWidget isCover={true} hasCover={true} croppingRatio={0.9}/>
                                            </>
                                        )
                                    }
                                    

                                    <div className="form-btn-container">
                                        <button id="delete-button" onClick={handleDelete} name="delete">Delete Book</button>
                                        <button id="new-book-btn" onClick={(e)=>handleSubmit(e,close)}>Save changes</button>
                                    </div>        
        
                                    <p onClick={close} id="close-popup">Cancel Changes</p>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
                <div className="attribute">
                    <p><i>{`By ${student.firstName}`}</i></p>
                </div>
            </div>
        )
    }
};

export default EditorBookInfo;
