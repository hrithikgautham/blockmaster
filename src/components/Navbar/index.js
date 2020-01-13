import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Navbar({ title }) {
    return (
        <nav>
            <h1>{ title }</h1>
            <ul>
                <li><Link to="/signup">Signup</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/transfer">Transfer</Link></li>
            </ul>
        </nav>
    );
}