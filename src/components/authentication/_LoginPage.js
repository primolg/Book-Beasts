import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginForm, SelectAccountType, LogoutButton } from "./";

export default function LoginPage() {
    const user = useSelector(state => state.user);
    const [accountType, setAccountType] = useState(null);

    return(
        <div id="authContainer">
            {
                user?.id ?
                <>
                    <div className="content loggedIn">
                        <p>You are already logged in! Please logout to login to a different account.</p>
                        <LogoutButton />
                    </div>
                </>
                :
                accountType ?
                <LoginForm type={accountType} setAccountType={setAccountType} />
                : <SelectAccountType setAccountType={setAccountType}/>
            }
        </div>
    )
}
