import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../../atoms/Text/Title';
import { TodoForm } from '../../molecules/TodoForm';
import { FilterButtons } from '../../molecules/FilterButtons';
import { TodoList } from '../TodoList';
import { useTodoContext } from '../../../contexts/TodoContext';

// スタイル付きのコンテナコンポーネント
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

// 残りのタスク数を表示するコンポーネント
const TodoCount = styled.div`
  text-align: center;
  margin: 10px 0;
  color: #6c757d;
  font-size: 14px;
`;

// TodoContainerコンポーネント
export const TodoContainer: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    filterStatus,
    setFilterStatus,
  } = useTodoContext();

  // 未完了のタスク数を計算
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <Container>
      <Title>Todoリスト</Title>
      <TodoForm onAddTodo={addTodo} />
      <FilterButtons
        currentFilter={filterStatus}
        onFilterChange={setFilterStatus}
      />
      <TodoList
        todos={todos}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
      />
      <TodoCount>
        {activeTodosCount === 0
          ? 'すべてのタスクが完了しました！'
          : `${activeTodosCount}個のタスクが残っています`}
      </TodoCount>
    </Container>
  );
};
