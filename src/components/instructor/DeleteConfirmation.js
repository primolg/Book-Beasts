// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { deleteStudent, deleteInstructor } from "../../store/reducers/instructorSlice";
// import Popup from 'reactjs-popup';


// const DeleteConfirmation = ( { deleteToggle, deleteObj, modelName }) => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleDelete = (event) => {
//         event.preventDefault();
//         dispatch(deleteStudent(deleteObj, navigate));   
//     };

//     console.log('DELETE CONFIRM', deleteObj);

//     return (
//         <>
//         <div>

//         </div>
//         <Popup trigger={<button onClick={handleDelete}>YES</button>} position="right center">
//             <div>
//                     <p>Are you sure you want to delete this student?
//                     </p>
//                     <button onClick={deleteToggle}>Cancel</button>
//                 </div>
//         </Popup>
//         </>
//     )
// }

// export default DeleteConfirmation;