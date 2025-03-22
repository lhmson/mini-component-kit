import React from 'react';
import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';
export type ButtonSize = 'medium' | 'large' | 'xl' | '2xl';
export type ButtonState = 'normal' | 'hover' | 'focus' | 'disabled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isIconOnly?: boolean;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;

  /* Size variants */
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'medium':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
      case 'xl':
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      case '2xl':
        return `
          padding: 1.25rem 2.5rem;
          font-size: 1.25rem;
        `;
    }
  }}

  /* Variant styles */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: #3b82f6;
          color: white;
          &:hover:not(:disabled) {
            background-color: #2563eb;
          }
          &:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          }
        `;
      case 'secondary':
        return `
          background-color: #e5e7eb;
          color: #374151;
          &:hover:not(:disabled) {
            background-color: #d1d5db;
          }
          &:focus {
            box-shadow: 0 0 0 3px rgba(229, 231, 235, 0.5);
          }
        `;
      case 'tertiary':
        return `
          background-color: transparent;
          color: #3b82f6;
          border: 1px solid #3b82f6;
          &:hover:not(:disabled) {
            background-color: #eff6ff;
          }
          &:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          }
        `;
      case 'destructive':
        return `
          background-color: #ef4444;
          color: white;
          &:hover:not(:disabled) {
            background-color: #dc2626;
          }
          &:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.5);
          }
        `;
      case 'link':
        return `
          background-color: transparent;
          color: #3b82f6;
          padding: 0;
          &:hover:not(:disabled) {
            text-decoration: underline;
          }
          &:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
          }
        `;
    }
  }}

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Icon-only styles */
  ${({ isIconOnly }) =>
    isIconOnly &&
    `
    padding: 0.5rem;
    border-radius: 50%;
  `}
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  leftIcon,
  rightIcon,
  isIconOnly = false,
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} isIconOnly={isIconOnly} {...props}>
      {leftIcon && <span className="button-icon-left">{leftIcon}</span>}
      {!isIconOnly && children}
      {rightIcon && <span className="button-icon-right">{rightIcon}</span>}
    </StyledButton>
  );
};
