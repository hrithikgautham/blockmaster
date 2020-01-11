import React, { useState } from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";

function App() {
    const [title, setTitle] = useState("My WEbpage");
    return (
        <div>
            <Header title={title}/>
            Hello World!
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));