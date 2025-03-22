import React, { forwardRef } from 'react';
import styled from 'styled-components';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text for the input
   */
  label: string;
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`;

const InputContainer = styled.div<{ hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid ${({ hasError }) => (hasError ? '#EF4444' : '#D1D5DB')};
  border-radius: 0.375rem;
  background-color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ hasError }) => (hasError ? '#EF4444' : '#9CA3AF')};
  }

  &:focus-within {
    border-color: ${({ hasError }) => (hasError ? '#EF4444' : '#3B82F6')};
    box-shadow: 0 0 0 2px ${({ hasError }) => (hasError ? '#FEE2E2' : '#DBEAFE')};
  }

  &:disabled {
    background-color: #f3f4f6;
    border-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: #111827;
  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:disabled {
    color: #6b7280;
    cursor: not-allowed;
  }

  /* Remove spinner buttons for number inputs */
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.75rem;
  color: #6b7280;

  &:first-child {
    padding-left: 0.75rem;
  }

  &:last-child {
    padding-right: 0.75rem;
  }
`;

const HelperText = styled.span<{ hasError?: boolean }>`
  font-size: 0.75rem;
  color: ${({ hasError }) => (hasError ? '#EF4444' : '#6B7280')};
`;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, hint, error, startIcon, endIcon, id, ...props }, ref) => {
    const inputId = id || `text-input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;

    return (
      <InputWrapper>
        <Label htmlFor={inputId}>{label}</Label>
        <InputContainer hasError={hasError}>
          {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
          <StyledInput
            ref={ref}
            id={inputId}
            aria-invalid={hasError}
            aria-describedby={hint || error ? `${inputId}-description` : undefined}
            {...props}
          />
          {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
        </InputContainer>
        {(hint || error) && (
          <HelperText
            id={`${inputId}-description`}
            hasError={hasError}
            role={hasError ? 'alert' : undefined}
          >
            {error || hint}
          </HelperText>
        )}
      </InputWrapper>
    );
  }
);

TextInput.displayName = 'TextInput';
