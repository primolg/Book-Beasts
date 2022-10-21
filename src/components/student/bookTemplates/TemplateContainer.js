import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import templates from "./";
const [Template1, Template2, Template3, Template4, Template5] = templates;

const TemplateContainer = (props) => {
    const page = useSelector(state => state.editor.currentPage);
    // const dispatch = useDispatch();
    const templateId = page?.templateId;

    return(
        <>
            {
                templateId===1 ? <Template1 {...props} /> :
                templateId===2 ? <Template2 {...props} /> :
                templateId===3 ? <Template3 {...props} /> :
                templateId===4 ? <Template4 {...props} /> :
                templateId===5 ? <Template5 {...props} /> : "Checking template..."
            }
        </>
    )
};

export default TemplateContainer;
