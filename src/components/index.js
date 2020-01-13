import React, { useState } from 'react';
import "./style.scss";
import Navbar from "./Navbar";
import Login from "./Login";
import SignUp from "./SignUp";
import Transfer from "./Transfer";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

export default function App() {
    const [title, setTitle] = useState("Block Master");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <Router>
            <Navbar title={ title }/>
            <div className="container">
                <Switch>
                    <Route path="/signup">
                        <SignUp 
                        firstName={ firstName }
                        lastName={ lastName }
                        password={ password }
                        email={ email }
                        repeatPassword={ repeatPassword }
                        setFirstName={ setFirstName }
                        setLastName={ setLastName }
                        setEmail={ setEmail }
                        setPassword={ setPassword }
                        setRepeatPassword={ setRepeatPassword }
                        />
                    </Route>
                    <Route path="/login" component={ Login }/>
                    <Route path="/transfer">
                        <Transfer 
                        sender={ sender } 
                        receiver={ receiver }
                        amount={ amount }
                        setSender={ setSender }
                        setReceiver={ setReceiver }
                        setAmount={ setAmount }/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}