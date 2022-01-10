import { ToDo } from "../ToDo/ToDo"
import { ToDoHook } from "../ToDoHook/ToDoHook";

export const ToDoPage = () => {
    return (
        <div className="page">
            <ToDo />
            <ToDoHook />
        </div>
    );
};