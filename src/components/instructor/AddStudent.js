import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addStudent } from '../../store/reducers/instructorSlice';
import Popup from 'reactjs-popup';

const AddStudent = () => {
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
    };

    useEffect(() => {
    }, [form]);

    console.log('ADD STUDENT COMP', form.email);

    return(
        <><Popup trigger={<button>Add Student</button>} position="bottom left">
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
               <label htmlFor="age">Student Age:</label>
               <input name="age" value={form.age} onChange={handleChange('age')}/>
               <label htmlFor="color">Color:</label>
               <select name="color" value={form.color} onChange={handleChange('color')}>
                <option>Select One:</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Green</option>
                <option>Purple</option>
                <option>Aqua</option>
                <option>Yellow</option>
                <option>Pink</option>
                </select>
               <input type='hidden' name='userId' value={params.id} onChange={handleChange('userId')}/>
               <button type="submit">Submit Changes</button>
               <Link to={`/instructorPortal/${params.id}/students`}>Cancel</Link>
              </form> 
          <a className="close" onClick={close} navigate={`instructorPortal/${params.id}/students`}>
            &times;
          </a>
          </div>
        )}
    </Popup>
        </>
    )
}

export default AddStudent;