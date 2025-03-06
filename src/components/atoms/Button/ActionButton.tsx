import styled from '@emotion/styled';

export interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 16px;
  padding: 5px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;
