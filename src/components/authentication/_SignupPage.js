import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignupForm, SelectAccountType, LogoutButton } from "./";

export default function SignupPage() {
    const user = useSelector(state => state.user);
    const [accountType, setAccountType] = useState(null);

    return(
        <div id="authContainer">
            {
                user?.id ?
                <>
                    <p>You are already logged in! Please logout to signup for a new account.</p>
                    <LogoutButton />
                </>
                :
                accountType ?
                <LoginForm type={accountType} setAccountType={setAccountType} />
                : <SelectAccountType setAccountType={setAccountType}/>
            }
        </div>
    )
}
