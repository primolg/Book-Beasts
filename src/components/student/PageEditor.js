import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { TemplateContainer, PageEditorOptions } from "./";

const PageEditor = () => {
    return(
        <>
            <div className="page-editor">
                <TemplateContainer />
            </div>
            <PageEditorOptions />
        </>
    );
};

export default PageEditor;
