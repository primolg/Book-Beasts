import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudent } from "../../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const DeleteStudent = ( { student, activeTab, setActiveTab }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteStudent(student.id));
        setActiveTab("portal-home");
    };
//^^^^ navigating to the instructor's portal to reflect state change, Popup seems to prevent 
//the state change from showing immediately in the student table. Working on fixing this issue.


    return (
        <>
            <Popup trigger={<button className="small-btn draw-border">Delete</button>} position="bottom right" keepTooltipInside=".tooltipBoundary">
            {close => (
               <div className="form-card">
                
               <h2 className="card-heading">CAUTION!
               <small>Are you sure you want to delete this student?
                         Click CANCEL to keep this student.
                    </small>
               </h2>
               
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

export default DeleteStudent;
