import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import ImageWidget from './uploadWidget';

const Template2 = ({ defaultPageArt }) => {
    const page = useSelector(state => state.editor.currentPage);
    // const dispatch = useDispatch();

    const hasImage = page.image && page.image !== defaultPageArt;
    const image = page.image;
    
    return (
        <div className="page-outer-div temp2-outer-div">
            <div className={"image-center "}>
                <ImageWidget 
                    croppingRatio={0.57916666666}
                    maxHeight={480}
                    maxWidth={278}
                    templateId={2}
                    hasImage={hasImage}
                    image={image}
                />
            </div>
        </div>
    );
};

export default Template2;
