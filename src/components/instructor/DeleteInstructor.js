import React, { useState } from "react";
import { DeleteConfirmation } from './DeleteConfirmation';


const DeleteInstructor = () => {
    const [ deleteToggle, setDeleteToggle ] = useState(false);

    const handleDeleteToggle = () => {
        setDeleteToggle(!deleteToggle);
    };

    return (
        <>
        {deleteToggle && (
            <DeleteConfirmation
                handleDeleteToggle={handleDeleteToggle}
                deleteObj={instructor}
                modelName='user'
                />
        )}
        <button onClick={handleDeleteToggle} className='deletebtn'>Delete</button>
        </>
    )
};

export default DeleteInstructor;