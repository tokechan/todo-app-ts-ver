import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Todo, FilterStatus } from '../types/todo';
import { useAuth } from './AuthContext';

// 状態の型定義
interface TodoState {
  todos: Todo[];
  filterStatus: FilterStatus;
  filteredTodos: Todo[];
}

// アクションの型定義
type TodoAction = 
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: { id: number; text: string } }
  | { type: 'SET_FILTER'; payload: FilterStatus }
  | { type: 'LOAD_TODOS'; payload: Todo[] };

// コンテキストの型定義
interface TodoContextType {
  todos: Todo[];
  filterStatus: FilterStatus;
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, text: string) => void;
  setFilterStatus: (status: FilterStatus) => void;
}

// 初期状態
const initialState: TodoState = {
  todos: [],
  filterStatus: 'all',
  filteredTodos: []
};

// ローカルストレージのキーを生成する関数
const getStorageKey = (userId: string) => `todos_${userId}`;

// Reducer関数
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  let newState: TodoState;
  
  switch (action.type) {
    case 'ADD_TODO':
      if (action.payload.trim() === '') return state;
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false
      };
      newState = {
        ...state,
        todos: [...state.todos, newTodo]
      };
      break;
    
    case 'TOGGLE_TODO':
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
      break;
    
    case 'DELETE_TODO':
      newState = {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
      break;
    
    case 'UPDATE_TODO':
      if (action.payload.text.trim() === '') return state;
      newState = {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text.trim() }
            : todo
        )
      };
      break;
    
    case 'SET_FILTER':
      newState = {
        ...state,
        filterStatus: action.payload
      };
      break;
    
    case 'LOAD_TODOS':
      newState = {
        ...state,
        todos: action.payload
      };
      break;
    
    default:
      return state;
  }
  
  // フィルタリングされたTodosを計算
  newState.filteredTodos = newState.todos.filter(todo => {
    if (newState.filterStatus === 'active') return !todo.completed;
    if (newState.filterStatus === 'completed') return todo.completed;
    return true;
  });
  
  return newState;
};

// コンテキストの作成
const TodoContext = createContext<TodoContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { state: authState } = useAuth();
  const userId = authState.user?.id;
  
  // ローカルストレージからデータを取得
  useEffect(() => {
    try {
      if (userId) {
        const storageKey = getStorageKey(userId);
        const storedTodos = localStorage.getItem(storageKey);
        if (storedTodos) {
          const parsedTodos = JSON.parse(storedTodos);
          if (Array.isArray(parsedTodos)) {
            dispatch({ type: 'LOAD_TODOS', payload: parsedTodos });
          }
        } else {
          // ユーザーのTodoがない場合は空の配列をセット
          dispatch({ type: 'LOAD_TODOS', payload: [] });
        }
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  }, [userId]); // ユーザーIDが変わったら再読み込み
  
  // todosが変更されるたびにローカルストレージに保存
  useEffect(() => {
    if (userId && state.todos.length >= 0) {
      const storageKey = getStorageKey(userId);
      localStorage.setItem(storageKey, JSON.stringify(state.todos));
    }
  }, [state.todos, userId]);
  
  // アクション関数
  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };
  
  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };
  
  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };
  
  const updateTodo = (id: number, text: string) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, text } });
  };
  
  const setFilterStatus = (status: FilterStatus) => {
    dispatch({ type: 'SET_FILTER', payload: status });
  };
  
  // コンテキスト値
  const contextValue: TodoContextType = {
    todos: state.filteredTodos,
    filterStatus: state.filterStatus,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    setFilterStatus
  };
  
  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

// カスタムフック
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
