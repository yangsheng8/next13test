// components/TodoInput.js
import { useState } from 'react';

const apiUrl = 'https://khhmb0rom0.execute-api.us-east-1.amazonaws.com/dev/todos';

const TodoInput = ({ onTodoAdded }) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue) {
            setError('Please enter a todo');
            return;
        }

        try {
            const res = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: inputValue }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status}`);
            }

            const newTodo = await res.json();
            onTodoAdded(newTodo); // 调用父组件的函数来添加新 todo
            setInputValue('');
            setError(null);
        } catch (err) {
            setError(`Error adding todo: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">Add Todo</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default TodoInput;
