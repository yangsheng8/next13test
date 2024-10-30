// components/TodoList.js
import { useEffect, useState } from 'react';
import TodoInput from './TodoInput'

const apiUrl = 'https://khhmb0rom0.execute-api.us-east-1.amazonaws.com/dev/todos';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    const fetchTodos = async () => {
        try {
            const res = await fetch(apiUrl);
            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }
            const data = await res.json();
            setTodos(data);
        } catch (err) {
            setError(`Error fetching todos: ${err.message}`);
        }
    };

    const handleTodoAdded = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h2>Todo List</h2>
            {error && <p>{error}</p>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.message}</li>
                ))}
            </ul>
            <TodoInput onTodoAdded={handleTodoAdded}></TodoInput>
        </div>
    );
};

export default TodoList;
