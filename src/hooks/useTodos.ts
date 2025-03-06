import { useState, useEffect } from 'react';
import { Todo, FilterStatus } from '../types/todo';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // ローカルストレージからデータを取得
  const loadTodos = (): Todo[] => {
    try {
      const storedTodos = localStorage.getItem("todos");
      if (!storedTodos) return [];
      const parsedTodos = JSON.parse(storedTodos);
      return Array.isArray(parsedTodos) ? parsedTodos : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  };

  // 初期化時にローカルストレージからデータを読み込む
  useEffect(() => {
    setTodos(loadTodos());
  }, []);

  // todosが変更されるたびにローカルストレージに保存する
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Todoの追加
  const addTodo = (text: string) => {
    if (text.trim() === "") return;
    const newTask: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false
    };
    setTodos(prevTodos => [...prevTodos, newTask]);
  };

  // Todoの完了状態を切り替え
  const toggleTodo = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todoの編集
  const updateTodo = (id: number, newText: string) => {
    if (newText.trim() === "") return;
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  // フィルタリングされたTodosを取得
  const getFilteredTodos = () => {
    return todos.filter((todo) => {
      if (filterStatus === "active") return !todo.completed;
      if (filterStatus === "completed") return todo.completed;
      return true;
    });
  };

  return {
    todos: getFilteredTodos(),
    addTodo,
    toggleTodo,
    updateTodo,
    filterStatus,
    setFilterStatus,
  };
};
