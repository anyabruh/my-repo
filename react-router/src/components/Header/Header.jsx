import { Logo } from '../Logo/Logo';
import { Navigation } from '../Navigation/Navigation';
import './style.css';

export const Header = () => {
    return (
        <div className='header'>
            <Logo/>
            <Navigation />
        </div>  
    )
};