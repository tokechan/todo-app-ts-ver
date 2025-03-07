import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// スタイル付きコンポーネント
const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #3a80d2;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
`;

const SwitchText = styled.p`
  text-align: center;
  margin-top: 15px;
  color: #666;
`;

const SwitchLink = styled.span`
  color: #4a90e2;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

type LoginFormProps = {
  onSwitchToRegister: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { state, login, clearError } = useAuth();
  const navigate = useNavigate();

  // フォームの入力値が変更されたらエラーをクリア
  useEffect(() => {
    if (state.error) {
      clearError();
    }
  }, [email, password]);
  
  // 認証状態が変更されたときの処理
  useEffect(() => {
    console.log('ログインフォーム: 認証状態変更', state);
    
    // 認証済みの場合はホームページにリダイレクト
    if (state.isAuthenticated && state.user) {
      console.log('認証済み、ホームページにリダイレクトします');
      navigate('/');
    }
  }, [state.isAuthenticated, state.user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('ログインボタンがクリックされました');
    
    try {
      // デバッグ用にローカルストレージをクリア
      localStorage.removeItem('user');
      console.log('ログイン前のローカルストレージをクリアしました');
      
      const success = await login(email, password);
      console.log('ログイン結果:', success ? '成功' : '失敗');
      
      if (success) {
        console.log('ログイン成功、状態確認:', state);
        console.log('ローカルストレージ確認:', localStorage.getItem('user'));
        
        // リダイレクトは useEffect で処理されるので、ここでは何もしない
      }
    } catch (error) {
      console.error('ログイン中にエラーが発生しました:', error);
    }
  };

  return (
    <FormContainer>
      <Title>ログイン</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">メールアドレス</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">パスワード</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
        <Button type="submit" disabled={state.loading}>
          {state.loading ? 'ログイン中...' : 'ログイン'}
        </Button>
      </Form>
      <SwitchText>
        アカウントをお持ちでない方は{' '}
        <SwitchLink onClick={onSwitchToRegister}>新規登録</SwitchLink>
      </SwitchText>
    </FormContainer>
  );
};
