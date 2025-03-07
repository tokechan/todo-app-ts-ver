import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useAuth } from '../../../contexts/AuthContext';

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

type RegisterFormProps = {
  onSwitchToLogin: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { state, register, clearError } = useAuth();

  // フォームの入力値が変更されたらエラーをクリア
  useEffect(() => {
    if (state.error) {
      clearError();
    }
    if (passwordError) {
      setPasswordError('');
    }
  }, [username, email, password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('新規登録ボタンがクリックされました');
    
    // パスワードの一致確認
    if (password !== confirmPassword) {
      console.log('パスワード不一致エラー');
      setPasswordError('パスワードが一致しません');
      return;
    }
    
    try {
      console.log('登録処理開始:', username, email);
      const success = await register(username, email, password);
      console.log('登録結果:', success ? '成功' : '失敗');
      
      if (success) {
        console.log('登録成功、ホームページにリダイレクトします');
        // 登録成功時の処理は、AuthContextのリダイレクトに任せる
      }
    } catch (error) {
      console.error('登録中にエラーが発生しました:', error);
    }
  };

  return (
    <FormContainer>
      <Title>アカウント登録</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>
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
        <FormGroup>
          <Label htmlFor="confirmPassword">パスワード（確認）</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </FormGroup>
        {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
        <Button type="submit" disabled={state.loading}>
          {state.loading ? '登録中...' : '登録'}
        </Button>
      </Form>
      <SwitchText>
        すでにアカウントをお持ちの方は{' '}
        <SwitchLink onClick={onSwitchToLogin}>ログイン</SwitchLink>
      </SwitchText>
    </FormContainer>
  );
};
