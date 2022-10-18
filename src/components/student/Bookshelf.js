import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createNewBook } from "../../store/reducers/editorSlice";

// theme == genre
const Bookshelf = ({books, themes}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector(state => state.user);

    const handleClick = async (theme) => {
        const res = await dispatch(createNewBook({
            genre: theme,
            studentId: student?.id,
        }));
        if (res) navigate(`/editor/${res.id}`);
        else alert("Could not create book");
    };

    return !themes ? (
            <div className="shelf-div-student">
                {books.map(book => 
                    <div key={book.id} className="book-in-shelf-student">
                        <Link to={"/books/" + book.id}>{book.title}</Link>

                    </div>
                )}
            </div>
    ) : (
        <div className="shelf-div-student">
            {themes.map(theme => 
                <div key={theme} className="book-in-shelf-student">
                    <p onClick={() => handleClick(theme)}>
                        {theme}
                    </p>
                </div>
            )}
        </div>
    )
}


export default Bookshelf;
