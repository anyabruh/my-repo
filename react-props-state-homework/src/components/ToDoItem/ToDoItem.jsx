import "./ToDoitem.css";
import { useState } from 'react';


export const ToDoItem = (props) => {

  const [check, setCheck] = useState(false)

  return (
    <div className="to-do__item">
      <p className="to-do__item__label" style={{textDecoration: check ? "line-through" : "" }}>{props.label}</p>
      <button className="to-do__item__remove-btn" onClick={props.onClick}>
        -
      </button>
      <input className="check-box-input"
          type='checkbox' 
          checked={check}
          onChange={() => setCheck(!check)}
      ></input>
    </div>
  );
};