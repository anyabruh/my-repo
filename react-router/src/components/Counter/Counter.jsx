import './style.css';
import React from 'react';


export class Counter extends React.Component {
    state = {
        nrOfClicks: 0,
    };

    increaseNrOfClicks = () => {
        this.setState({
            nrOfClicks: this.state.nrOfClicks + 1,
        })
    }

    render() {
        return <div className='counter'>
            <button onClick={this.increaseNrOfClicks}>Press Me</button>
            <p>Number of clicks {this.state.nrOfClicks}</p>
        </div>
    };
};

