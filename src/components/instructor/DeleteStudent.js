import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteStudent } from "../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const DeleteStudent = ( { student }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (event) => {
        event.preventDefault();
        dispatch(deleteStudent(student));
        navigate(`/instructorPortal/${params.id}/students`);
    };

    return (
        <>
        <Popup trigger={<button>Delete</button>} position="right center">
            <div>
                    <p>Are you sure you want to delete this student?
                    </p>
                    <button onClick={handleDelete}>YES</button>
                </div>
        </Popup>
        </>
    )
};

export default DeleteStudent;