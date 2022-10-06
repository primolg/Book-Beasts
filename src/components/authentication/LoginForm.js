import React from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function LoginForm() {
    const dispatch = useDispatch();

    const initialForm = { key: "", password: "" };
    const [form, setForm] = React.useState(initialForm);
    
    const handleFormChange = (e) => {
        switch (e.target.type) {
            case "text":
                setForm({ ...form, key: e.target.value });
                break;
            case "password":
                setForm({ ...form, password: e.target.value });
                break;
        }
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const loginAttempt = dispatch(/* fn */);
        console.dir(form);
    }
    
    return(
        <div className="formContainer login">
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
