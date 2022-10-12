import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";

// "type" can be user/student
export default function LoginForm({ type, setAccountType }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialForm = { key: "", password: "" };
    const [form, setForm] = React.useState(initialForm);

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
            if (type === "student" && res?.id) {
                navigate(`/studentPortal/${res.id}`);
            } else if (res?.id) {
                navigate(`/instructorPortal/${res.id}`);
            }
        })
    }
    
    return(
        <div className="formContainer">
            <h2>{(type === "user" ? "Instructor" : "Student") + " Login"}</h2>
            <p onClick={() => setAccountType(type==="user"?"student":"user")} className="return">
                {`Wait - I'm ${type === "user" ? "a student!" : "an instructor!"}`}
            </p>
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
