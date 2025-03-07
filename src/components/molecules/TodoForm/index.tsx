import React, { useState } from 'react';
import styled from '@emotion/styled';
import { TodoInput } from '../../atoms/Input/TodoInput';
import { ActionButton } from '../../atoms/Button/ActionButton';

// TodoFormの型定義
export interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

// スタイル付きのコンテナコンポーネント
const TodoFormContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

// TodoFormコンポーネント
export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');

  // 入力値の変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Todoの追加ハンドラ
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  // Enterキーでの追加ハンドラ
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <TodoFormContainer>
      <TodoInput
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="新しいタスクを入力..."
        autoFocus
      />
      <ActionButton onClick={handleAddTodo}>
        <span role="img" aria-label="add">
          ➕
        </span>
      </ActionButton>
    </TodoFormContainer>
  );
};
