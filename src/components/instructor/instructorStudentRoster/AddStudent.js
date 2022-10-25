import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../../store/reducers/instructorSlice';
import Popup from 'reactjs-popup';

const AddStudent = ({ activeTab, setActiveTab }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ form, setForm ] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        age: '',
        color: '',
        userId: params.id,
    });

    const handleChange = prop => event => {
        setForm({
            ...form,
            [prop]: event.target.value
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addStudent({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        username: form.username,
        password: form.password,
        userId: form.userId,
        age: form.age,
        color: form.color,
        }, params.id));
        setActiveTab("portal-home")
    };
//^^^^ navigating to the instructor's portal to reflect state change, Popup seems to prevent 
//the state change from showing immediately in the student table. Working on fixing this issue.

    useEffect(() => {
    }, [form]);


    return(
        <>
        <Popup trigger={<button className="btn draw-border">Add Student</button>}  position="top right" keepTooltipInside=".tooltipBoundary">
        {close => (
            <div className="form-card">
                <h2 className="card-heading">
                Add Student
                </h2>
            <form className="card-form" onSubmit={handleSubmit}>

            <div className="input">
               <input className="input-field" name='firstName' value={form.firstName} onChange={handleChange('firstName')}/>
               <label className="input-label" htmlFor="firstName">First Name:</label>
            </div>   

            <div className='input'>
               <input className="input-field" name='lastName' value={form.lastName} onChange={handleChange('lastName')}/>
               <label className="input-label" htmlFor="lastName">Last Name:</label>
               </div>

            <div className="input">  
               <input className="input-field" name="email" value={form.email} onChange={handleChange('email')}/>
               <label className="input-label" htmlFor="email">Email:</label>
            </div>

            <div className="input">   
               <input className="input-field" name='username' value={form.username} onChange={handleChange('username')}/>
               <label className="input-label" htmlFor="username">Username:</label>
            </div>   

            <div className="input">  
               <input className="input-field" name="password" value={form.password} onChange={handleChange('password')}/>
               <label className="input-label" htmlFor="password">Password:</label>
            </div>

            <div className="input">  
               <input className="input-field" name="age" value={form.age} onChange={handleChange('age')}/>
               <label className="input-label" htmlFor="age">Student Age:</label>
            </div>   

            <div className="input"> 
               <select className="input-field" name="color" value={form.color} onChange={handleChange('color')}>
                <option>Select One:</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Green</option>
                <option>Purple</option>
                <option>Aqua</option>
                <option>Yellow</option>
                <option>Pink</option>
                </select>
               <label className="input-label" htmlFor="color">Color:</label>
            </div>
               
            <div className="input no-border">
               <input type='hidden' name='userId' value={params.id} onChange={handleChange('userId')}/>
               <label className="is-hidden"></label>
            </div>
            <div className="action">
                <button className="btn draw-border" type="submit">Submit</button>
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
}

export default AddStudent;