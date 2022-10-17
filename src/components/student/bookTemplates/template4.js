import React, { useState } from 'react';

const Template4 = () => {
    const [textOne, setTextOne] = useState("");
    const [textTwo, setTextTwo] = useState("");
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
                <textarea className="small-text-page" onChange={(event) => setTextOne(event.target.value)} rows = "10" cols="20"></textarea>
            </div>
            <textarea className="large-horizontal-text" onChange={(event) => setTextTwo(event.target.value)} rows = "10" cols="40"></textarea>
        </div>
    );
};

export default Template4;