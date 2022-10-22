import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { FaPencilAlt, FaCog } from "react-icons/fa";
import { updateBook, deleteBook } from "../../store/reducers/editorSlice";
import { ImageWidget } from "./bookTemplates";

// need to separate popup forms into separate component at some point
const EditorBookInfo = () => {
    // TEMPORARY THEMES
    const themes = ["general fiction", "autobiography", "sci-fi", "fantasy", "poetry", "historical", "adventure", "mystery"];

    const book = useSelector(state => state.editor.currentBook);
    const student = useSelector(state => state.user);
    const titleRef = useRef();
    const genreRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = async (e) => {
        if (e.target.name==="delete") {
            if (confirm("Are you sure you want to delete this book?")) {
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

    const handleSubmit = async (e, close) => {
        e.preventDefault();

        if (titleRef.current?.value) {
            await dispatch(updateBook({
                id: book.id,
                title: titleRef.current.value,
                genre: genreRef.current.value
            }));
        }
        // handle image uploading here

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
                                <h3>Edit your book:</h3>
                                <form id="edit-form">
                                    <label htmlFor="title">Title:
                                        <input type="text"
                                            name="title"
                                            ref={titleRef}
                                            defaultValue={book.title}>
                                        </input>
                                    </label>
                                    
                                    <label htmlFor="genre">Genre:
                                        <select name="genre" ref={genreRef} defaultValue={book.genre}>
                                            {themes.map((theme, i) => 
                                                <option value={theme} key={i}>
                                                    {theme}
                                                </option>    
                                            )}
                                        </select>
                                    </label>

                                    <label htmlFor="coverArt">Upload cover art</label>
                                    {/* Cover image upload */}

                                    <button id="new-book-btn" type="submit" onClick={(e)=>handleSubmit(e,close)}>Update</button>
                                </form>
                                <button id="delete-button" onClick={handleDelete} name="delete">Delete Book</button>
                                <p onClick={close} id="close-popup">Cancel changes</p>
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
