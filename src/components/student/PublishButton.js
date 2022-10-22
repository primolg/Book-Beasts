import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateBook } from "../../store/reducers/editorSlice";

const PublishButton = () => {
    const bookId = useSelector(state => state.editor.currentBook.id);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        const res = await dispatch(updateBook({
            id: bookId,
            isPublished: true,
        }));
        if (res) {
            alert("Successfully published book!");
            navigate(`/books/${bookId}`);
        }
    }
    
    return(
        <div id="publish-container">
            <button id="publish-button" onClick={handleClick} name="publish">Publish Book</button>
        </div>
    )
};

export default PublishButton;
