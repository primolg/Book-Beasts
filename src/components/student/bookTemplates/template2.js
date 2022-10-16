import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const Template2 = () => {

    const [image, setImage] = useState(undefined);

    const handleMessageChange = event => {
        setText(event.target.value);
    };

    return (
        <div className="page-outer-div">
            <div className="image-center">
                {image ? 
                    image : 
                    <input type="file" name="img" accept="image/*"></input>
                }
            </div>
        </div>
    );
};

export default Template2;