import React, { useState } from "react";
import { Form, Input } from "../utils";
import "./style.scss";

export default function SignUp({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setRepeatPassword
}) {

    function handleSubmit(e) {
        e.preventDefault();
        console.log(firstName, lastName, email, password, repeatPassword);
        setLastName("");
        setPassword("");
        setFirstName("");
        setEmail("");
        setRepeatPassword("");
    }

    function getFormStyles() {
        return (
            {
                width: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }
        );
    }

    function handleOnChange(e) {
        const value = e.target.value;
        switch(e.target.name){
            case "email": {
                setEmail(value);
                break;
            }
            case "password": {
                setPassword(value);
                break;
            }
            case "repeat-password": {
                setRepeatPassword(value);
                break;
            }
            case "first-name": {
                setFirstName(value);
                break;
            }
            case "last-name": {
                setLastName(value);
                break;
            }
        }
    }

    return (
        <Form
        onSubmit={ handleSubmit }
        style={ getFormStyles() }>
            <Input 
            type="text" 
            style={ {backgroundColor: "cadetblue"} } 
            name="first-name" 
            value={ firstName } 
            placeholder="first name"
            onChange={ handleOnChange }/>
            <Input 
            type="text" 
            placeholder="last name"
            style={ {backgroundColor: "cadetblue"} } 
            name="last-name" 
            value={ lastName } 
            onChange={ handleOnChange }/>
            <Input 
            type="text" 
            placeholder="email"
            style={ {backgroundColor: "cadetblue"} }
            name="email" 
            value={ email } 
            onChange={ handleOnChange }/>
            <Input 
            type="text" 
            placeholder="password"
            style={ {backgroundColor: "cadetblue"} }
            name="password" 
            value={ password } 
            onChange={ handleOnChange }/>
            <Input 
            type="text" 
            style={ {backgroundColor: "cadetblue"} }
            name="repeat-password"
            placeholder="repeat password" 
            value={ repeatPassword } 
            onChange={ handleOnChange }/>
            <Input type="submit" style={ {backgroundColor: "chartreuse"} }/>
        </Form>
    );
}
