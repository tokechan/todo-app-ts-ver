import { useState } from 'react'
import { Todo } from './types'

function App() {

  //Todoリストの状態を管理
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Todo 1', completed: false },
    { id: 2, text: 'Todo 2', completed: true },
    { id: 3, text: 'Todo 3', completed: false },
  ]);

  //Inputの状態を管理
  const [newTodo, setNewTodo] = useState<string>("");


  //checkboxをクリックしたときの処理
  const toggleTodo = (id: number) => {
     setTodos((prevTodos) => 
       prevTodos.map((todo) => 
         todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //Todoを追加する処理
  const addTodo = () => {
    if (newTodo.trim() === "") return;//空文字の場合はreturn

    const newTask: Todo = {
      id: Date.now(), //idは現在時刻
      text: newTodo,
      completed: false
    };
    
    setTodos((prevTodos) => [...prevTodos, newTask]);
    setNewTodo(""); //入力欄を空にする
  };



  return (
    <div>
      <h1>Todo アプリ</h1>

      {/* Todoリストの表示 */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTodo}>Add </button>
      </div>

      {/* Todoリストの表示 */}
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
