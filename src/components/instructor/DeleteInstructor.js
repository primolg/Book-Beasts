import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteInstructor } from "../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const DeleteInstructor = ( { instructor }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteInstructor(instructor.id));
        navigate(`/`);
    };

    return (
        <>
         <Popup trigger={<button className="small-btn draw-border">Delete This Account</button>} position="bottom left">
            {close => (
               <div className="form-card">
               <h2 className="card-heading">CAUTION!</h2>
               <small>Deleting this instructor account will also delete all student
                   accounts associated with it. Click DELETE if you still wish to continue.
                   Click CANCEL to go back to editing your account.
               </small>
               <form className="card-form">
                        <div className="input no-border">
                        <input className="is-hidden" type="hidden"/>
                        <label className="is-hidden"></label>
                        </div>
                    <div className="action">
                    <div className="delete-button">
                        
               <button className="plus" onClick={handleDelete}></button> 
               </div>
              <button className="close action-button" onClick={close}>
                CANCEL
              </button>
              </div>
              </form>
              </div>
            )}
        </Popup>
      
        
        </>
    )
};

export default DeleteInstructor;


