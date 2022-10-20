import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewBook } from "../../store/reducers/editorSlice";
import Popup from 'reactjs-popup';

// theme == genre
const Bookshelf = ({books, themes}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const student = useSelector(state => state.user);
    const [theme, setTheme] = useState("");
    const titleRef = useRef();

    const createBookAndRedirect = async () => {
        const res = await dispatch(createNewBook({
            title: titleRef.current.value,
            genre: theme,
            studentId: student?.id,
        }));
        if (res) navigate(`/editor/${res.id}`);
        else alert("Could not create book");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (titleRef.current.value.length < 3) {
            alert("Book title must be more than 2 letters!")
        } else {
            createBookAndRedirect();
        }
    };

    const handleClick = (theme) => {
        setTheme(theme);
    };

    return !themes ? (
                <div className="shelf-div-student">
                    {books.map(book => 
                        <div key={book.id} className="book-in-shelf-student">
                            <Link to={(book.isPublished ? "/books/" : "/editor/") + book.id}>{book.title}</Link>
                        </div>
                    )}
                </div>
        ) : (
            <div className="shelf-div-student">
                {themes.map((theme, i) => 
                <Popup key={i} modal className="new-book" trigger={
                    <div className="book-in-shelf-student">
                        <p onClick={() => handleClick(theme)}>
                            {theme}
                        </p>
                    </div>
                }>
                    {close => (
                        <div className="new-book-popup-form">
                            <h3>What will your<i>{` ${theme} `}</i>book be titled?</h3>
                            <form>
                                <input type="text" ref={titleRef}></input>
                                <button id="new-book-btn" type="submit" onClick={handleSubmit}>Start new book!</button>
                            </form>
                            <p onClick={close} id="close-popup">Select a different genre</p>
                        </div>
                    )}
                </Popup>
                )}
            </div>)
}


export default Bookshelf;
