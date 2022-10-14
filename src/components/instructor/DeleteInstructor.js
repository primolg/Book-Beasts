import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteInstructor } from "../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const DeleteInstructor = ( { instructor }) => {
    //const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteInstructor(instructor));
        navigate(`/`);
    };

console.log('DELETE INSTRUCTOR', instructor);

    return (
        <>
         <Popup trigger={<button>Delete This Account</button>} position="bottom left">
            {close => (
               <div>
               <h2>CAUTION!</h2>
               <p>Deleting this instructor account will also delete all student
                   accounts associated with it. Click DELETE if you still wish to continue.
                   Click CANCEL to go back to editing your account.
               </p>
               <button onClick={handleDelete}>YES</button>
              <a className="close" onClick={close}>
                &times;
              </a>
              </div>
            )}
        </Popup>
      
        
        </>
    )
};

export default DeleteInstructor;


