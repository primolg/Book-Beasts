import React, { useState } from 'react';
import ImageWidget from './uploadWidget';
const Template2 = () => {
    
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