import React, { useState } from 'react';
import { Input, Form } from "../utils";
import "./style.css";


export default function Login({ handleLoginSubmit }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleOnChange(e) {
        if(e.target.name === 'email')
            setEmail(e.target.value);
        else
            setPassword(e.target.value);
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        console.log(email, password);
        setPassword("");
        setEmail("");
    }

    function getFormStyles() {
        return (
            {
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
            }
        );
    }

    return (
        <Form 
        onSubmit={ handleOnSubmit }
        style={ getFormStyles() }>
            <Input name="email" style={ {backgroundColor: "cadetblue"} } onChange={ handleOnChange } value={ email } placeholder="Enter email" />
            <Input name="password" style={ {backgroundColor: "cadetblue"} } onChange={ handleOnChange } value={ password } type="text" placeholder="Enter password"/>
            <Input type="submit" style={ {backgroundColor: "chartreuse"} }/>
        </Form>
    );
}