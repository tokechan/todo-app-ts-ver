import React from 'react';
import styled from '@emotion/styled';
import { TodoCheckbox } from '../../atoms/Checkbox/TodoCheckbox';
import { ActionButton } from '../../atoms/Button/ActionButton';

// TodoItemの型定義
export interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

// スタイル付きのコンテナコンポーネント
const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f9fa;
  }
`;

// 完了状態に応じたテキストスタイル
const TodoText = styled.span<{ completed: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${(props) => (props.completed ? '#6c757d' : '#212529')};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  transition: color 0.2s, text-decoration 0.2s;
`;

// TodoItemコンポーネント
export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <TodoItemContainer data-id={id}>
      <TodoCheckbox
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <TodoText completed={completed}>{text}</TodoText>
      <ActionButton onClick={onDelete}>
        <span role="img" aria-label="delete">
          🗑️
        </span>
      </ActionButton>
    </TodoItemContainer>
  );
};
