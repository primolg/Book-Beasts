import React, { useState } from 'react';
import ImageWidget from './uploadWidget';

const Template5 = () => {
    const [text, setText] = useState('');

    return (
        <div className="page-outer-div">
            <div className="title-text-temp5" contentEditable="true">
                        NAME
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