import React from 'react';
import "./style.css";

export default class Header extends React.Component {
    render() {
        return (
            <header>
                {this.props.title}
            </header>
        )
    }
}