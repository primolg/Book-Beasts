import React from "react";
import { UserStatus } from "./components/authentication";
import { Header } from "./components/header";
import Footer from "./components/footer/Footer";
import Routes from "./Routes";
import InstructorRoutes from "./InstructorRoutes";
import 'react-toastify/dist/ReactToastify.css'

function App() {
   
    return (
    <>
        <Header/>
        <Routes />
    </>
    )
}

export default App;
