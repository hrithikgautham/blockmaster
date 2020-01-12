import React from 'react';
import "./style.css";
import Header from "./Header";
import Login from "./Login";
import SignUp from "./SignUp";

export default function App() {
    // variables declarations

    return (
        <div className="container">
            <Header title={ "Block Master" }/>
            <SignUp />
        </div>
    )
} 