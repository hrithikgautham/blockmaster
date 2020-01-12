import React, { useState } from 'react';
import './style.scss';


export default function Input(props) {
    const {
        type,
        value,
        name,
        placeholder,
        onChange,
        onClick,
        style,
        className,
        id,
    } = props;

    return (
        <input 
        type={ type }
        value={ value }
        name={ name }
        placeholder={ placeholder }
        onClick={ onClick ? onClick : null }
        onChange={ onChange ? onChange : null }
        style={ style ? style : {} }
        className={ className ? className : null }
        id={ id ? id : null } />
    );
}