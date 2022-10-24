import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ImageWidget from './uploadWidget';

const Template2 = () => {
    const page = useSelector(state => state.editor.currentPage);
    const dispatch = useDispatch();
    
    return (
        <div className="page-outer-div temp2-outer-div">
            <div className={"image-center "}>
                <ImageWidget 
                    croppingRatio={0.57916666666}
                    maxHeight={480}
                    maxWidth={278}
                />
            </div>
        </div>
    );
};

export default Template2;