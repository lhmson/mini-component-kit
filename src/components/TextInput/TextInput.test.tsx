import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('renders with all props', () => {
    render(
      <TextInput
        label="Username"
        placeholder="Enter username"
        hint="Must be at least 3 characters"
        startIcon={<span>👤</span>}
        endIcon={<span>✓</span>}
      />
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByText('Must be at least 3 characters')).toBeInTheDocument();
    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('handles focus state', async () => {
    render(<TextInput label="Username" />);
    const input = screen.getByLabelText('Username');
    const container = input.parentElement;
    expect(container).not.toBeNull();

    // Focus the input
    input.focus();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check focus styles
    expect(container).toHaveStyle(
      `borderColor: rgb(59, 130, 246),
      boxShadow: 0 0 0 2px #DBEAFE`
    );

    // Blur the input
    input.blur();
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check normal styles
    expect(container).toHaveStyle({
      borderColor: '#D1D5DB',
    });
  });

  it('handles error state', () => {
    render(<TextInput label="Username" error="Username is required" />);
    const input = screen.getByLabelText('Username');
    const container = input.parentElement;
    expect(container).not.toBeNull();

    // Check error styles
    expect(container).toHaveStyle(
      `backgroundColor: rgb(254, 226, 226),
      borderColor: rgb(239, 68, 68)`
    );

    // Check error message
    expect(screen.getByText('Username is required')).toBeInTheDocument();
    expect(screen.getByText('Username is required')).toHaveAttribute('role', 'alert');
  });

  it('handles disabled state', () => {
    render(<TextInput label="Username" disabled />);
    const input = screen.getByLabelText('Username');
    const container = input.parentElement;
    expect(container).not.toBeNull();

    expect(input).toBeDisabled();
    expect(container).toHaveStyle(
      `backgroundColor: rgb(243, 244, 246),
      borderColor: rgb(209, 213, 219),
      cursor: not-allowed`
    );
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<TextInput label="Username" onChange={handleChange} />);
    const input = screen.getByLabelText('Username');

    fireEvent.change(input, { target: { value: 'john' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('uses semantic HTML and ARIA attributes', () => {
    render(<TextInput label="Username" hint="Helper text" />);

    const input = screen.getByLabelText('Username');
    const helperText = screen.getByText('Helper text');

    // Check label-input association
    expect(input).toHaveAttribute('id');
    expect(screen.getByText('Username')).toHaveAttribute('for', input.id);

    // Check ARIA attributes
    expect(input).toHaveAttribute('aria-describedby', `${input.id}-hint`);
    expect(helperText).toHaveAttribute('id', `${input.id}-hint`);
    expect(helperText).toHaveAttribute('role', 'status');
  });

  it('uses semantic HTML and ARIA attributes with error', () => {
    render(<TextInput label="Username" error="Error message" />);

    const input = screen.getByLabelText('Username');
    const errorMessage = screen.getByText('Error message');

    // Check ARIA attributes
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', `${input.id}-error`);
    expect(errorMessage).toHaveAttribute('id', `${input.id}-error`);
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('handles icon-only buttons with proper accessibility', () => {
    render(
      <TextInput
        label="Search"
        startIcon={<button aria-label="Search">🔍</button>}
        endIcon={<button aria-label="Clear">✕</button>}
      />
    );

    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
  });
});
