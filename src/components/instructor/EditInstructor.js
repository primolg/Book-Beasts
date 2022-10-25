import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { updateInstructorData, fetchInstructorData } from "../../store/reducers/instructorSlice";
import DeleteInstructor from "./DeleteInstructor";

const EditInstructor = ({ activeTab, setActiveTab }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const instructor = useSelector((state) => state.instructorList.instructorData);

    useEffect(() => {
        dispatch(fetchInstructorData(params.id))
    }, []);

    const [ form, setForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateInstructorData({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
        }, params.id, instructor));
        setActiveTab("portal-home")
    };

//^^^^ navigating to the instructor's portal to reflect state change, Popup seems to prevent 
//the state change from showing immediately in the instructor table. Working on fixing this issue.

    useEffect(() => {
        dispatch(fetchInstructorData(params.id))
    }, []);

    useEffect(() => {
        setForm({
            firstName: instructor.firstName,
            lastName: instructor.lastName,
            email: instructor.email,
            password: '######',
        })
    }, [instructor])

    const handleClose = event => {
        navigate(`/instructorPortal/${params.id}`);
    }

    return (
        <>
                <div id="edit-tab">
                <DeleteInstructor key={instructor.id} instructor={instructor}/>
                <div className="edit-form-card">
                <h2 className="card-heading">
                        Edit Profile
                    </h2>
               <form className="card-form" onSubmit={handleSubmit}>

               <div className="edit-input">
               <input className="edit-input-field" name='firstName' value={form.firstName} onChange={handleChange('firstName')}/>
               <label className="edit-input-label" htmlFor="firstName">First Name:</label>
               </div>

               <div className="edit-input">
               <input className="edit-input-field" name='lastName' value={form.lastName} onChange={handleChange('lastName')}/>
               <label className="edit-input-label" htmlFor="lastName">Last Name:</label>
               </div>

               <div className="edit-input">
               <input className="edit-input-field" name="email" value={form.email} onChange={handleChange('email')}/>
               <label className="edit-input-label" htmlFor="email">Email:</label>
               </div>


               <div className="edit-input">
               <input className="edit-input-field" name="password" value={form.password} onChange={handleChange('password')}/>
               <label className="edit-input-label" htmlFor="password">Password:</label>
               </div>

               <div className="action">
                    <button className="btn draw-border" type="submit">Submit</button>
                    <button className="close action-button" onClick={close}>
                            CANCEL
                    </button>
               </div>
                        </form>
                        
                        <div className="card-info">
                            <p>By clicking submit you are changing this student's profile.</p>
                        </div>
              </div>
              </div>
            
       
      
        </>
    )
};

export default EditInstructor;