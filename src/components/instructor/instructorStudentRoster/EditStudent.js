import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { updateStudentData, fetchStudentData } from "../../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';

//This shows hashed password when opening Edit popup - need to fix that.

const EditStudent = ( {student} ) => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate  = useNavigate();

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
        navigate(`/instructorPortal/${params.id}`);
    };

//^^^^ navigating to the instructor's portal to reflect state change, Popup seems to prevent 
//the state change from showing immediately in the student table. Working on fixing this issue.

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
        <Popup trigger={<button className="small-btn draw-border">Edit</button>} position="top left">
            {close => (
                
                  <div className="form-card">
                        <h2 className="card-heading">
                        Edit Student
                    </h2><form className="card-form" id='form' onSubmit={handleSubmit}>
                            <div className="input">
                                <label className="input-label" htmlFor="firstName">First Name:</label>
                                <input name='firstName' value={form.firstName} onChange={handleChange('firstName')} />
                            </div>
                            <div className="input">
                                <label className="input-label" htmlFor="lastName">Last Name:</label>
                                <input name='lastName' value={form.lastName} onChange={handleChange('lastName')} />
                            </div>
                            <div className="input">
                                <label className="input-label" htmlFor="email">Email:</label>
                                <input name="email" value={form.email} onChange={handleChange('email')} />
                            </div>
                            <div className="input">
                                <label className="input-label" htmlFor="username">Username:</label>
                                <input name='username' value={form.username} onChange={handleChange('username')} />
                            </div>
                            <div className="input">
                                <label className="input-label" htmlFor="password">Password:</label>
                                <input name="password" value={form.password} onChange={handleChange('password')} />
                            </div>
                            <div className="action">
                                <button className="action-button" type="submit">Submit Changes</button>
                            </div>
                        </form><button className="close" onClick={close}>
                            CANCEL
                        </button><div className="card-info">
                            <p>By clicking submit you are changing this student's profile.</p>
                        </div>
                        </div>
              
            )}
        </Popup>
        </>
    )
};

export default EditStudent;