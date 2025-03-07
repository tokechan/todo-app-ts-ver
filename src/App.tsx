import React from 'react';
import styled from '@emotion/styled';
import { TodoContainer } from './components/organisms/TodoContainer';
import { TodoProvider } from './contexts/TodoContext';

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
    <TodoProvider>
      <AppContainer>
        <TodoContainer />
      </AppContainer>
    </TodoProvider>
  );
}

export default App;
