import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudent } from "../../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const DeleteStudent = ( { student }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteStudent(student.id));
        navigate(`/instructorPortal/${params.id}`);
    };
//^^^^ navigating to the instructor's portal to reflect state change, Popup seems to prevent 
//the state change from showing immediately in the student table. Working on fixing this issue.


    return (
        <>
            <Popup trigger={<button className="small-btn draw-border">Delete</button>} position="bottom left">
            {close => (
               <div>
               <h2>CAUTION!</h2>
               <p>Are you sure you want to delete this student?
                        Click CANCEL to keep this student.
                    </p>
               <button onClick={handleDelete}>YES</button> 
              <button className="close" onClick={close}>
                CANCEL
              </button>
              </div>
            )}
        </Popup>
        </>
    )
};

export default DeleteStudent;
