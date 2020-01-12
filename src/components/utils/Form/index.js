import React from 'react';
import "./style.scss";

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