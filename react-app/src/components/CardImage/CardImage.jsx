import React from 'react'
import './CardImage.css'

function CardImage({path}) {
    return (
        <div className='image-container'>
            <img className='images'src={path} alt="" />
        </div>
    )
}

export default CardImage
