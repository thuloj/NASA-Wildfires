// src/components/Analysis/CategoryFilter.tsx
import React from 'react';
import styled from 'styled-components';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <CategoryList>
      {categories.map((category) => (
        <CategoryButton
          key={category}
          isSelected={category === selectedCategory}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </CategoryButton>
      ))}
    </CategoryList>
  );
};

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

interface CategoryButtonProps {
  isSelected: boolean;
}

const CategoryButton = styled.button<CategoryButtonProps>`
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  border-radius: 0.5rem;
  background-color: ${({ isSelected }) => (isSelected ? '#d747b3' : '#121212')};
  color: white;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #d747b3;
  }
`;

export default CategoryFilter;
