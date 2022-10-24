import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { updatePage } from "../../store/reducers/editorSlice";
import templates from "./bookTemplates";
import { toast, ToastContainer } from "react-toastify";

const PageEditorOptions = () => {
    const book = useSelector(state => state.editor.currentBook);
    const page = useSelector(state => state.editor.currentPage);
    const text = useSelector(state => state.editor.currentText);
    const dispatch = useDispatch();

    const changeTemplate = async (templateId, close) => {
        // console.log("updating template");
        const updatedPage = await dispatch(updatePage({
            ...page,
            templateId,
        }))
        console.log(updatedPage);
        close();
    };

    // should disable save button for a few seconds after clicking
    const handleSave = async () => {
        console.log("Manually saving page content...");
        await dispatch(updatePage({
            ...page,
            content: text,
        }));
    }

    return(
        <div id="page-editor-options">
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
                            {book.totalPages > 2 && (
                                <button className="delete-button">
                                    {`Delete Page ${page?.pageNumber}`}
                                </button>
                            )}
                        </div>
                        <p id="close-popup" onClick={close}>Cancel Changes</p>
                    </div>
                )}
            </Popup>
            <div className="page-settings-btn" onClick={handleSave}>
                <p>Save Work</p><FaRegSave size={22} />
            </div>
        </div>
    )
}

export default PageEditorOptions;
