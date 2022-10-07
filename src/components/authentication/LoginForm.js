import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/authSlice";

export default function LoginForm({ type, setAccountType }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
        dispatch(login(form));
        // navigate("/");
    }
    
    return(
        <div className="formContainer">
            <h2>{(type === "user" ? "Instructor" : "Student") + " Login"}</h2>
            <form>
                <p>Enter username or email:</p>
                <input type="text" onChange={handleFormChange} placeholder="Username or email" />
                
                <p>Password:</p>
                <input type="password" onChange={handleFormChange} />

                <div className="btnContainer">
                    <button onClick={() => setAccountType(null)}>Go back</button>
                    <button type="submit" onClick={handleFormSubmit}>Login</button>
                </div>
            </form>
        </div>
    )
}
