import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { updateStudentData, fetchStudentData } from "../../../store/reducers/instructorSlice";
import Popup from 'reactjs-popup';


const EditStudent = ( { student, activeTab, setActiveTab } ) => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate  = useNavigate();

    console.log("EDIT PARAMS", params.id);

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
        setActiveTab("portal-home")
    };

//^^^^ navigating to the instructor's portal to reflect state change, Popup seems to prevent 
//the state change from showing immediately in the student table. Working on fixing this issue.
    console.log("EDIT STUDENT", params.id, student.id, student)
    useEffect(() => {
        dispatch(fetchStudentData(params.id, student.id))
    }, []);

    useEffect(() => {
        setForm({
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            username: student.username,
            password: '#######',
        })
    }, [student])

    return (
        <>
        <Popup trigger={<button className="small-btn-outline ">Edit</button>} position="bottom right" keepTooltipInside=".tooltipBoundary">
            {close => (
                
                  <div className="form-card">
                        <h2 className="card-heading">
                        Edit Student
                    </h2>
                    <form className="card-form" onSubmit={handleSubmit}>

                            <div className="input">
                                <input className="input-field" name='firstName' value={form.firstName} onChange={handleChange('firstName')} />
                                <label className="input-label" htmlFor="firstName">First Name:</label>
                            </div>

                            <div className="input">
                                <input className="input-field" name='lastName' value={form.lastName} onChange={handleChange('lastName')} />
                                <label className="input-label" htmlFor="lastName">Last Name:</label>  
                            </div>

                            <div className="input">
                                <input className="input-field" name="email" value={form.email} onChange={handleChange('email')} />
                                <label className="input-label" htmlFor="email">Email:</label>
                            </div>

                            <div className="input">
                                <input className="input-field" name='username' value={form.username} onChange={handleChange('username')} />
                                <label className="input-label" htmlFor="username">Username:</label>
                            </div>

                            <div className="input">
                                <input className="input-field" name="password" value={form.password} onChange={handleChange('password')} />
                                <label className="input-label" htmlFor="password">Password:</label>
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
              
            )}
        </Popup>
        </>
    )
};

export default EditStudent;