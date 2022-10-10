import React, { useState } from "react";
import { LoginForm, SelectAccountType, LogoutButton } from "./";

export default function LoginPage() {
    const token = localStorage.getItem("token");
    const [accountType, setAccountType] = useState(null);

    return(
        <div id="authContainer">
            {
                token?.length ?
                <div className="content loggedIn">
                    {/* Should just redirect to account page if they get to 'login' while already logged in */}
                    <p>You are already logged in! Please logout to login to a different account.</p>
                    <LogoutButton />
                </div>
                :
                accountType ?
                <LoginForm type={accountType} setAccountType={setAccountType} />
                : <SelectAccountType formType="Login" setAccountType={setAccountType}/>
            }
        </div>
    )
}
