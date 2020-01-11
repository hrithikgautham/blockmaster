import React, { useState } from 'react';
import "./style.css";


export default function Login({ handleLoginSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(e) {
        if(e.target.name === 'email')
            setEmail(e.target.value);
        else
            setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLoginSubmit(email, password);
        setPassword("");
        setEmail("");
    }

    return (
        <form onSubmit={ handleSubmit }>
            <input name="email" onChange={ handleChange } value={ email } type="text" placeholder="Enter email"/>
            <input name="password" onChange={ handleChange } value={ password } type="text" placeholder="Enter password"/>
            <input type="submit"/>
        </form>
    );
}