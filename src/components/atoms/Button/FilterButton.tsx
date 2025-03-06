import styled from '@emotion/styled';

export interface FilterButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const FilterButton = styled.button<{ isActive: boolean }>`
  padding: 8px 16px;
  border: 2px solid #3498db;
  border-radius: 4px;
  background-color: ${props => props.isActive ? '#3498db' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#3498db'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isActive ? '#2980b9' : '#edf2f7'};
  }
`;
