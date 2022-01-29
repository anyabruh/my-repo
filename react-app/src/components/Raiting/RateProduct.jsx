import React from 'react'
import './RateProduct.css'
import  {AiOutlineHeart}  from "react-icons/ai";
import  {AiFillStar}  from "react-icons/ai";

function RateProduct(props) {

    const test = {
        heart : <AiOutlineHeart />,
        star : <AiFillStar />,
        number : '1'
    }

    return (
        <div
        className={props.class}>{props.class === 'heart-react' ? <AiOutlineHeart /> : <AiFillStar />}{props.rate}
        </div>
    )
}

export default RateProduct
