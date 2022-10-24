import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { updateBook } from "../../store/reducers/editorSlice";
const defaultCoverArt = "https://res.cloudinary.com/ddqp7dojc/image/upload/v1665424523/capstone/book-covers-big-2019101610_nlctt9.jpg"

const PublishButton = () => {
    const book = useSelector(state => state.editor.currentBook)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitPublish = async (close) => {
        const res = await dispatch(updateBook({
            id: book.id,
            isPublished: true,
        }));
        if (res) {
            alert("Successfully published book!");
            navigate(`/books/${book.id}`);
        }

        close();
    }

    
    return(
        <div id="publish-container">
            <Popup modal 
                className="edit-book-attribute"
                trigger={<button
                    id="publish-button"
                    name="publish">Publish Book
                </button>}
            >
                {close => (
                    <div id="publish-popup" className="edit-book-popup-form">
                        <h2>Ready to publish?</h2>
                        <p>{`Your '${book.genre}' book is ${book.totalPages} pages long.`}</p>
                        {book.coverArt===defaultCoverArt ? (
                            <p>You have not added a custom cover art. Go back to settings if you'd like to add one!</p>
                            ) : (
                                <div className="cover-art-container-publish">
                                    <p>Your cover art:</p>
                                    <img src={book.coverArt} />
                                </div>
                            )
                        }
                        <p>Make sure you have proofread your book. <br /><b>Once you publish, you can't make ANY changes!</b></p>

                        <button onClick={(e) => {submitPublish(close)}}>{`Publish "${book.title}"`}</button>
                        <p onClick={close} id="cancel-publish">Wait, I'm not ready!</p>
                    </div>
                )}

            </Popup>
        </div>
    )
};

export default PublishButton;
