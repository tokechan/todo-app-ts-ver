import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { User, AuthState, AuthAction } from '../types/auth';

// 初期状態
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// リデューサー関数
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      // ユーザー情報をローカルストレージに保存
      const userStr = JSON.stringify(action.payload);
      localStorage.setItem('user', userStr);
      console.log('ローカルストレージに保存しました:', userStr);
      
      // 新しい状態を返す
      const newState = {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
      console.log('新しい認証状態:', newState);
      return newState;
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// コンテキストの型定義
type AuthContextType = {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

// コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ローカルストレージからユーザー情報を読み込む
  useEffect(() => {
    const loadUser = () => {
      try {
        // ローディング状態をセット
        console.log('ローカルストレージからユーザー情報を読み込み中...');
        
        // ローカルストレージからユーザー情報を取得
        const user = localStorage.getItem('user');
        if (user) {
          try {
            const parsedUser = JSON.parse(user);
            console.log('ユーザー情報を読み込みました:', parsedUser);
            dispatch({ type: 'LOGIN_SUCCESS', payload: parsedUser });
          } catch (parseError) {
            console.error('ユーザー情報の解析エラー:', parseError);
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
          }
        } else {
          console.log('ユーザー情報が見つかりません。ログアウト状態に設定します。');
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('ユーザー情報の読み込みエラー:', error);
        dispatch({ type: 'LOGOUT' });
      }
    };
    
    loadUser();
  }, []);

  // ログイン関数
  const login = async (email: string, password: string) => {
    try {
      // ログイン処理開始
      dispatch({ type: 'LOGIN_REQUEST' });
      
      console.log('ログイン試行:', email, password);
      
      // デバッグ用にタイムアウトを追加
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // モックログイン - 後でAPIに置き換え
      if (email === 'test@example.com' && password === 'password') {
        const user = {
          id: '1',
          username: 'testuser',
          email: 'test@example.com',
        };
        
        // ログイン成功
        console.log('ログイン成功:', user);
        
        try {
          // ユーザー情報をローカルストレージに保存
          const userStr = JSON.stringify(user);
          localStorage.setItem('user', userStr);
          console.log('ローカルストレージに保存しました:', userStr);
          
          // リダイレクトの前にディスパッチ
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
          
          // 状態を確認
          setTimeout(() => {
            const currentUser = localStorage.getItem('user');
            console.log('ログイン確認 - ローカルストレージのユーザー:', currentUser);
          }, 100);
          
          return true;
        } catch (storageError) {
          console.error('ローカルストレージ保存エラー:', storageError);
          dispatch({ type: 'LOGIN_FAILURE', payload: 'ログイン状態の保存に失敗しました' });
          return false;
        }
      } else {
        console.log('ログイン失敗: 認証情報が一致しません');
        dispatch({ type: 'LOGIN_FAILURE', payload: 'メールアドレスまたはパスワードが正しくありません' });
        return false;
      }
    } catch (error) {
      console.error('ログインエラー:', error);
      dispatch({ type: 'LOGIN_FAILURE', payload: 'ログインに失敗しました' });
      return false;
    }
  };

  // 登録関数
  const register = async (username: string, email: string, password: string) => {
    try {
      // 登録処理開始
      dispatch({ type: 'REGISTER_REQUEST' });
      
      console.log('登録試行:', username, email);
      
      // モック登録 - 後でAPIに置き換え
      const user = {
        id: Date.now().toString(),
        username,
        email,
      };
      
      // 登録成功
      console.log('登録成功:', user);
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
      
      // ユーザー情報をローカルストレージに保存
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (error) {
      console.error('登録エラー:', error);
      dispatch({ type: 'REGISTER_FAILURE', payload: '登録に失敗しました' });
      return false;
    }
  };

  // ログアウト関数
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // エラークリア関数
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider value={{ state, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
