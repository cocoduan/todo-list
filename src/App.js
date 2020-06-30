import React, { useState, useEffect } from 'react';
import './App.css';

const unCompleteIcon = <svg t="1593488346268" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3145" width="200" height="200"><path d="M512 85.333333a426.666667 426.666667 0 1 0 426.666667 426.666667A426.666667 426.666667 0 0 0 512 85.333333z m0 768a341.333333 341.333333 0 1 1 341.333333-341.333333 341.333333 341.333333 0 0 1-341.333333 341.333333z" p-id="3146" fill="#ffffff"></path></svg>;
const completeIcon = <svg t="1593490719569" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3908" width="200" height="200"><path d="M451.669333 589.994667l241.365334-241.322667 60.330666 60.330667-301.696 301.653333-181.034666-180.992L330.965333 469.333333l120.704 120.661334zM512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z m0-85.333334a341.333333 341.333333 0 1 0 0-682.666666 341.333333 341.333333 0 0 0 0 682.666666z" fill="#ffffff" p-id="3909"></path></svg>;
const removeIcon = <svg t="1593486581541" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1317" width="200" height="200"><path d="M684.8 236.8l100.266667 102.4c2.133333 2.133333 4.266667 6.4 4.266666 10.666667s-2.133333 6.4-4.266666 10.666666l-151.466667 151.466667 151.466667 151.466667c2.133333 2.133333 4.266667 6.4 4.266666 10.666666s-2.133333 8.533333-4.266666 10.666667l-100.266667 100.266667c-2.133333 2.133333-6.4 4.266667-10.666667 4.266666s-6.4-2.133333-10.666666-4.266666l-151.466667-151.466667-151.466667 151.466667c-2.133333 2.133333-6.4 4.266667-10.666666 4.266666s-8.533333-2.133333-10.666667-4.266666l-100.266667-100.266667c-2.133333-2.133333-4.266667-6.4-4.266666-10.666667s2.133333-6.4 4.266666-10.666666l151.466667-151.466667-151.466667-151.466667c-2.133333-2.133333-4.266667-6.4-4.266666-10.666666s2.133333-8.533333 4.266666-10.666667l100.266667-100.266667c2.133333-2.133333 6.4-4.266667 10.666667-4.266666s6.4 2.133333 10.666666 4.266666l151.466667 151.466667 151.466667-151.466667c2.133333-2.133333 6.4-4.266667 10.666666-4.266666 4.266667-2.133333 8.533333 0 10.666667 2.133333z" p-id="1318" fill="#ffffff"></path></svg>;
const INIT_TODOS = [
  {title: 'Learn about React', isComplete: false},
  {title: 'Design 101', isComplete: false},
  {title: 'Build todo App', isComplete: false}
];

function TodoForm({ addTodo }) {
  // value is the initial value; setValue function to update the value
  const [value, setValue] = useState('');
  const onSubmit = (e) => {
    // form submission by default will refresh the page, prevent it
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}/>
    </form>
  );
}

function TodoList({ todos, removeTodo, completeTodo }) {
  return (
    <div className="todo-list">
      {
        todos.map((todo, index) => (
          <div className="todo" key={todo.title} onClick={() => completeTodo(index)}>
            <a href="#!" className="check-icon">{todo.isComplete ? completeIcon : unCompleteIcon}</a>
            <p style={{
              textDecoration: todo.isComplete ? 'line-through' : 'none'
            }}>{todo.title}</p>
            <a href="#!" className="remove"
              onClick={e => removeTodo(e, index)}>{removeIcon}</a>
          </div>
        ))
      }
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || INIT_TODOS);

  // once `todos` changes, it'll trigger updating the localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos]);

  const addTodo = (title) => {
    const newTodos = [{ title }, ...todos];
    setTodos(newTodos);
  }
  const removeTodo = (e, index) => {
    e.preventDefault();
    e.stopPropagation(); // prevent triggering (parent) complete event
    const newTodos = [...todos]; // donot modify the original todos directly
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }
  const completeTodo = (index) => {
    if (todos[index].isComplete) return;
    const newTodos = [...todos]; // donot modify the original todos directly
    newTodos[index].isComplete = true;
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <div>
        <TodoForm addTodo={addTodo}></TodoForm>
        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          completeTodo={completeTodo}>
        </TodoList>
      </div>
    </div>
  );
}

export default App;
