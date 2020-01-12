import React from 'react';
import "./style.css";

export default function(props) {
    const {
        children,
        onSubmit,
        style
    } = props;
    return (
        <form 
        style={ style ? style : {} } 
        onSubmit={ onSubmit ? onSubmit : null }>
            { children }
        </form>
    );
}