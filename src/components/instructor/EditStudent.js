import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { updateStudentData, fetchStudentData } from "../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

const EditStudent = ( {student} ) => {
    const dispatch = useDispatch();
    const params = useParams();

   
   console.log('EDIT PARAMS', params.id);
   console.log('EDIT STUDENT', student.id)

    useEffect(() => {
        dispatch(fetchStudentData(params.id, student.id))
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
        dispatch(updateStudentData({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            username: form.username,
            password: form.password,
        }, params.id, student.id, student));
    }

    useEffect(() => {
        dispatch(fetchStudentData(params.id, student.id))
    }, []);

    useEffect(() => {
        setForm({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            username: student.username,
            password: student.password,
        })
    }, [student])

    return (
        <>
        <Popup trigger={<button>Edit</button>} position="top left">
            {close => (
                <div>
               <form id='form' onSubmit={handleSubmit}>
               <h3>Edit Student</h3>
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
              <a className="close" onClick={close}>
                &times;
              </a>
              </div>
            )}
        </Popup>
      
        </>
    )
};

export default EditStudent;