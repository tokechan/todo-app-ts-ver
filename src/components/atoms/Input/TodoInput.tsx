import styled from '@emotion/styled';

export interface TodoInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const TodoInput = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;
