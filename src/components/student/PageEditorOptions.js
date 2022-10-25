import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { FaTrash, FaPencilAlt, FaRegSave } from "react-icons/fa";
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

    const iconScale = 31;

    return(
        <div id="page-editor-options-container">
            <ToastContainer
                position="top-center"
                hideProgressBar={true}
                transition={Slide}
                autoClose={popupTimer}
            />
            <p id="page-editor-options-header">Page Options</p>
            <div id="page-editor-options">
                {/* Delete page */}
                <Popup modal className="edit-book-attribute" trigger={
                    <div className="page-settings-btn">
                        <FaTrash size={iconScale*0.9}/><p>Delete Page</p>
                    </div>
                }>
                    {close => (
                        <div className="edit-book-popup-form">
                            <div id="page-edit-form">
                                {book.totalPages > 2 ? (
                                    <>
                                        <h3 id="temp-selection-header">Are you sure you want to delete this page?</h3>
                                        <p><i>Once you do, there's no going back!</i></p>
                                        <button className="delete-button" onClick={(e) => handleDelete(close)}>
                                            {`Delete Page ${page?.pageNumber}`}
                                        </button>
                                        <p id="close-popup" onClick={close}>Wait, I want to keep this page!</p>
                                    </>
                                ) : (
                                    <>
                                        <p id="page-min-tooltip">Sorry, you can't delete this page. All books must have <i>at least</i> 2 pages!</p>
                                        <p id="close-popup" onClick={close}>Return to editor</p>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Popup>

                {/* Change template */}
                <Popup modal className="edit-book-attribute" trigger={
                    <div className="page-settings-btn">
                        <FaPencilAlt size={iconScale*0.92}/><p>Edit Template</p>
                    </div>
                }>
                    {close => (
                        <div className="edit-book-popup-form">
                            <div id="page-edit-form">
                                <div id="change-template-container">
                                    <h3 id="temp-selection-header">{`Change template for page ${page.pageNumber}:`}</h3>
                                    <div className="template-selection-page">
                                        {templates.map((t, i) => 
                                            <div key={i} className="template-single" onClick={(e) => changeTemplate(i+1, close)}>
                                                <p>{`Template ${i + 1}`}</p>
                                                <img src={`/templates/temp${i+1}.png`} className="change-temp-img"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <p id="close-popup" onClick={close}>Cancel Changes</p>
                        </div>
                    )}
                </Popup>

                {/* Save page content */}
                <div className="page-settings-btn" onClick={handleSave}>
                    <FaRegSave size={iconScale*1.05} /><p>Save</p>
                </div>
            </div>
        </div>
    )
}

export default PageEditorOptions;
