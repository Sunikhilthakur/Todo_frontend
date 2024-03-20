import React, { useState } from 'react';

function TodoItem(props) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked(!isChecked);
  }

  function handleDelete() {
    props.onChecked(props.id);
  }

  function increasePriority() {
    props.onPriorityChange(props.id, 'increase', isChecked);
  }
  
  function decreasePriority() {
    props.onPriorityChange(props.id, 'decrease', isChecked);
  }

  return (
    <div className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className="todo-text"
          style={{
            textDecoration: isChecked ? 'line-through' : 'none'
          }}
        >
          {props.text}
        </span>
      </label>
      <span
        className="delete-icon"
        onClick={handleDelete}
        role="button"
        tabIndex="0"
        aria-label="Delete"
      >
        <span role="img" aria-hidden="true">
          🗑️
        </span>
      </span>
      <span
        className="priority-icon"
        onClick={increasePriority}
        role="button"
        tabIndex="0"
        aria-label="Increase Priority"
      >
        <span role="img" aria-hidden="true">
          ⬆️
        </span>
      </span>
      <span
        className="priority-icon"
        onClick={decreasePriority}
        role="button"
        tabIndex="0"
        aria-label="Decrease Priority"
      >
        <span role="img" aria-hidden="true">
          ⬇️
        </span>
      </span>
    </div>
  );
}

export default TodoItem;
