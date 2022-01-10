import React from 'react'
import Content from './Content';
import './DogApp.css'

function DogApp() {
    return (
    <div className='dog-app'>
        <h1>Random Dog photos</h1>
        <div className="container">
            <Content />
        </div> 
    </div>
    )
}

export default DogApp
