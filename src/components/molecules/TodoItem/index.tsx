import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TodoCheckbox } from '../../atoms/Checkbox/TodoCheckbox';
import { ActionButton } from '../../atoms/Button/ActionButton';
import { TodoInput } from '../../atoms/Input/TodoInput';

// TodoItemの型定義
export interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (text: string) => void;
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

//編集用入力フィールドのスタイル
const EditInput = styled(TodoInput)`
  flex: 1;
  margin: 0 10px;
`;

// TodoItemコンポーネント
export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit, 
}) => {
  //編集モードの状態管理
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  // 編集完了時の処理
  const handleSave = () => {
    if (editText.trim() !== '') {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  //Enterキーでの保存
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  }

  //編集キャンセル時の処理
  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };


  
  return (
    <TodoItemContainer data-id={id}>
      <TodoCheckbox
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />

      {isEditing ? (
        <>
        <EditInput
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <ActionButton onClick={handleSave}>🙆</ActionButton>
        <ActionButton onClick={handleCancel}>🙅‍♀️</ActionButton>
        </>
      ) : (
        <>
      <TodoText completed={completed}>{text}</TodoText>
      <ActionButton onClick={() => setIsEditing(true)}>✏️</ActionButton>
      <ActionButton onClick={onDelete}>
        <span role="img" aria-label="delete">
          🗑️
        </span>
      </ActionButton>
        </>
      )}
    </TodoItemContainer>
  );
};
