import styled from '@emotion/styled';

export interface TodoCheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const TodoCheckbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
  width: 18px;
  height: 18px;
`;
