import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Popup from 'reactjs-popup';
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { updatePage } from "../../store/reducers/editorSlice";
import templates from "./bookTemplates";
// toastify

const PageEditorOptions = () => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();

    const changeTemplate = async (templateId, close) => {
        console.log("updating template");
        await dispatch(updatePage({
            ...page,
            templateId,
        }))
        // close();
    };

    const save = async () => {

    }

    return(
        <div id="page-editor-options">
            <Popup modal className="edit-book-attribute" trigger={
                <div className="page-settings-btn">
                    <p>Page Settings</p><FaPencilAlt size={19}/>
                </div>
            }>
                {close1 => (
                    <div className="edit-book-popup-form">
                        <div id="page-edit-form">
                            <button className="delete-button">{`Delete Page ${page?.pageNumber}`}</button>
                            <Popup
                                modal
                                className="new-book"
                                trigger={<button>Change Page Template</button>}
                            >
                                {close2 => (
                                    <div className="new-book-popup-form">
                                        <h3 id="temp-selection-header">Select a new template for your page:</h3>
                                        <div className="template-selection">
                                        {templates.map((t, i) => 
                                            <div key={i} className="template-single" onClick={(e) => console.log("hello")}>
                                                <p>{`Template ${i + 1}`}</p>
                                                <img src={`/templates/temp${i+1}.png`}/>
                                            </div>
                                        )}
                                        </div>
                                    </div>
                                )}
                            </Popup>                            
                        </div>
                        <p id="close-popup">Cancel Changes</p>
                    </div>
                )}
            </Popup>
            <div className="page-settings-btn">
                <p>Save Work</p><FaRegSave size={22} />
            </div>
        </div>
    )
}

export default PageEditorOptions;
