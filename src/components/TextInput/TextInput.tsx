import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text for the input
   */
  label?: string;
  /**
   * Hint text to display below the input
   */
  hint?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
}

const InputContainer = styled.div<{ $hasError?: boolean; $isFocused?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  transition: all 0.2s;

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #ef4444;
      background-color: #fee2e2;
    `}

  ${({ $isFocused }) =>
    $isFocused &&
    css`
      border-color: #3b82f6;
      box-shadow: 0 0 0 2px #dbeafe;
    `}

  &:hover {
    border-color: #9ca3af;
  }

  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #dbeafe;
  }
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
  background-color: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      color: #991b1b;
    `}
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const HelperText = styled.span<{ $hasError?: boolean }>`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${({ $hasError }) => ($hasError ? '#991B1B' : '#6B7280')};
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  color: #9ca3af;
`;

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  hint,
  startIcon,
  endIcon,
  id,
  disabled,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <InputContainer $hasError={hasError} $isFocused={isFocused}>
        {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
        <StyledInput
          id={inputId}
          disabled={disabled}
          $hasError={hasError}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
      </InputContainer>
      {error && (
        <HelperText id={`${inputId}-error`} role="alert" $hasError={true}>
          {error}
        </HelperText>
      )}
      {hint && !error && (
        <HelperText id={`${inputId}-hint`} role="status">
          {hint}
        </HelperText>
      )}
    </div>
  );
};

TextInput.displayName = 'TextInput';
