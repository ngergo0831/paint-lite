import styled from 'styled-components';

export const ToolbarItemContainer = styled.div<{ isActive?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.5rem;
  background-color: ${({ isActive }) => (isActive ? '#f5f5f5' : 'transparent')};

  &:hover {
    background-color: #f5f5f5;
  }

  &:active {
    background-color: #e8e8e8;
  }
`;

export const ToolbarItemLabel = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
`;
