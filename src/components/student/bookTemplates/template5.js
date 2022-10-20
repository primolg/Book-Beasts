import React, { useState, useRef } from 'react';
import ImageWidget from './uploadWidget';

const Template5 = () => {
    const [text, setText] = useState('');
    const pageText = useRef(null);

    function textSetter(){
        setText(pageText.current.innerHTML);
    }

    return (
        <div className="page-outer-div">
            <div className="title-text-temp5" ref={pageText} contentEditable="true">
                TITLE
            </div>
            <div className="image-center">
                <ImageWidget 
                    croppingRatio={0.9}
                />
            </div>
        </div>
    );
};

export default Template5;