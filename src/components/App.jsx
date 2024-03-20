import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import InputArea from './InputArea';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://todo-backend-5kul.onrender.com/api/todo')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  function addItem(inputText) {
    axios.post('https://todo-backend-5kul.onrender.com/api/todo', { title: inputText })
      .then(response => setItems(prevItems => [...prevItems, response.data]))
      .catch(error => console.error('Error creating todo:', error));
  }

  function deleteItem(id) {
    axios.delete(`https://todo-backend-5kul.onrender.com/api/todo/${id}`)
      .then(() => setItems(prevItems => prevItems.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  }

  function handlePriorityChange(itemID, direction, isChecked) {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      const movedItem = newItems.splice(itemID, 1)[0];
  
      let newPriority;
      if (direction === "increase") {
        newPriority = (itemID - 1 + newItems.length) % newItems.length;
        if (itemID === 0 && newPriority === newItems.length - 1) {
          newPriority = newItems.length;
        }
      } else if (direction === "decrease") {
        newPriority = itemID === newItems.length ? 0 : itemID + 1;
      }
  
      newItems.splice(newPriority, 0, movedItem);
  
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        isChecked: isChecked || (index === newPriority && item.id !== itemID),
        id: index,
      }));
  
      return updatedItems;
    });
  }
  
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const filteredItems = items.filter((item) => {
    if (!item || !item.title || typeof item.title !== 'string') {
      console.error('Invalid item:', item);
      return false;
    }
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  


  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <InputArea onAdd={addItem} />
      <div>
        <input className="search-input" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search"/>
      </div>
      <div>
        <ul>
          {filteredItems.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.title}
              isChecked={todoItem.isChecked}
              onChecked={deleteItem}
              onPriorityChange={handlePriorityChange}
              itemsCount={items.length}
              description={todoItem.description}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
