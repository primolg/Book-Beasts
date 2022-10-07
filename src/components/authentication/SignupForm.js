import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";
// import { Link } from 'react-router-dom';

export default function SignupForm() {
    const dispatch = useDispatch();
    
    return(
        <div className="formContainer">
            <h2>{(type === "user" ? "Instructor" : "Student") + " Login"}</h2>
            <form>
                <p>Enter username or email:</p>
                <input type="text" onChange={handleFormChange} placeholder="Username or email" />
                
                <p>Password:</p>
                <input type="password" onChange={handleFormChange} />

                <button type="submit" onClick={handleFormSubmit}>Login</button>
            </form>
        </div>
    )
}
