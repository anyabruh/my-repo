import React, { useState , useEffect } from 'react'
import './Content.css'
import Button from './Button'
import axios from 'axios'


function Content() {

    const [entry, setEntry] = useState([]);

    const getDog = () =>{
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then(res => {
            setEntry(res.data);
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(getDog,[])


    return (
        <div className='content-container'>
            <div className="left-button">
                <Button label='<' onClick={getDog}/>
            </div>
            <div className="image-container">
                <img src={entry.message} /> 
            </div>
            <div className="right-button">
                <Button label='>' onClick={getDog}/>
            </div>
        </div>
    )
}

export default Content
