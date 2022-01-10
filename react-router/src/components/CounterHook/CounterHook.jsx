import './CounterHook.css';
import React, {useState} from 'react';


export const CounterHook = (props) => {

    const [nrOfClicks, setNrOfClicks] = useState(0)

    return (
        <div className='counter'>
            <button onClick={() => setNrOfClicks(nrOfClicks + 1)}>Press Me with Hooks</button>
            <p>Number of clicks {nrOfClicks}</p>
        </div>
    );
}; 







//     state = {
//         nrOfClicks: 0,
//     };

//     increaseNrOfClicks = () => {
//         this.setState({
//             nrOfClicks: this.state.nrOfClicks + 1,
//         })
//     }

//     render() {
//         return <div className='counter'>
//             <button onClick={this.increaseNrOfClicks}>Press Me</button>
//             <p>Number of clicks {this.state.nrOfClicks}</p>
//         </div>
//     };
// };
