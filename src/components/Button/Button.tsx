import React from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isIconOnly?: boolean;
  'aria-label'?: string;
}

interface StyledButtonProps extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'isIconOnly'> {
  $disabled?: boolean;
}

interface StyledLinkProps
  extends Omit<ButtonProps, keyof React.ButtonHTMLAttributes<HTMLButtonElement>> {
  $disabled?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
  outline: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;

  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return css`
          background-color: white;
          color: #374151;
          border-color: #d1d5db;
          &:hover {
            background-color: #f9fafb;
            border-color: #9ca3af;
          }
          &:focus {
            box-shadow: 0 0 0 2px #e5e7eb;
          }
        `;
      case 'tertiary':
        return css`
          background-color: transparent;
          color: #374151;
          &:hover {
            background-color: #f3f4f6;
          }
          &:focus {
            box-shadow: 0 0 0 2px #e5e7eb;
          }
        `;
      case 'destructive':
        return css`
          background-color: #dc2626;
          color: white;
          &:hover {
            background-color: #b91c1c;
          }
          &:focus {
            box-shadow: 0 0 0 2px #fee2e2;
          }
        `;
      case 'link':
        return css`
          background-color: transparent;
          color: #3b82f6;
          padding: 0;
          &:hover {
            text-decoration: underline;
          }
          &:focus {
            box-shadow: none;
          }
        `;
      default:
        return css`
          background-color: #3b82f6;
          color: white;
          &:hover {
            background-color: #2563eb;
          }
          &:focus {
            box-shadow: 0 0 0 2px #dbeafe;
          }
        `;
    }
  }}

  ${({ size = 'md' }) => {
    switch (size) {
      case 'sm':
        return css`
          padding: 0.375rem 0.75rem;
          font-size: 0.75rem;
          line-height: 1rem;
        `;
      case 'lg':
        return css`
          padding: 0.625rem 1.25rem;
          font-size: 1rem;
          line-height: 1.5rem;
        `;
      case 'xl':
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
        `;
      case '2xl':
        return css`
          padding: 0.875rem 1.75rem;
          font-size: 1.25rem;
          line-height: 1.75rem;
        `;
      default:
        return css`
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          line-height: 1.25rem;
        `;
    }
  }}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const StyledLink = styled.a<StyledLinkProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  color: #3b82f6;
  cursor: pointer;
  padding: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    `}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isIconOnly,
  disabled,
  'aria-label': ariaLabel,
  ...props
}) => {
  // Warn if icon-only button is missing aria-label
  React.useEffect(() => {
    if (isIconOnly && !ariaLabel) {
      console.warn('Icon-only buttons should have an aria-label for accessibility');
    }
  }, [isIconOnly, ariaLabel]);

  const buttonContent = (
    <>
      {leftIcon && <IconWrapper aria-hidden="true">{leftIcon}</IconWrapper>}
      {isIconOnly ? <IconWrapper aria-hidden="true">{children}</IconWrapper> : children}
      {rightIcon && <IconWrapper aria-hidden="true">{rightIcon}</IconWrapper>}
    </>
  );

  const commonProps = {
    'aria-label': ariaLabel,
    tabIndex: disabled ? -1 : 0,
    $disabled: disabled,
    disabled,
  };

  if (variant === 'link') {
    // Create a new props object with only the props that are valid for anchor elements
    const linkProps = {
      ...commonProps,
      variant,
      size,
      className: props.className,
      style: props.style,
    };

    // Handle click and keydown events separately to avoid type conflicts
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (props.onKeyDown) {
        props.onKeyDown(e as unknown as React.KeyboardEvent<HTMLButtonElement>);
      }
    };

    return (
      <StyledLink role="link" {...linkProps} onClick={handleClick} onKeyDown={handleKeyDown}>
        {buttonContent}
      </StyledLink>
    );
  }

  return (
    <StyledButton {...props} {...commonProps} variant={variant} size={size}>
      {buttonContent}
    </StyledButton>
  );
};

Button.displayName = 'Button';
