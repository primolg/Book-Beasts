import React, { useState } from 'react';

const Template5 = () => {
    const [text, setText] = useState('');
    const [image, setImage] = useState(undefined);

    return (
        <div className="page-outer-div temp3-outer-div">
            <div className='text-img-div'>
                <div className="small-image-page">
                    {image ? 
                        image : 
                        <input type="file" name="img" accept=".jpg,.jpeg,.png" onChange={(event) => setImage(event.target.value)}></input>
                    }
                </div>
                <div className="small-text-page" contentEditable="true">
                    type here
                </div>
            </div>        
        </div>
    );
};

export default Template5;