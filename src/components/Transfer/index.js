import React, { useState } from 'react';
import "./style.scss";
import { Input, Form } from '../utils';
import { send } from "../../main";

export default function Transfer({
    sender,
    receiver,
    amount,
    setSender,
    setReceiver,
    setAmount
}) {

    function handleSubmit(e) {
        e.preventDefault();
        send(sender, receiver, 10, amount, 0.2);
    }

    function handleChange(e) {
        const value = e.target.value;
        switch(e.target.name) {
            case "sender": {
                setSender(value);
                break;
            }
            case "receiver": {
                setReceiver(value);
                break;
            }
            case "amount": {
                setAmount(value);
                break;
            }
        }
    }

    function inputStyles() {
        return (
            {
                backgroundColor: "white",
                color: "black"
            }
        );
    }

    function formStyles() {
        return (
            {
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                height: "60vh"
            }
        );
    }

    return (
        <Form 
        onSubmit={ handleSubmit }
        style={ formStyles() }>
            <Input 
            type="text"
            name="sender"
            value={ sender }
            onChange={ handleChange }
            style={ inputStyles() }
            placeholder="sender"/>
            <Input 
            type="text"
            name="receiver"
            placeholder="receiver"
            value={ receiver }
            style={ inputStyles() }
            onChange={ handleChange }/>
            <Input 
            type="number"
            name="amount"
            placeholder="amount"
            value={ amount }
            style={ inputStyles() }
            onChange={ handleChange }/>
            <Input 
            class="btn p-1"
            type="submit"
            name="send"
            value="Send"/>
        </Form>
    );
}