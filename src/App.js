import React from "react";
import { UserStatus } from "./components/authentication";
import { Header } from "./components/header";
import Footer from "./components/footer/Footer";
import Routes from "./Routes";
import InstructorRoutes from "./InstructorRoutes";

function App() {
   
    return (
    <>
        {/* <UserStatus /> */}
        <Header/>
        <Routes />
        <Footer /> 
        <InstructorRoutes/>
    </>
    )
}

export default App;
