import { Counter } from "../Counter/Counter"
import { CounterHook } from "../CounterHook/CounterHook";


export const CounterPage = () => {
    return (
        <div className="page">
            <Counter />
            <Counter />
            <CounterHook />
        </div>
    );
};