import React from 'react';
import "./style.css";

export default function Header({ title }) {
    return (
        <header>
            <h1>{ title }</h1>
            <p>dropdown</p>
        </header>
    )
}
