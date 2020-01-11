import React, { useState } from 'react';
import "./style.css";
import Header from "./Header";
import Login from "./Login";

export default function App() {
    // variables declarations
    const [title, setTitle] = useState("Block Master");
    const [email, setEmail] = useState(""); //
    const [password, setPassword] = useState(""); //

    function handleLoginSubmit(email, password) {
        // database query
        setEmail(email);
        setPassword(password);
        console.log(email, password);
    }

    return (
        <div className="container">
            <Header title={ title }/>
            <Login handleLoginSubmit={ handleLoginSubmit }/>
        </div>
    )
} 