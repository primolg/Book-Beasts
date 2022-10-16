import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';



const Template1 = () => {

    const [text, setText] = useState('');

    const handleMessageChange = event => {
        setText(event.target.value);
    };

    return (
        <div className="page-outer-div">
            <div className="t1-textarea">
                <textarea onChange={handleMessageChange} rows = "25" cols="41"></textarea>
            </div>
        </div>
    );
};

export default Template1;