import React, { useState } from 'react';



const Template2 = () => {

    const [image, setImage] = useState(undefined);
    console.log(image)
    return (
        <div className="page-outer-div">
            <div className="image-center">
                {image ? 
                    image : 
                    <input type="file" name="img"  accept=".jpg,.jpeg,.png" onChange={(event)=>setImage(event.target.value)}></input>
                }
            </div>
        </div>
    );
};

export default Template2;