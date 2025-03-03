import { useState } from 'react'
import { Todo } from './types'

function App() {

  //Todoリストの状態を管理
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: true },
    { id: 3, text: 'Todo 3', completed: false },
  ]);

  return (
    <div>
      <h1>Todo アプリ</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
