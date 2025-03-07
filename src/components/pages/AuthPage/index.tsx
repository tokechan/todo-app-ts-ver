import React, { useState } from 'react';
import styled from '@emotion/styled';
import { LoginForm } from '../../molecules/LoginForm';
import { RegisterForm } from '../../molecules/RegisterForm';

// スタイル付きコンポーネント
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
`;

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container>
      {isLogin ? (
        <LoginForm onSwitchToRegister={toggleForm} />
      ) : (
        <RegisterForm onSwitchToLogin={toggleForm} />
      )}
    </Container>
  );
};
