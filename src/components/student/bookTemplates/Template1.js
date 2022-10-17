import React, { useState } from 'react';



const Template1 = () => {

    const [text, setText] = useState('');

    return (
        <div className="page-outer-div">
            <div className="t1-textarea">
                <textarea onChange={(event)=>setText(event.target.value)} rows = "25" cols="41"></textarea>
            </div>
        </div>
    );
};

export default Template1;