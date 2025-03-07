import React from 'react';
import styled from '@emotion/styled';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TodoContainer } from './components/organisms/TodoContainer';
import { TodoProvider } from './contexts/TodoContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthPage } from './components/pages/AuthPage';
import { PrivateRoute } from './components/molecules/PrivateRoute';

// アプリ全体のコンテナスタイル
const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
          <AppContainer>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/" element={
                <PrivateRoute>
                  <TodoContainer />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppContainer>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
