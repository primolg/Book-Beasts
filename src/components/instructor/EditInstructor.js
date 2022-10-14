import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { updateInstructorData, fetchInstructorData } from "../../store/reducers/instructorSlice";
import DeleteInstructor from "./DeleteInstructor";

const EditInstructor = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate  = useNavigate();
    const instructor = useSelector((state) => state.instructorList.instructorData);


    useEffect(() => {
        dispatch(fetchInstructorData(params.id))
    }, []);

    const [ form, setForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
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
            username: form.username,
            password: form.password,
        }, params.id, instructor));
        navigate(`/instructorPortal/${params.id}`);
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
            username: instructor.username,
            password: instructor.password,
        })
    }, [instructor])

    return (
        <>
                <div>
                <DeleteInstructor key={instructor.id} instructor={instructor}/>
               <form id='form' onSubmit={handleSubmit}>
               <h3>Edit instructor</h3>
               <label htmlFor="firstName">First Name:</label>
               <input name='firstName' value={form.firstName} onChange={handleChange('firstName')}/>
               <label htmlFor="lastName">Last Name:</label>
               <input name='lastName' value={form.lastName} onChange={handleChange('lastName')}/>
               <label htmlFor="email">Email:</label>
               <input name="email" value={form.email} onChange={handleChange('email')}/>
               <label htmlFor="username">Username:</label>
               <input name='username' value={form.username} onChange={handleChange('username')}/>
               <label htmlFor="password">Password:</label>
               <input name="password" value={form.password} onChange={handleChange('password')}/>
               <button type="submit">Submit Changes</button>
              </form> 
              </div>
            
       
      
        </>
    )
};

export default EditInstructor;