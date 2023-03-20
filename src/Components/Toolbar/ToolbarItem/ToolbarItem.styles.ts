import styled from 'styled-components';

export const ToolbarItemContainer = styled.div<{ isActive?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0.3rem;
  padding: 0.5rem 0;
  background-color: ${({ isActive }) => (isActive ? '#f5f5f5' : 'transparent')};
  color: ${({ isActive }) => (isActive ? 'black' : 'white')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f5f5f5;
    color: black;
  }

  &:active {
    background-color: #e8e8e8;
    color: black;
  }
`;

export const ToolbarItemLabel = styled.div`
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: capitalize;
`;
