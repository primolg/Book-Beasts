import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TemplateContainer, Autosave } from "./";

const PageEditor = () => {
    const page = useSelector(state => state.editor.currentPage);
    // bool for detecting user changes (to autosave)
    const [changes, setChanges] = useState(false);

    return(
        <div className="page-editor">
            {/* Can add settings/delete button at top (for editing template+) */}
            <TemplateContainer setChanges={setChanges} />
            <Autosave changes={changes} setChanges={setChanges} />
        </div>
    );
};

export default PageEditor;
