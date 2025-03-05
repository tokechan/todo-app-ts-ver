import { useEffect, useState } from 'react'
import { Todo } from './types'
import styled from '@emotion/styled'

// スタイル付きコンポーネントの定義
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const EditInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2980b9;
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TodoItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TodoCheckbox = styled.input`
  margin-right: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const TodoText = styled.span<{ completed?: boolean }>`
  flex: 1;
  font-size: 16px;
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#888' : '#2c3e50'};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
  padding: 5px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

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

  //編集モードの管理(編集中のTodoのid＆入力値）
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

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


  //Todoを編集する処理
  const startEditing = (id: number, text: string) => {
    try {
      setEditingId(id);
      setEditText(text || ''); // textがnullの場合のフォールバック
    } catch (error) {
      console.error('Error starting edit:', error);
    }
  };

  //編集内容を保存する
  const saveEdit = (id: number) => {
    if(editText.trim() === "") return; //空文字の場合はreturn
      setTodos((prevTodos) =>
        prevTodos.map((todo) => 
          todo.id === id ? { ...todo, text: editText.trim() || todo.text } : todo
        )
      );
      setEditingId(null);
      setEditText("");
    };

    //Enterキーを押したときの処理
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
      if (e.key === "Enter") {
        e.preventDefault(); // フォーム送信を防ぐ
        action();
      }
    };

  return (
    <Container>
      <Title>Todo アプリ</Title>

      {/* 入力フィールドと追加ボタン */}
      <InputContainer>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, addTodo)}
          placeholder="新しいTodoを入力"
        />
        <AddButton onClick={addTodo}>追加</AddButton>
      </InputContainer>

      {/* Todoリストの表示 */}
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id}>
            <TodoCheckbox 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)}
            />

            {/* 編集ボタン */}
            {editingId === todo.id ? (
              <>
                <EditInput 
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, () => saveEdit(todo.id))} //Enterキー対応
                  autoFocus //入力欄に自動フォーカス
                />
                <ActionButton onClick={() => saveEdit(todo.id)}>✅</ActionButton>
              </>
            ) : (
              <>
                <TodoText completed={todo.completed}>{todo.text}</TodoText>
                <ActionButton onClick={() => startEditing(todo.id, todo.text)}>✏️</ActionButton>
              </>
            )}
            {/* 削除ボタン */}
            <ActionButton onClick={() => deleteTodo(todo.id)}>🗑️</ActionButton>
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
}

export default App
