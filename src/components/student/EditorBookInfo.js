import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { updateBook } from "../../store/reducers/editorSlice";
import { FaPencilAlt } from "react-icons/fa";

// need to separate popup forms into separate component at some point
const EditorBookInfo = ({ book }) => {
    const titleRef = useRef();
    const genreRef = useRef();
    const dispatch = useDispatch();

    // TEMPORARY THEMES
    const themes = ["general fiction", "autobiography", "sci-fi", "fantasy", "poetry", "historical", "adventure", "mystery"];

    const handleSubmit = async (e, close) => {
        e.preventDefault();
        console.log(book.id);

        if (titleRef.current?.value) {
            await dispatch(updateBook({
                id: book.id,
                title: titleRef.current.value
            }));
        } else if (genreRef.current?.value) {
            await dispatch(updateBook({
                id: book.id,
                genre: genreRef.current.value
            }))
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
                    <Popup modal className="edit-book-attribute" trigger={<div><FaPencilAlt /></div>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h3>Update your book title:</h3>
                                <form id="title">
                                    <input type="text"
                                        name="title"
                                        ref={titleRef}
                                        defaultValue={book.title}>
                                    </input>
                                    <button id="new-book-btn" type="submit" onClick={(e)=>handleSubmit(e,close)}>Submit</button>
                                </form>
                                <p onClick={close} id="close-popup">Cancel</p>
                            </div>
                        )}
                    </Popup>
                </div>

                <div className="attribute">
                    <p>{`Genre: ${book.genre}`}</p>
                    <Popup modal className="edit-book-attribute" trigger={<div><FaPencilAlt /></div>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h3>Change your book's genre:</h3>
                                <form>
                                    <select name="genre" ref={genreRef} defaultValue={book.genre}>
                                        {themes.map((theme, i) => 
                                            <option value={theme} key={i}>
                                                {theme}
                                            </option>    
                                        )}
                                    </select>
                                    <button id="new-book-btn" type="submit" onClick={(e)=>handleSubmit(e,close)}>Submit</button>
                                </form>
                                <p onClick={close} id="close-popup">Cancel</p>
                            </div>
                        )}
                    </Popup>
                </div>

                <div className="attribute">
                    <p>{`Update cover art: `}</p>
                    <Popup modal className="edit-book-attribute" trigger={<div><FaPencilAlt /></div>}>
                        {close => (
                            <div className="edit-book-popup-form">
                                <h3>Upload cover art:</h3>
                                <form>
                                    <p>Cloudinary placeholder</p>
                                    <button id="new-book-btn" type="submit" onClick={()=>console.log("Placeholder")}>Submit</button>
                                </form>
                                <p onClick={close} id="close-popup">Cancel</p>
                            </div>
                        )}
                    </Popup>
                </div>

                <p>{`${book.totalPages} pages`}</p>
                {/* publish button here */}
            </div>
        )
    }
};

export default EditorBookInfo;
