import React, { useState } from 'react';

function InputArea(props) {
  const [inputText, setInputText] = useState('');

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      props.onAdd(inputText);
      setInputText('');
    }
  }

  return (
    <div className="form">
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        value={inputText}
        placeholder="Enter a task..."
      />
    </div>
  );
}

export default InputArea;
