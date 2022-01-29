import React from 'react'
import './Card.css'
import Button from './CardButtons/Button'
import CardImage from './CardImage/CardImage'
import RateProduct from './Raiting/RateProduct'

function Card({path}) {
    return (
        <div className='card-container'>
            <div className="card-image">
                <div className='image-container'>
                    <img className='images'src={path} alt="" />
                </div>
            </div>
            <div className="card-text">
                <div className="text-title">
                    <h1>Wild west Woodie</h1>
                </div>
                <div className="react-side">
                    <RateProduct class='star-react' rate='5.0'/>
                    <RateProduct class='heart-react' rate='29'/>
                </div>
                <div className="random-text">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, at.</p>
                </div>
            </div>
            <div className="card-buttons">
                <div className='cart-btn'>
                <Button title='CART' class='cart'/>
                </div>
                <div className="view-btn">
                <Button title='VIEW' class='view'/>
                </div>
            </div>
        </div>
    )
}

export default Card
