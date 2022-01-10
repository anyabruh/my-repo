import React from 'react'
import './Button.css'

function Button(props) {
    return (
        <div>
            <button className={props.class}>{props.title}</button>
        </div>
    )
}

export default Button
