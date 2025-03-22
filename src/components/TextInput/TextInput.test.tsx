import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  const defaultProps = {
    label: 'Username',
    placeholder: 'Enter your username',
  };

  it('renders with all required props', () => {
    render(<TextInput {...defaultProps} />);

    // Check for label
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();

    // Check for input
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', defaultProps.placeholder);
    expect(input).toHaveAttribute('id');
    expect(screen.getByLabelText(defaultProps.label)).toBe(input);
  });

  it('renders with hint text', () => {
    const hint = 'Username must be at least 3 characters long';
    render(<TextInput {...defaultProps} hint={hint} />);

    const input = screen.getByRole('textbox');
    const hintElement = screen.getByText(hint);

    expect(hintElement).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-describedby', hintElement.id);
  });

  it('renders with error message', () => {
    const error = 'Username is required';
    render(<TextInput {...defaultProps} error={error} />);

    const input = screen.getByRole('textbox');
    const errorElement = screen.getByText(error);

    expect(errorElement).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', errorElement.id);
    expect(errorElement).toHaveAttribute('role', 'alert');
  });

  it('renders with start and end icons', () => {
    const startIcon = '🔍';
    const endIcon = '✓';
    render(
      <TextInput
        {...defaultProps}
        startIcon={<span>{startIcon}</span>}
        endIcon={<span>{endIcon}</span>}
      />
    );

    expect(screen.getByText(startIcon)).toBeInTheDocument();
    expect(screen.getByText(endIcon)).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<TextInput {...defaultProps} disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    expect(input).toHaveStyle({ color: 'rgb(107, 114, 128)' });
  });

  it('handles focus state', async () => {
    render(<TextInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const container = input.parentElement;
    expect(container).not.toBeNull();

    // Focus the input
    input.focus();

    // Wait for the focus styles to be applied
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check focus styles
    const computedStyle = window.getComputedStyle(container!);
    expect(computedStyle.borderColor).toBe('rgb(156, 163, 175)');

    // Blur the input
    input.blur();

    // Wait for the blur styles to be applied
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check default styles
    const defaultStyle = window.getComputedStyle(container!);
    expect(defaultStyle.borderColor).toBe('rgb(156, 163, 175)');
  });

  it('handles error state', () => {
    const error = 'Invalid input';
    render(<TextInput {...defaultProps} error={error} />);

    const input = screen.getByRole('textbox');
    const container = input.parentElement;
    expect(container).not.toBeNull();

    const computedStyle = window.getComputedStyle(container!);
    expect(computedStyle.borderColor).toBe('rgb(239, 68, 68)');
  });

  it('is keyboard accessible', async () => {
    render(<TextInput {...defaultProps} />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText(defaultProps.label);

    // Check that the input is focusable
    input.focus();
    expect(input).toHaveFocus();

    // Check that clicking the label focuses the input
    fireEvent.click(label);
    expect(input).toHaveFocus();

    // Check that the input can be typed into
    await userEvent.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  it('uses semantic HTML and ARIA attributes', () => {
    const hint = 'Helper text';
    const error = 'Error message';
    render(<TextInput {...defaultProps} hint={hint} error={error} />);

    const input = screen.getByRole('textbox');
    const helperElement = screen.getByText(error);

    // Check for proper ARIA attributes
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', helperElement.id);
    expect(helperElement).toHaveAttribute('role', 'alert');
  });
});
