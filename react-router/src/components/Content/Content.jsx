import './style.css';
import { Counter } from '../Counter/Counter';
import { ToDo } from '../ToDo/ToDo';
import { DigitalClock } from '../DigitalClock/DigitalClock';

export const Content = () => {
    return (
        <div className='content'>
            <Counter />
            <Counter />
            <ToDo />
            <DigitalClock />
        </div>
    );
}