import React from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage, SignupPage, UserStatus } from "./authentication";

function App() {

    return (
        <>
            <UserStatus />
            <Routes>
                <Route index element={<p>Hello world</p>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </>
    )
}

export default App;
