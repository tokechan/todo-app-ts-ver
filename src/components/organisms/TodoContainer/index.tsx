import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Title } from '../../atoms/Text/Title';
import { TodoForm } from '../../molecules/TodoForm';
import { FilterButtons } from '../../molecules/FilterButtons';
import { TodoList } from '../TodoList';
import { useTodoContext } from '../../../contexts/TodoContext';
import { useAuth } from '../../../contexts/AuthContext';
import { User } from '../../../types/auth';

// スタイル付きのコンテナコンポーネント
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// 残りのタスク数を表示するコンポーネント
const TodoCount = styled.div`
  text-align: center;
  margin: 10px 0;
  color: #6c757d;
  font-size: 14px;
`;

// ユーザー情報を表示するコンポーネント
const UserInfo = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #4a90e2;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px 10px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const UserIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
`;

const UserName = styled.span`
  margin-right: 10px;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid #e74c3c;
  border-radius: 12px;
  color: #e74c3c;
  cursor: pointer;
  font-size: 12px;
  padding: 3px 8px;
  transition: all 0.2s ease;
  &:hover {
    background-color: #e74c3c;
    color: white;
  }
`;

// TodoContainerコンポーネント
export const TodoContainer: React.FC = () => {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    filterStatus,
    setFilterStatus,
  } = useTodoContext();
  
  const { state, logout } = useAuth();
  const [localUser, setLocalUser] = useState<User | null>(null);
  
  // ローカルストレージからユーザー情報を取得
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        console.log('TodoContainer: ローカルストレージからユーザー情報を取得しました:', parsedUser);
        setLocalUser(parsedUser);
      }
    } catch (error) {
      console.error('TodoContainer: ローカルストレージからの読み込みエラー:', error);
    }
  }, []);
  
  // 認証状態をデバッグ表示
  useEffect(() => {
    console.log('TodoContainer: 認証状態変更:', state);
    console.log('TodoContainer: ユーザー情報:', state.user);
    console.log('TodoContainer: 認証済み:', state.isAuthenticated);
    console.log('TodoContainer: ローカルユーザー:', localUser);
  }, [state, localUser]);

  // 未完了のタスク数を計算
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  
  // ユーザー名の頭文字を取得
  const getUserInitial = () => {
    // まずは状態からユーザー情報を取得
    if (state.user && state.user.username) {
      return state.user.username.charAt(0).toUpperCase();
    }
    // 状態になければローカルストレージから取得
    if (localUser && localUser.username) {
      return localUser.username.charAt(0).toUpperCase();
    }
    return '?';
  };
  
  // ユーザー名を取得
  const getUsername = () => {
    if (state.user && state.user.username) {
      return state.user.username;
    }
    if (localUser && localUser.username) {
      return localUser.username;
    }
    return 'ユーザー';
  };
  
  // 認証状態を確認
  const isUserAuthenticated = state.isAuthenticated || !!localUser;

  return (
    <Container>
      {isUserAuthenticated && (
        <UserInfo>
          <UserIcon>{getUserInitial()}</UserIcon>
          <UserName>{getUsername()}</UserName>
          <LogoutButton onClick={logout}>ログアウト</LogoutButton>
        </UserInfo>
      )}
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
        onUpdateTodo={updateTodo}
      />
      <TodoCount>
        {activeTodosCount === 0
          ? 'すべてのタスクが完了しました！'
          : `${activeTodosCount}個のタスクが残っています`}
      </TodoCount>
    </Container>
  );
};
