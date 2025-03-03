import { useState } from 'react'
import { Todo } from './types'

function App() {

  //Todoリストの状態を管理
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: true },
    { id: 3, text: 'Todo 3', completed: false },
  ]);



  //checkboxをクリックしたときの処理
  const toggleTodo = (id: number) => {
     setTodos((prevTodos) => 
       prevTodos.map((todo) => 
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };


  return (
    <div>
      <h1>Todo アプリ</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input 
            type="checkbox" 
            checked={todo.completed} 
            onChange={() => toggleTodo(todo.id)}
            />
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
