import { useEffect, useState } from 'react'
import { Todo } from './types'

function App() {

  //ローカルストレージからデータを取得
  const loadTodos = (): Todo[] => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  };
  //Todoリストの状態を管理（初期値はローカルストレージのデータ）
  const [todos, setTodos] = useState<Todo[]>(loadTodos());

  //Todoリストの状態を管理する
  const [newTodo, setNewTodo] = useState<string>("");

  //todosが変更されるたびにローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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


  //Todoを削除する処理
  const deleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo)  => todo.id !== id));
  };



  return (
    <div>
      <h1>Todo アプリ</h1>

      {/* 入力フィールドと追加ボタン */}
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
            {/* 削除ボタン */}
            <button onClick={() => deleteTodo(todo.id)}>🗑️ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
