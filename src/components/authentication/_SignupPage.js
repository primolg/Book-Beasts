import React, { useState } from "react";
import { SignupForm, SelectAccountType, LogoutButton } from "./";

const SignupPage = () => {
    const token = localStorage.getItem("token");
    const [accountType, setAccountType] = useState(null);

    return(
        <div id="authContainer">
            {
                token?.length ?
                <div className="content loggedIn">
                    <p>You are already logged in! Please logout to signup for a new account.</p>
                    <LogoutButton />
                </div>
                :
                accountType ?
                <SignupForm type={accountType} setAccountType={setAccountType} />
                : <SelectAccountType formType="Signup" setAccountType={setAccountType}/>
            }
        </div>
    )
}

export default SignupPage;
