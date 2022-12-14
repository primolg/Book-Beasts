import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";
import { toast, ToastContainer, Slide } from "react-toastify";


// "type" can be user/student
const LoginForm = ({ type, setAccountType }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialForm = { key: "", password: "" };
    const [form, setForm] = useState(initialForm);


    useEffect(() => {
        setForm({...form, type});
    }, [type]);
    
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
        dispatch(login(form)).then(res => {
            if (res===undefined) {
                toast.error("No user with that email/username");
            } else if (res===null) {
                toast.error("Invalid login");
            } else if (type === "student" && res?.id) {
                navigate(`/student`);
            } else if (res?.id) {
                navigate(`/instructorPortal/${res?.id}`);
            }
        });
    }
    
    return(
        <>
            <ToastContainer
                position="top-center"
                hideProgressBar={true}
                transition={Slide}
                autoClose={3000}
            />
            <div className="formContainer">
                <h2>{(type === "user" ? "Instructor" : "Student") + " Login"}</h2>
                <p onClick={() => setAccountType(type==="user"?"student":"user")} className="return">
                    {`Wait - I'm ${type === "user" ? "a student!" : "an instructor!"}`}
                </p>
                <hr />
                <form>
                    <p>Enter username or email:</p>
                    <input type="text" onChange={handleFormChange} placeholder="Username or email" />
                    
                    <p>Password:</p>
                    <input type="password" onChange={handleFormChange} />

                    <button type="submit" onClick={handleFormSubmit}>Login</button>
                </form>
                
                <Link to="/signup">
                        <p className="switch-login-signup">Don't have an account? Signup here</p>
                </Link>
            </div>
        </>
    )
}

export default LoginForm;
