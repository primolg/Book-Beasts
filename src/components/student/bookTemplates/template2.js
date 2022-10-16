import React, { useState } from 'react';



const Template2 = () => {

    const [image, setImage] = useState(undefined);

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