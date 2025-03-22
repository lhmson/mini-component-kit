import React from 'react';
import styled from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  outline: none;

  &.primary {
    background-color: #0ea5e9;
    color: white;
    &:hover {
      background-color: #0284c7;
    }
  }

  &.secondary {
    background-color: #64748b;
    color: white;
    &:hover {
      background-color: #475569;
    }
  }

  &.outline {
    background-color: transparent;
    border: 1px solid #0ea5e9;
    color: #0ea5e9;
    &:hover {
      background-color: #f0f9ff;
    }
  }

  &.small {
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  }

  &.medium {
    padding: 0.625rem 1rem;
    font-size: 1rem;
  }

  &.large {
    padding: 0.75rem 1.25rem;
    font-size: 1.125rem;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) => {
  return (
    <StyledButton className={`${variant} ${size} ${className || ''}`} {...props}>
      {children}
    </StyledButton>
  );
};
