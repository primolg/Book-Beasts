import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { updatePage, deletePage } from "../../store/reducers/editorSlice";
import templates from "./bookTemplates";
import { toast, ToastContainer, Slide } from "react-toastify";

const PageEditorOptions = () => {
    const book = useSelector(state => state.editor.currentBook);
    const page = useSelector(state => state.editor.currentPage);
    const text = useSelector(state => state.editor.currentText);
    const dispatch = useDispatch();

    const changeTemplate = async (templateId, close) => {
        await dispatch(updatePage({
            ...page,
            templateId,
        }))
        close();
    };

    const [canUpdate, setCanUpdate] = useState(true);
    const popupTimer = 3000;

    const handleSave = async () => {
        if (!canUpdate) return;

        const res = await dispatch(updatePage({
            ...page,
            content: text,
        }));
        if (res) toast.success("Saved your page!");
        else toast.error("Unable to save. Try again later!");
        setCanUpdate(false);
    };

    // only allows clicking 'save' every 4.5s
    useEffect(() => {
        if (canUpdate===false) {
            setTimeout(() => {
                setCanUpdate(true);
            }, (popupTimer * 1.5))
        }
    }, [canUpdate])

    const handleDelete = async (close) => {
        close();
        const res = await dispatch(deletePage(page));
        if (res) toast.success("Page deleted!");
        else toast.error("Unable to delete page. Try again later!");
    };

    return(
        <div id="page-editor-options">
            <ToastContainer
                position="top-center"
                hideProgressBar={true}
                transition={Slide}
                autoClose={popupTimer}
            />
            <Popup modal className="edit-book-attribute" trigger={
                <div className="page-settings-btn">
                    <p>Page Settings</p><FaPencilAlt size={19}/>
                </div>
            }>
                {close => (
                    <div className="edit-book-popup-form">
                        <div id="page-edit-form">
                            <div id="change-template-container">
                                <h3 id="temp-selection-header">Change page template:</h3>
                                <div className="template-selection-page">
                                    {templates.map((t, i) => 
                                        <div key={i} className="template-single" onClick={(e) => changeTemplate(i+1, close)}>
                                            <p>{`Template ${i + 1}`}</p>
                                            <img src={`/templates/temp${i+1}.png`} className="change-temp-img"/>
                                        </div>
                                    )}
                                </div>
                            </div>    
                            {book.totalPages > 2 ? (
                                <button className="delete-button" onClick={(e) => handleDelete(close)}>
                                    {`Delete Page ${page?.pageNumber}`}
                                </button>
                            ) : (
                                <p id="page-min-tooltip"><i>Note: Books have a minimum of 2 pages.</i></p>
                            )}
                        </div>
                        <p id="close-popup" onClick={close}>Cancel Changes</p>
                    </div>
                )}
            </Popup>
            <div className="page-settings-btn" onClick={handleSave}>
                <p>Save Page</p><FaRegSave size={22} />
            </div>
        </div>
    )
}

export default PageEditorOptions;
