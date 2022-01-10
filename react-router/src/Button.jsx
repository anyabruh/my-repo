import React from 'react'
import './Button.css'


function Button({label, onClick}) {



    return (
        <div className='button'>
            <button onClick={onClick}>{label}</button>
        </div>
    )
}

export default Button
