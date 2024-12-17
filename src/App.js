import React, { useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState('');
  
  const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }
};

  // Add a new todo
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
   console.log(input)   
axios.post('https://to-do-list-a9ed8-default-rtdb.firebaseio.com/todo.json', input, options)
.then(response => {
    // statements to execute on success response from API endpoint
    console.log(response.data);
})
.catch(error => {
    // statements to execute on error response from API endpoint
    console.log(error);
});
    }
  };

  // Delete a todo
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Start editing a todo
  const startEdit = (index) => {
    setEditIndex(index);
    setEditInput(todos[index]);
  };

  // Update the todo with the edited value
  const updateTodo = () => {
    if (editInput.trim()) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editInput;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditInput('');
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      {/* Editing Section */}
      {editIndex !== null && (
        <div>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            placeholder="Edit your todo"
          />
          <button onClick={updateTodo}>Update</button>
          <button onClick={() => setEditIndex(null)}>Cancel</button>
        </div>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => startEdit(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
