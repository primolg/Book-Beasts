import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePage, clearCurrentBook } from "../../../store/reducers/editorSlice";
import templates from "./";
const [Template1, Template2, Template3, Template4] = templates;
const defaultPageArt = "https://res.cloudinary.com/ddqp7dojc/image/upload/v1665439674/capstone/insertImage_vubntn.jpg";

const TemplateContainer = (props) => {
    const page = useSelector(state => state.editor.currentPage);
    const uploadedImg = useSelector(state => state.editor.uploadedImg);
    const dispatch = useDispatch();
    const templateId = page?.templateId;

    // clear book in store when leaving the editor
    useEffect(() => {
        return () => {
            dispatch(clearCurrentBook());
        }
    }, []);

    // detects image changes and updates page
    useEffect(() => {
        if (uploadedImg !== "") {
            dispatch(updatePage({
                ...page,
                image: uploadedImg,
            }));
        }
    }, [uploadedImg]);
    
    return(
        <div className="page-editor">
            {
                templateId===1 ? <Template1 {...props} /> :
                templateId===2 ? <Template2 {...props} defaultPageArt={defaultPageArt}/> :
                templateId===3 ? <Template3 {...props} defaultPageArt={defaultPageArt}/> :
                templateId===4 ? <Template4 {...props} defaultPageArt={defaultPageArt}/> : "Checking template..."
            }
        </div>
    )
};

export default TemplateContainer;
