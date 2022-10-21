import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ImageWidget from './uploadWidget';

const Template2 = ({ setChanges }) => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    
    return (
        <div className="page-outer-div">
            <div className="image-center">
                <ImageWidget 
                    croppingRatio={0.9}
                />
            </div>
        </div>
    );
};

export default Template2;