import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../store/reducers/authSlice";

// "type" can be user/student
export default function SignupForm({ type, setAccountType }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialForm = { type };
    const [form, setForm] = React.useState(initialForm);
    
    const handleFormChange = (e) => {
        switch (e.target.placeholder) {
            case "Email":
                setForm({ ...form, email: e.target.value });
                break;
            case "Username":
                setForm({ ...form, username: e.target.value });
                break;
            case "First name":
                setForm({ ...form, firstName: e.target.value });
                break;
            case "Last name":
                setForm({ ...form, lastName: e.target.value });
                break;
            case "Password":
                setForm({ ...form, password: e.target.value });
                break;
        }
    }
    
    const handleFormSubmit = (e) => {
        // need to fix for students
        e.preventDefault();
        dispatch(signup(form)).then(res => {
            if (res) navigate(`/instructorPortal/${res.id}`);
        });
    }
    
    return(
        <div className="formContainer">
            <h2>{(type === "user" ? "Instructor" : "Student") + " Signup"}</h2>
            {type === "user" ?
            <>
                <p onClick={() => setAccountType(null)} className="return">
                    {"Wait - I'm not an instructor!"}
                </p>
                <form>
                    {/* Still need local form validation */}
                    <p>Email:</p>
                    <input type="text" onChange={handleFormChange} placeholder="Email" />

                    <p>Username:</p>
                    <input type="text" onChange={handleFormChange} placeholder="Username" />

                    <p>First name:</p>
                    <input type="text" onChange={handleFormChange} placeholder="First name" />

                    <p>Last name:</p>
                    <input type="text" onChange={handleFormChange} placeholder="Last name" />
                    
                    <p>Password:</p>
                    <input type="password" onChange={handleFormChange} placeholder="Password"/>

                    <button type="submit" onClick={handleFormSubmit}>Login</button>
                </form>
            </>
            : <>
                {/* somebody rewrite this message please :) */} 
                <p>Students cannot sign up alone. Ask an adult to make an account and register you!</p>
                <p onClick={() => setAccountType(null)} className="return">
                    Return to signup
                </p>
            </>
            }
        </div>
    )
}
