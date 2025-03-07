import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../../../contexts/AuthContext';

type PrivateRouteProps = {
  children: React.ReactNode;
};

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-size: 1.5rem;
  color: #4a90e2;
`;

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { state } = useAuth();
  
  useEffect(() => {
    console.log('PrivateRoute: 認証状態変更:', state);
    console.log('PrivateRoute: ユーザー情報:', state.user);
    console.log('PrivateRoute: 認証済み:', state.isAuthenticated);
    
    // ローカルストレージの確認
    const storedUser = localStorage.getItem('user');
    console.log('PrivateRoute: ローカルストレージのユーザー:', storedUser);
  }, [state]);
  
  // ローディング中は読み込み中の表示
  if (state.loading) {
    console.log('PrivateRoute: ローディング中...');
    return <LoadingContainer>読み込み中...</LoadingContainer>;
  }
  
  // ローカルストレージの確認
  const storedUser = localStorage.getItem('user');
  const isUserInStorage = !!storedUser;
  
  // 認証状態の確認
  const isAuthenticated = state.isAuthenticated || isUserInStorage;
  
  // 認証されていない場合はログインページにリダイレクト
  if (!isAuthenticated) {
    console.log('PrivateRoute: 認証されていません。リダイレクトします。');
    return <Navigate to="/auth" replace />;
  }
  
  // 認証されている場合は子コンポーネントを表示
  console.log('PrivateRoute: 認証済み。コンテンツを表示します。');
  return <>{children}</>;
};
