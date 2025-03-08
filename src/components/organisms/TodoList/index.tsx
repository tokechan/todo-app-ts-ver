import React from 'react';
import styled from '@emotion/styled';
import { TodoItem } from '../../molecules/TodoItem';
import { Todo } from '../../../types/todo';

// TodoListの型定義
export interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, text: string) => void;
}

// スタイル付きのコンテナコンポーネント
const TodoListContainer = styled.div`
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
`;

// TodoListが空の場合のメッセージ
const EmptyMessage = styled.p`
  text-align: center;
  color: #6c757d;
  font-style: italic;
  margin: 20px 0;
`;

// TodoListコンポーネント
export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleTodo,
  onDeleteTodo,
  onUpdateTodo,
}) => {
  // Todoリストが空の場合
  if (todos.length === 0) {
    return <EmptyMessage>タスクがありません。新しいタスクを追加してください。</EmptyMessage>;
  }

  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
          onEdit={(text) => onUpdateTodo(todo.id, text)}
        />
      ))}
    </TodoListContainer>
  );
};
