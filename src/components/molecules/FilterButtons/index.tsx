import React from 'react';
import styled from '@emotion/styled';
import { FilterButton } from '../../atoms/Button/FilterButton';
import { FilterStatus } from '../../../types/todo';

// FilterButtonsの型定義
export interface FilterButtonsProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

// スタイル付きのコンテナコンポーネント
const FilterButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 20px 0;
`;

// FilterButtonsコンポーネント
export const FilterButtons: React.FC<FilterButtonsProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  return (
    <FilterButtonsContainer>
      <FilterButton
        isActive={currentFilter === 'all'}
        onClick={() => onFilterChange('all')}
      >
        すべて
      </FilterButton>
      <FilterButton
        isActive={currentFilter === 'active'}
        onClick={() => onFilterChange('active')}
      >
        未完了
      </FilterButton>
      <FilterButton
        isActive={currentFilter === 'completed'}
        onClick={() => onFilterChange('completed')}
      >
        完了済み
      </FilterButton>
    </FilterButtonsContainer>
  );
};
